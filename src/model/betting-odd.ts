import {autoserializeAs, autoserializeAsArray, autoserializeAsMap} from "dcerialize";

export class BettingOdd {

  @autoserializeAs(() => String) type: string;
  @autoserializeAsMap(() => Number, () => Number) value: Map<number, number>

  constructor(type: string, value: Map<number, number>) {
    this.type = type;
    this.value = value;
  }

}

export class BettingOddsDuo {
  @autoserializeAsArray(() => BettingOdd,undefined ,'away_team_odds') awayTeamOdd: BettingOdd[];
  @autoserializeAsArray(() => BettingOdd, undefined,'local_team_odds') localTeamOdd: BettingOdd[];
  @autoserializeAs(()=> Number, 'prob_finish_early') probFinishEarly : number;

  constructor(awayTeamOdd: BettingOdd[], localTeamOdd: BettingOdd[], probFinishEarly : number) {
    this.awayTeamOdd = awayTeamOdd;
    this.localTeamOdd = localTeamOdd;
    this.probFinishEarly = probFinishEarly;
  }
}

