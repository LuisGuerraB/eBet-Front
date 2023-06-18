import {
  autoserializeAs,
  autoserializeAsArray,
  autoserializeAsMap,
  deserializeUsing,
  IJsonObject,
  onDeserialized
} from "dcerialize";
import {Team} from "./team";
import {Tournament} from "./tournament";


function functionDeserialze(data: any): string {
  return new Date(data).toLocaleString(navigator.language, {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  })
}

export class Match {
  @autoserializeAs(() => String) id: number;
  @autoserializeAs(() => String) name: string;
  @autoserializeAs(() => String) sets: number;
  @autoserializeAs(() => Team, 'local_team') localTeam: Team
  @autoserializeAs(() => Team, 'away_team') awayTeam: Team
  @autoserializeAs(() => Tournament) tournament: Tournament
  @autoserializeAs(() => Date, 'end_date') endDate: Date;
  @autoserializeAsMap(()=>String,()=>Number) result: Map<string, number>;
  @deserializeUsing(functionDeserialze, 'plan_date') planDate: string;

  constructor(id: number, name: string, sets: number, localTeam: Team, awayTeam: Team, tournament: Tournament, endDate: Date, planDate: string, result:Map<string, number>) {
    this.id = id;
    this.name = name;
    this.sets = sets;
    this.localTeam = localTeam;
    this.awayTeam = awayTeam;
    this.tournament = tournament;
    this.result = result;
    this.endDate = endDate;
    this.planDate = planDate;
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
  league_id?: number;
  finished?: boolean;
  year?: number;
  month?: number;
  limit?: number;
  page?: number;
}
