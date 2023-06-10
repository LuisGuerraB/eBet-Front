import {autoserializeAs, autoserializeAsArray} from "dcerialize";
import {Match} from "./match";


export interface BetEvent{
  type: string;
  subtype: number;
  multiplier: number;
  team:string,
}
export class Bet {
  @autoserializeAs(() => Number) id?: number;
  @autoserializeAs(() => Date) date: Date;
  @autoserializeAs(() => String) type: string;
  @autoserializeAs(() => Number) subtype: number;
  @autoserializeAs(() => Number) multiplier: number;
  @autoserializeAs(() => Number) amount: number;
  @autoserializeAs(()=>String) result?: string;
  @autoserializeAs(() => Match) match: Match;
  @autoserializeAs(() => Number, 'team_id') teamId: number;


  constructor(date: Date, type: string, multiplier: number, amount: number, match: Match, team_id: number, subtype: number, result?:string, id?: number) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.subtype = subtype;
    this.multiplier = multiplier;
    this.amount = amount;
    this.result = result;
    this.match = match;
    this.teamId = team_id;
  }

}

export class BetList{
  @autoserializeAsArray(() => Bet) items: Bet[];
  @autoserializeAs(() => Number) total: number;

  constructor(items: Bet[], total: number) {
    this.items = items;
    this.total = total;
  }
}
