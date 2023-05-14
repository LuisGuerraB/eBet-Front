import {Component, OnInit} from '@angular/core';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import {CompoundBetComponent} from "./compound-bet/compound-bet.component";
import {MatchService} from "../../service/match.service";
import {BettingOddService} from "../../service/betting-odd-service";
import {Match} from "../../model/match";
import {BettingOdd, CompoundOdds, SimpleOdds} from "../../model/betting-odd";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-bet',
    templateUrl: './bet.component.html',
    styleUrls: ['./bet.component.scss'],
    standalone: true,
    imports: [CommonModule,SimpleBetComponent,CompoundBetComponent]
})
export class BetComponent implements OnInit{

  public match? : Match;
  public localBettingOdd? : BettingOdd;
  public awayBettingOdd? : BettingOdd;
  public planDate? : String;
  protected readonly SimpleOdds = Object.values(SimpleOdds);
  protected readonly CompoundOdds = Object.values(CompoundOdds);

  constructor(private matchService : MatchService, private bettingOddService:BettingOddService) {}
  ngOnInit() : void {
    this.matchService.getMatchById(17414).subscribe(
      (match) => {
         this.match = match;
         this.planDate = this.match.planDate.toLocaleString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).replaceAll(",", " ");
      }
    );
    this.bettingOddService.getBettingOdds(17414).subscribe(
      (bettingOddsDuo) => {
        this.localBettingOdd = bettingOddsDuo.localTeamOdd;
        this.awayBettingOdd = bettingOddsDuo.awayTeamOdd;
      }
    )
  }
}
