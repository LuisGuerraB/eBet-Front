import {Component, Input, OnInit} from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import {Match} from "../../../model/match";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-match-item',
  standalone: true,
  imports: [NgIf, UpperCasePipe, TranslateModule],
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.scss']
})
export class MatchItemComponent implements OnInit {
  @Input() match?: Match;
  @Input() showSeason?: boolean;

  date?: string;

  constructor(private router:Router){}

  ngOnInit() {
    if (this.match) {
      if (this.match.endDate && this.match.endDate < new Date(Date.now())) {
        this.date = 'finished'
      } else {
        this.date = this.match.planDate.slice(0, -7).replace(',', '').replaceAll('/', ' - ',);
      }
    }
  }

  redirect(){
    if(this.date == 'finished'){
      //TODO: redirect to res page
    }else{
      this.router.navigate(['/home/bet/' + this.match!.id]);
    }
  }
}

