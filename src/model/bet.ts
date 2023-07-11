import {autoserializeAs, autoserializeAsArray} from "dcerialize";
import {Match} from "./match";
import {PlayMatch} from "./play";


export interface BetEvent {
    type: string;
    subtype: number;
    multiplier: number;
    team: string,
    set?: number,
}

export class Bet {
    @autoserializeAs(() => Number) id?: number;
    @autoserializeAs(() => Date) date: Date;
    @autoserializeAs(() => String) type: string;
    @autoserializeAs(() => Number) subtype: number;
    @autoserializeAs(() => Number) multiplier: number;
    @autoserializeAs(() => Number) amount: number;
    @autoserializeAs(() => Number) set?: number;
    @autoserializeAs(() => Boolean) result?: boolean;
    @autoserializeAs(()=> PlayMatch) play: PlayMatch;
    match?: Match;
    teamId?: number;


    constructor(date: Date, type: string, multiplier: number, amount: number, play: PlayMatch, subtype: number, set?: number, result?: boolean, id?: number) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.subtype = subtype;
        this.multiplier = multiplier;
        this.amount = amount;
        this.set = set;
        this.result = result;
        this.play = play;
    }
}

export class BetList {
    @autoserializeAsArray(() => Bet) items: Bet[];
    @autoserializeAs(() => Number) total: number;

    constructor(items: Bet[], total: number) {
        this.items = items;
        this.total = total;
    }
}
