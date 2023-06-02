import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Participation} from "../../../../model/Participation";
import {ParticipationService} from "../../../../service/participation.service";

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  @Input() leagueId!:number
  participations?: Participation[];

  constructor(private participationService: ParticipationService) {

  }

  ngOnInit(){
    this.participationService.getParticipationByLeague(this.leagueId).subscribe(
      participationList => this.participations = participationList.items
    )
  }

}
