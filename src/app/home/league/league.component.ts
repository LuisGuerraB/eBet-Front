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
import {BackButtonComponent} from "../../back-button/back-button.component";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {SpinnerComponent} from "../../spinner/spinner.component";


interface month {
  number: number,
  name: string,
}

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, StandingsComponent, CarouselComponent, MatchItemComponent, BackButtonComponent, FormsModule, TranslateModule, SpinnerComponent],
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  leagueId?: number;
  league?: League;
  matches: Match[] = [];
  loading: boolean;
  isEnd: boolean;


  filters: MatchListQueryParams = {
    finished: false,
    year: undefined,
    month: undefined,
    limit: 10,
    page: 1,
  }

  images: string[] = [
    'assets/img/LeagueOfLegends-img-1.jpg',
    'assets/img/LeagueOfLegends-img-2.jpg',
    'assets/img/LeagueOfLegends-img-3.jpg'
  ];

  years: number[];

  months: month[] = [
    {number: 1, name: 'month.january'},
    {number: 2, name: 'month.february'},
    {number: 3, name: 'month.march'},
    {number: 4, name: 'month.april'},
    {number: 5, name: 'month.may'},
    {number: 6, name: 'month.june'},
    {number: 7, name: 'month.july'},
    {number: 8, name: 'month.august'},
    {number: 9, name: 'month.september'},
    {number: 10, name: 'month.october'},
    {number: 11, name: 'month.november'},
    {number: 12, name: 'month.december'},
  ]

  constructor(private route: ActivatedRoute, private leagueService: LeagueService, private matchService: MatchService) {

    this.isEnd = false;
    this.loading = true;
    this.years = []
    for (let i = 2022; i <= new Date().getFullYear(); i++) {
      this.years.push(i)
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params['leagueId'];
      this.filters.league_id = this.leagueId;

      this.leagueService.getLeagueById(this.leagueId!).subscribe(
        league => this.league = league
      )
      this.search();
    });
  }

  search() {
    this.filters.page = 1;
    this.matchService.getMatchList(this.filters).subscribe(
      (matches) => {
        this.matches = matches.items
        if (matches.items.length < this.filters.limit! && this.matches.length != 0) {
          this.isEnd = true;
        }
        this.loading = false
      },
      (error) => {
        console.log(error.error.message)
      }
    )
  }

  loadData() {
    this.matchService.getMatchList(this.filters).subscribe(
      (matches) => {
        this.matches = this.matches.concat(matches.items)
        if (matches.items.length < this.filters.limit!) {
          this.isEnd = true;
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error.error.message)
      }
    )
  }

  moreMatches() {
    this.loading = true;
    this.filters.page!++;
    this.loadData();
  }
}
