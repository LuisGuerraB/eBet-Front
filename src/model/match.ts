import {autoserializeAs} from "dcerialize";
import {Team} from "./team";
import {Season} from "./season";


export class Match {
  @autoserializeAs(() => String) id: number;
  @autoserializeAs(() => String) name: string;
  @autoserializeAs(() => String) sets: number;
  @autoserializeAs(() => Team, 'local_team') localTeam: Team
  @autoserializeAs(() => Team, 'away_team') awayTeam: Team
  @autoserializeAs(() => Season) season: Season
  @autoserializeAs(() => Date, 'plan_date') planDate: Date;
  @autoserializeAs(() => Date, 'ini_date') iniDate?: Date;
  @autoserializeAs(() => Date, 'end_date') endDate?: Date;

  constructor(id: number, name: string, sets: number, localTeam: Team, awayTeam: Team, season: Season, planDate: Date, iniDate?: Date, endDate?: Date) {
    this.id = id;
    this.name = name;
    this.sets = sets;
    this.localTeam = localTeam;
    this.awayTeam = awayTeam;
    this.season = season;
    this.planDate = planDate;
    this.iniDate = iniDate;
    this.endDate = endDate;
  }

}
