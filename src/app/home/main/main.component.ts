import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {League, LeagueList} from "../../../model/league";
import {LeagueService} from "../../../service/league.service";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {MatchItemComponent} from "../../match/match-item/match-item.component";
import {MatchService} from "../../../service/match.service";
import {Match, MatchList, MatchListQueryParams} from "../../../model/match";
import {CarouselComponent} from "../../carousel/carousel.component";
import {SpinnerComponent} from "../../spinner/spinner.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, MatchItemComponent, CarouselComponent, SpinnerComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  images: string[] = [
    'assets/img/LeagueOfLegends-img-1.jpg',
    'assets/img/LeagueOfLegends-img-2.jpg',
    'assets/img/LeagueOfLegends-img-3.jpg'
  ];

  leagues?: League[];
  matches?: Match[];

  sliderLeagueConfig = {
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    infinite: true,
    autoplay: true,
    nextArrow: '<button type="button" class="arrow right"><i class="fas fa-chevron-right"></i></button>',
    prevArrow: '<button type="button" class="arrow left"><i class="fas fa-chevron-left"></i></button>',
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor(private leagueService: LeagueService,private matchService: MatchService,private route: Router) {
  }
  ngOnInit() {

    this.leagueService.getLeagueList(1).subscribe(
      (leagues: LeagueList) => {
        this.leagues = leagues.items;
      },
      (error) => {
        console.log(error.message)
      }
    )
    let paramQuery : MatchListQueryParams ={finished:false,limit:5,page:1};
    this.matchService.getMatchList(paramQuery).subscribe(
      (matches: MatchList) => {
        this.matches = matches.items;
      },
      (error) => {
        console.log(error.message)
      }
    )
  }

  redirect(leagueId:number){
    this.route.navigate(['home/league',leagueId]);
  }

}
