import {autoserializeAs} from "dcerialize";


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
  @autoserializeAs(() => Number, 'match_id') matchId: number;
  @autoserializeAs(() => Number, 'team_id') teamId: number;


  constructor(date: Date, type: string, multiplier: number, amount: number, match_id: number, team_id: number, subtype: number, id?: number) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.subtype = subtype;
    this.multiplier = multiplier;
    this.amount = amount;
    this.matchId = match_id;
    this.teamId = team_id;
  }

}
