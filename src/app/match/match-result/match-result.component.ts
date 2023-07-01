import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackButtonComponent} from "../../back-button/back-button.component";
import {MatchHeaderComponent} from "../match-header/match-header.component";
import {SpinnerComponent} from "../../spinner/spinner.component";
import {BetItemComponent} from "../../bet/bet-item/bet-item.component";
import {MatTabsModule} from "@angular/material/tabs";
import {Match} from "../../../model/match";
import {forkJoin} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatchService} from "../../../service/match.service";
import {ResultService} from "../../../service/result.service";
import {Result} from "../../../model/result";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-match-result',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, MatchHeaderComponent, SpinnerComponent, BetItemComponent, MatTabsModule, TranslateModule],
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.scss']
})
export class MatchResultComponent {
  public loading: boolean = true;
  public match?: Match;
  public tabActive = 1;
  sets: Result[][] = [];

  constructor(private matchService: MatchService, private resultService: ResultService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['matchId'];
      let matchObservable = this.matchService.getMatchById(id)
      let resultsObservable = this.resultService.get_result_from_match(id)

      forkJoin([matchObservable, resultsObservable]).subscribe(
        ([match, results]) => {
          this.match = match;
          for (let i = 0; i < Math.min(results.awayTeamResult.length, results.localTeamResult.length); i++) {
            this.sets.push([results.localTeamResult[i], results.awayTeamResult[i]])
          }
          this.loading = false;
        }
      );
    })
  }

  changeTabActive($event: any) {
    this.tabActive = $event.index;
  }
}
