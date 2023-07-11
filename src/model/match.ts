import {
  autoserializeAs,
  autoserializeAsArray,
  autoserializeAsMap,
  deserializeUsing,
} from "dcerialize";
import {Tournament} from "./tournament";
import {PlayTeam} from "./play";
import {Team} from "./team";


function functionDeserialze(data: any): string {
  return new Date(data).toLocaleString(navigator.language, {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })+ ' UTC'
}

export class Match {
  @autoserializeAs(() => String) id: number;
  @autoserializeAs(() => String) sets: number;
  @autoserializeAsArray(() => PlayTeam) plays?: PlayTeam[];
  @autoserializeAs(() => Tournament) tournament: Tournament;
  @autoserializeAs(() => Date, 'end_date') endDate: Date;
  @autoserializeAs(() => Date, 'ini_date') iniDate: Date;
  @autoserializeAsMap(() => String, () => Number) result: Map<string, number>;
  @deserializeUsing(functionDeserialze, 'plan_date') planDate: string;
  awayTeam?: Team;
  localTeam?: Team;

  constructor(id: number, sets: number, tournament: Tournament, endDate: Date, iniDate : Date, planDate: string, result: Map<string, number>) {
    this.id = id;
    this.sets = sets;
    this.tournament = tournament;
    this.result = result;
    this.endDate = endDate;
    this.iniDate = iniDate;
    this.planDate = planDate;
  }

  updateTeams() {
    if (this.plays) {
      for (const play of this.plays) {
        if (play.local) {
          this.localTeam = play.team
        } else {
          this.awayTeam = play.team
        }
      }
    }

  }

}


export class MatchList {
  @autoserializeAsArray(() => Match) items: Match[];
  @autoserializeAs(() => Number) total: number;

  constructor(items: Match[], total: number) {
    this.items = items;
    this.total = total;
  }
}


export interface MatchListQueryParams {
  league_id: number;
  finished: boolean;
  team_id : number;
  year: number;
  month: number;
  limit: number;
  page: number;
}
