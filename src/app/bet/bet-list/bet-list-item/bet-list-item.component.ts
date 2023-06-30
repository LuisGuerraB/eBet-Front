import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Bet} from "../../../../model/bet";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-bet-list-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './bet-list-item.component.html',
  styleUrls: ['./bet-list-item.component.scss']
})
export class BetListItemComponent implements OnInit {
  @Input() bet!: Bet;
  @Input() disableEdit: boolean = false;
  @Output() editBet = new EventEmitter<Bet>();
  win: boolean = false;
  lose: boolean = false;
  team: string = '';
  result_string?: string;

  ngOnInit() {
    if (this.bet.match == undefined) {
      this.bet.updateMatch()
    }
    this.bet.match!.updateTeams();
    this.checkResult();
    this.checkTeam();
    if (this.disableEdit) {
      this.result_string = this.bet.match!.iniDate.toLocaleString(navigator.language, {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }

  private checkTeam() {
    if (this.bet.match?.localTeam?.id == this.bet.teamId) {
      this.team = 'l'
    } else {
      this.team = 'a'
    }
  }

  private checkResult() {
    if (this.bet.result != undefined) {
      if (this.bet.result) {
        this.win = true;
        this.result_string = '+' + Math.round(this.bet.amount * this.bet.multiplier);
      } else {
        this.lose = true;
        this.result_string = '-' + this.bet.amount;
      }
    } else {
      this.result_string = 'waiting';
    }
  }

  editBetfunction() {
    this.editBet.emit(this.bet)
  }
}
