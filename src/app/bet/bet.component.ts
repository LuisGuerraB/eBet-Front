import {Component, OnInit} from '@angular/core';
import {SimpleBetComponent} from './simple-bet/simple-bet.component';
import {CompoundBetComponent} from "./compound-bet/compound-bet.component";
import {MatchService} from "../../service/match.service";
import {BettingOddService} from "../../service/betting-odd-service";
import {Match} from "../../model/match";
import {BettingOdd, CompoundOdds, SimpleOdds} from "../../model/betting-odd";
import {CommonModule, Location} from "@angular/common";
import {BetService} from "../../service/bet.service";
import {Bet} from "../../model/bet";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {ActivatedRoute} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatchHeaderComponent} from "../match/match-header/match-header.component";
import {SpinnerComponent} from "../spinner/spinner.component";

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss'],
  standalone: true,
  imports: [CommonModule, SimpleBetComponent, CompoundBetComponent, TranslateModule, MatchHeaderComponent, SpinnerComponent]
})
export class BetComponent implements OnInit {

  public loading: boolean = true;
  public match?: Match;
  public localBettingOdd!: BettingOdd;
  public awayBettingOdd!: BettingOdd;
  protected readonly SimpleOdds = Object.values(SimpleOdds);
  protected readonly CompoundOdds: CompoundOdds[] = [];

  constructor(private matchService: MatchService, private bettingOddService: BettingOddService,
              private betService: BetService, private dialog: MatDialog, private route: ActivatedRoute,
              private location : Location) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading=true;
      const id = params['matchId'];
      this.matchService.getMatchById(id).subscribe(
        (match) => {
          this.match = match;
        }
      );
      this.bettingOddService.getBettingOdds(id).subscribe(
        (bettingOddsDuo) => {
          this.localBettingOdd = bettingOddsDuo.localTeamOdd;
          for (let type of Object.values(CompoundOdds)){
            if(this.localBettingOdd[type].size > 0){
              this.CompoundOdds.push(type);
            }
          }
          this.awayBettingOdd = bettingOddsDuo.awayTeamOdd;
          this.loading=false;
        }
      )
    });
  }

  goBack(): void {
    this.location.back();
  }

  createBet(event: any): void {
    let team_id: number;
    if (event.team == this.match?.localTeam.acronym) {
      team_id = this.match!.localTeam.id
    } else {
      team_id = this.match!.awayTeam.id
    }
    let bet = new Bet(new Date(), event.type.slice(0, -4), event.odd, event.amount, this.match!.id, team_id, event.subtype);
    this.betService.createBet(bet).subscribe(
      (bet) => {
        this.dialog.open(ConfirmationModalComponent, {
          data: {message: "bet-succesful"}
        })
        if (sessionStorage.getItem('user') != null) {
          const userData = JSON.parse(sessionStorage.getItem('user')!);
          userData.balance -= bet.amount;
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
      },
      (err) => {
        console.log(err.message);
      }
    )
  }
}
