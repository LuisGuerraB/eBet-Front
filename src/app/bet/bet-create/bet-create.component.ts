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

@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html',
  styleUrls: ['./bet-create.component.scss'],
  standalone: true,
  imports: [CommonModule, BetItemComponent, TranslateModule, MatchHeaderComponent, SpinnerComponent, BackButtonComponent]
})
export class BetCreateComponent implements OnInit {

  public loading: boolean = true;
  public match?: Match;
  oddsMap?: Map<string, BettingOdd[]>;
  winnerOdd?: BettingOdd[] = [];

  constructor(private matchService: MatchService, private bettingOddService: BettingOddService,
              private betService: BetService, private dialog: MatDialog, private route: ActivatedRoute,
              private sessionStorage : SessionStorageService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      const id = params['matchId'];
      this.matchService.getMatchById(id).subscribe(
        (match) => {
          this.match = match;
        }
      );
      this.bettingOddService.getBettingOdds(id).subscribe(
        (bettingOddsDuo) => {
          const combinedOdds = bettingOddsDuo.localTeamOdd.concat(bettingOddsDuo.awayTeamOdd);
          this.oddsMap = new Map<string, BettingOdd[]>();
          combinedOdds.forEach((obj) => {
            const {type} = obj;
            if (obj.type == 'winner') {
              this.winnerOdd!.push(obj)
            } else if (obj.value.size > 0) {
              if (this.oddsMap!.has(type)) {
                this.oddsMap!.get(type)!.push(obj);
              } else {
                this.oddsMap!.set(type, [obj]);
              }
            }
          });
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
    let team:string;
    if (event.team == 'l') {
      team = this.match!.localTeam.acronym;
    } else {
      team = this.match!.awayTeam.acronym;
    }
    let dialogRef = this.dialog.open(BetModalComponent, {
      disableClose: true,
      data: {
        team: team,
        type: event.type,
        subtype: event.subtype,
        odd: event.multiplier
      },
      width: '340px'
    })
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          let team_id: number;
          if (team == this.match?.localTeam.acronym) {
            team_id = this.match!.localTeam.id
          } else {
            team_id = this.match!.awayTeam.id
          }
          let bet = new Bet(new Date(), event.type, event.multiplier, data.amount, this.match!, team_id, event.subtype);
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
}
