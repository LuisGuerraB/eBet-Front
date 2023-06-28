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

  ngOnInit() {
    this.checkResult()
    this.checkTeam()
  }

  private checkTeam() {
    if (this.bet.match.localTeam?.id == this.bet.teamId) {
      this.team = 'l'
    } else {
      this.team = 'a'
    }
  }

  private checkResult() {
    if (this.bet.result) {
      if (this.bet.result[0] == '+') {
        this.win = true;
      } else if (this.bet.result[0] == '-') {
        this.lose = true;
      }
    }
  }

  editBetfunction() {
    this.editBet.emit(this.bet)
  }
}
