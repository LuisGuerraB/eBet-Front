import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf, UpperCasePipe} from '@angular/common';
import {Match} from "../../../model/match";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-match-item',
  standalone: true,
  imports: [NgIf, UpperCasePipe, TranslateModule, NgClass],
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.scss']
})
export class MatchItemComponent implements OnInit {
  @Input() match?: Match;
  @Input() showTournament?: boolean;

  date?: string;
  finished = false;
  ongoing = false;
  waitingResult = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.match) {
      this.match.updateTeams();
      if (this.match.endDate && this.match.endDate < new Date(Date.now())) {
        this.finished = true;
      }

      if(this.match.iniDate < new Date() && !this.finished){
        this.ongoing=true;
        let timepassed = new Date().getTime() - this.match.iniDate.getTime()
        if( timepassed > (3600000 * this.match.sets)){
          this.ongoing = false;
          this.waitingResult = true;
        }
      }
      if(this.showTournament){
        this.match.planDate = this.match.planDate.slice(0, -11)
      }
      this.date = this.match.planDate.replaceAll(',', ' - ');

    }
  }

  redirect() {
    if (this.finished || this.ongoing || this.waitingResult) {
      this.router.navigate(['/home/result/' + this.match!.id]);
    } else {
      this.router.navigate(['/home/bet/' + this.match!.id]);
    }
  }
}

