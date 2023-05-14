import {autoserializeAs} from "dcerialize";
import {League} from "./league";

export class Season {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => String) name: string;
  @autoserializeAs(() => Number, 'serie_id') serieId: number;
  @autoserializeAs(() => League) league: League;
  @autoserializeAs(() => Date, 'ini_date') iniDate: Date;
  @autoserializeAs(() => Date, 'end_date') endDate?: Date;

  constructor(id: number, name: string, serieId: number, league: League, iniDate: Date, endDate?: Date) {
    this.id = id;
    this.name = name;
    this.serieId = serieId;
    this.league = league;
    this.iniDate = iniDate;
    this.endDate = endDate;
  }
}
