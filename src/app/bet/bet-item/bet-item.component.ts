import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BetEvent} from "../../../model/bet";

@Component({
  selector: 'app-bet-item',
  templateUrl: './bet-item.component.html',
  styleUrls: ['./bet-item.component.scss'],
  imports: [CommonModule, TranslateModule],
  standalone: true
})
export class BetItemComponent implements OnInit{
  @Input() localTeamOdd?: Map<number, number>;
  @Input() awayTeamOdd?: Map<number, number>;
  @Input() type!: string;
  @Input() set? : number;
  @Output() onCreate = new EventEmitter<BetEvent>();

  public arrayLocalTeamOdd?: [number, number][];
  public arrayAwayTeamOdd?: [number, number][];

  ngOnInit() {
    if(this.localTeamOdd){this.arrayLocalTeamOdd = Array.from(this.localTeamOdd.entries());}
    if(this.awayTeamOdd){this.arrayAwayTeamOdd = Array.from(this.awayTeamOdd.entries());}
  }

  createBet(team: string, subtype: number, multiplier: number) {
    this.onCreate.emit({type:this.type,team:team,subtype:subtype,multiplier:multiplier,set:this.set});
  }
}

