import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialog} from "@angular/material/dialog";
import {BetModalComponent} from "../bet-modal/bet-modal.component";

@Component({
  selector: 'app-simple-bet',
  templateUrl: './simple-bet.component.html',
  styleUrls: ['./simple-bet.component.scss'],
  imports: [TranslateModule],
  standalone: true
})
export class SimpleBetComponent{
  @Input() localTeam!: string;
  @Input() localTeamOdd!: number;
  @Input() awayTeam!: string;
  @Input() awayTeamOdd!: number;
  @Input() type!: string;
  @Output() onAccept = new EventEmitter<string>();

  constructor(private dialog: MatDialog) { }
  createSimpleBet(team: string, odd: number) {
    let dialogRef = this.dialog.open(BetModalComponent, {
      data: {
        team: team,
        type: this.type,
        odd: odd
      }
    })
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.onAccept.emit(data);
        }
      }
    )
  }
}
