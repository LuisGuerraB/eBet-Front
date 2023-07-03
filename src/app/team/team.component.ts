import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Team} from "../../model/team";
import {ResultService} from "../../service/result.service";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../../service/team.service";
import {Statistic} from "../../model/result";
import {forkJoin} from "rxjs";
import {MatchService} from "../../service/match.service";
import {Match} from "../../model/match";
import {SpinnerComponent} from "../spinner/spinner.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatchItemComponent} from "../match/match-item/match-item.component";
import {BackButtonComponent} from "../back-button/back-button.component";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, TranslateModule, MatchItemComponent, BackButtonComponent],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team!:Team;
  statistics!: Statistic[];
  matches!:Match[];
  loading= true;
  winner!: Statistic;

  constructor(private resultService : ResultService, private route : ActivatedRoute, private teamService : TeamService, private matchService : MatchService){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      let teamObservable = this.teamService.getTeam(params['teamId'])
      let statisticsObservable = this.resultService.get_statistic_from_team(params['teamId'])
      let nextMatchObservable = this.matchService.getMatchList({team_id: params['teamId'],limit: 5,page:1,finished:false, league_id: -1,year:-1,month:-1})
      forkJoin([teamObservable, statisticsObservable,nextMatchObservable]).subscribe(([team, statistics, matches]) => {
        this.team = team;
        this.matches = matches.items;
        this.statistics = statistics;
        for (let stat of statistics ){
          if(stat.type === 'winner'){
            this.statistics = this.statistics.filter(stat => stat.type !== "winner");
            this.winner = stat;
          }
        }
        this.loading = false;
      })
    });
  }

}
