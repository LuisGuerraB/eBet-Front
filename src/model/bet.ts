import {autoserializeAs, IJsonObject} from "dcerialize";
import {CompoundOdds, SimpleOdds} from "./betting-odd";

export enum BetType {
  WINNER = 'winner',
  EXP = 'exp',
  GOLD = 'gold',
  DRAKES = 'drakes',
  INHIBITORS = 'inhibitors',
  ELDER = 'elder',
  TOWER = 'tower',
  BARON = 'baron',
  HERALD = 'herald',
  KILL = 'kill',
  DEATH = 'death',
  ASSIST = 'assist',
}

export class Bet {
  @autoserializeAs(() => Number) id?: number;
  @autoserializeAs(() => Date) date: Date;
  @autoserializeAs(() => String) type: BetType;
  @autoserializeAs(() => Number) subtype?: number;
  @autoserializeAs(() => Number) multiplier: number;
  @autoserializeAs(() => Number) amount: number;
  @autoserializeAs(() => Number, 'match_id') matchId: number;
  @autoserializeAs(() => Number, 'team_id') teamId: number;


  constructor(date: Date, type: BetType, multiplier: number, amount: number, match_id: number, team_id: number, subtype?: number, id?: number) {
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
