import {autoserializeAs} from "dcerialize";
import {League} from "./league";

export class Tournament {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => String) name: string;
  @autoserializeAs(() => League) league: League;
  @autoserializeAs(() => Date, 'ini_date') iniDate: Date;
  @autoserializeAs(() => Date, 'end_date') endDate?: Date;

  constructor(id: number, name: string, league: League, iniDate: Date, endDate?: Date) {
    this.id = id;
    this.name = name;
    this.league = league;
    this.iniDate = iniDate;
    this.endDate = endDate;
  }
}
