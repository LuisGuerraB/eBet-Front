import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Match} from "../../../model/match";
import {SpinnerComponent} from "../../spinner/spinner.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-match-header',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './match-header.component.html',
  styleUrls: ['./match-header.component.scss']
})
export class MatchHeaderComponent implements OnInit{
  @Input() match!: Match;
  finished= false;

  constructor(private router: Router){}

  ngOnInit(){
    this.match!.updateTeams()
    if (this.match.endDate && this.match.endDate < new Date(Date.now())) {
        this.finished = true;
      }
  }

  redirect( matchId: number) {
    this.router.navigate(['home/team',matchId]);
  }
}
