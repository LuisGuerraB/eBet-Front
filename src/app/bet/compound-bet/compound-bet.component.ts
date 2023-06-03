import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {BetModalComponent} from "../bet-modal/bet-modal.component";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-compound-bet',
  templateUrl: './compound-bet.component.html',
  styleUrls: ['./compound-bet.component.scss'],
  imports: [CommonModule, TranslateModule],
  standalone: true
})
export class CompoundBetComponent implements OnInit {
  @Input() localTeam!: string;
  @Input() localTeamOdd!: Map<number, number>;
  @Input() awayTeam!: string;
  @Input() awayTeamOdd!: Map<number, number>;
  @Input() type!: string;
  @Output() onAccept = new EventEmitter<string>();

  public arrayLocalTeamOdd?: [number, number][];
  public arrayAwayTeamOdd?: [number, number][];

  ngOnInit() {
    this.arrayLocalTeamOdd = Array.from(this.localTeamOdd.entries());
    this.arrayAwayTeamOdd = Array.from(this.awayTeamOdd.entries());

  }

  constructor(private dialog: MatDialog) {
  }

  createCompoundBet(team: string, subtype: number, odd: number) {
    if (sessionStorage.getItem('user') == null){
      this.dialog.open(ConfirmationModalComponent, {
        data: {message: "login-required"}
      })
      return;
    }
    let dialogRef= this.dialog.open(BetModalComponent, {
      data: {
        team: team,
        type: this.type,
        subtype: subtype,
        odd: odd
      },
      width: '340px'
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

