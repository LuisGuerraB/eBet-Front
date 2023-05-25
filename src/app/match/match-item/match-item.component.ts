import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Match} from "../../../model/match";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-match-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.scss']
})
export class MatchItemComponent implements OnInit {
  @Input() match?: Match;
  @Input() showSeason?: boolean;

  date?: string;

  ngOnInit() {
    if (this.match) {
      if (this.match.endDate && this.match.endDate < new Date(Date.now())) {
        this.date = 'finished'
      } else {
        this.date = this.match.planDate.slice(0, -7).replace(',', '').replaceAll('/', ' - ',);

      }
    }
  }
}

