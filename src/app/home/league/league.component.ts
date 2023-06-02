import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {StandingsComponent} from "./standings/standings.component";
import {LeagueService} from "../../../service/league.service";
import {League} from "../../../model/league";
import {CarouselComponent} from "../../carousel/carousel.component";
import {MatchItemComponent} from "../../match/match-item/match-item.component";
import {Match, MatchListQueryParams} from "../../../model/match";
import {MatchService} from "../../../service/match.service";

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, StandingsComponent, CarouselComponent, MatchItemComponent],
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  leagueId?: number;
  league? : League;
  matches? : Match[];

  images: string[] = [
    'assets/img/LeagueOfLegends-img-1.jpg',
    'assets/img/LeagueOfLegends-img-2.jpg',
    'assets/img/LeagueOfLegends-img-3.jpg'
  ];

  constructor(private route: ActivatedRoute, private leagueService: LeagueService,private matchService: MatchService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params['leagueId'];

      this.leagueService.getLeagueById(this.leagueId!).subscribe(
        league => this.league = league
      )
      let queryParams : MatchListQueryParams = {league_id:this.leagueId,limit:5,page:1};
      this.matchService.getMatchList(queryParams).subscribe(
        (matches) => {
          console.log(matches)
          this.matches = matches.items
        },
        (error) => {
          console.log(error.error.message)
        }
      )
    });
  }
}
