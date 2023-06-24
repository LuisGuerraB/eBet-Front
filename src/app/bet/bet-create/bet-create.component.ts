import {Component, OnInit} from '@angular/core';
import {BetItemComponent} from "../bet-item/bet-item.component";
import {MatchService} from "../../../service/match.service";
import {BettingOddService} from "../../../service/betting-odd.service";
import {Match} from "../../../model/match";
import {CommonModule,} from "@angular/common";
import {BetService} from "../../../service/bet.service";
import {Bet, BetEvent} from "../../../model/bet";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {ActivatedRoute} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatchHeaderComponent} from "../../match/match-header/match-header.component";
import {SpinnerComponent} from "../../spinner/spinner.component";
import {BackButtonComponent} from "../../back-button/back-button.component";
import {BettingOdd} from "../../../model/betting-odd";
import {BetModalComponent} from "../bet-modal/bet-modal.component";
import {SessionStorageService} from "../../../service/session-storage.service";
import {forkJoin} from "rxjs";
import {MatTabsModule} from "@angular/material/tabs";
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html',
  styleUrls: ['./bet-create.component.scss'],
  standalone: true,
  imports: [CommonModule, BetItemComponent, TranslateModule, MatchHeaderComponent, SpinnerComponent, BackButtonComponent, MatTabsModule]
})
export class BetCreateComponent implements OnInit {

  public loading: boolean = true;
  public match?: Match;
  public tabActive = 1;
  sets: any = [];
  winnerOdd?: BettingOdd[] = [];

  constructor(private matchService: MatchService, private bettingOddService: BettingOddService,
              private betService: BetService, private dialog: MatDialog, private route: ActivatedRoute,
              private sessionStorage: SessionStorageService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['matchId'];
      let matchObservable = this.matchService.getMatchById(id)
      let bettingOddObservable = this.bettingOddService.getBettingOdds(id)

      forkJoin([matchObservable, bettingOddObservable]).subscribe(
        ([match, bettingOddsDuo]) => {
          this.match = match;
          const combinedOdds = bettingOddsDuo.localTeamOdd.concat(bettingOddsDuo.awayTeamOdd);
          const oddsMap = new Map<string, BettingOdd[]>();
          combinedOdds.forEach((obj) => {
            const {type} = obj;
            if (obj.type == 'winner') {
              this.winnerOdd!.push(obj)
            } else {
              if (oddsMap!.has(type)) {
                oddsMap.get(type)!.push(obj);
                if (oddsMap.get(type)![0].value.size == 0 && oddsMap.get(type)![1].value.size == 0) {
                  oddsMap.delete(type);
                }
              } else {
                oddsMap.set(type, [obj]);
              }
            }
          });
          let oddArray = Array.from(oddsMap.entries());

          for (let set = 1; set <= match.sets; set++) {
            let oddArrayCopy = cloneDeep(oddArray);

            if (set > Math.ceil(match.sets / 2)) {
              for (let bettingOddStruct of oddArrayCopy) {
                for (let bettingOdd of bettingOddStruct[1]) {
                  for (let [key, value] of bettingOdd.value) {
                    bettingOdd.value.set(key, value * (1 / (bettingOddsDuo.probFinishEarly * 1.1)));
                  }
                }
              }
            }
            this.sets.push([...oddArrayCopy]); // Push a new deep copy to this.sets
          }
          this.loading = false;
        }
      )
    });
  }

  createBet(event: BetEvent) {
    if (this.sessionStorage.getItem('user') == undefined) {
      this.dialog.open(ConfirmationModalComponent, {
        data: {message: "login-required"}
      })
      return;
    }
    let team: string;
    if (event.team == 'l') {
      team = this.match!.localTeam.acronym;
    } else {
      team = this.match!.awayTeam.acronym;
    }
    console.log(event)
    this.dialog.open(BetModalComponent, {
      disableClose: true,
      data: {
        team: team,
        type: event.type,
        subtype: event.subtype,
        odd: event.multiplier,
        set: event.set,
      }
    }).afterClosed().subscribe(
      (data) => {
        if (data) {
          let team_id: number;
          if (team == this.match?.localTeam.acronym) {
            team_id = this.match!.localTeam.id
          } else {
            team_id = this.match!.awayTeam.id
          }
          console.log(data)
          let bet = new Bet(new Date(), event.type, event.multiplier, data.amount,  this.match!, team_id, event.subtype,event.set);
          this.betService.createBet(bet).subscribe(
            (bet) => {
              this.dialog.open(ConfirmationModalComponent, {
                data: {message: "bet-succesful"}
              })
            },
            (err) => {
              this.dialog.open(ConfirmationModalComponent, {
                data: {message: err}
              })
            }
          )
        }
      }
    )
  }

  changeTabActive($event:any) {
    this.tabActive = $event.index;
  }
}
