import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-compound-bet',
  templateUrl: './compound-bet.component.html',
  styleUrls: ['./compound-bet.component.scss'],
  imports: [CommonModule,TranslateModule],
  standalone:true
})
export class CompoundBetComponent implements OnInit {
  @Input() localTeamOdd?: Map<number,number>;
  @Input() awayTeamOdd?: Map<number,number>;
  @Input() type?: string;

  public arrayLocalTeamOdd?: [number,number][];
  public arrayAwayTeamOdd?: [number,number][];

  ngOnInit(){
    this.arrayLocalTeamOdd = Array.from(this.localTeamOdd!.entries());
    this.arrayAwayTeamOdd = Array.from(this.awayTeamOdd!.entries());

  }
}

