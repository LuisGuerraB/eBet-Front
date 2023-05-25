import {autoserializeAs, autoserializeAsArray, deserializeUsing, IJsonObject, onDeserialized} from "dcerialize";
import {Team} from "./team";
import {Season} from "./season";


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
  @autoserializeAs(() => Season) season: Season
  @autoserializeAs(() => Date, 'end_date') endDate: Date;
  @deserializeUsing(functionDeserialze, 'plan_date') planDate: string;

  constructor(id: number, name: string, sets: number, localTeam: Team, awayTeam: Team, season: Season, endDate: Date, planDate: string) {
    this.id = id;
    this.name = name;
    this.sets = sets;
    this.localTeam = localTeam;
    this.awayTeam = awayTeam;
    this.season = season;
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
