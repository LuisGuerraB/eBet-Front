import {autoserializeAs, autoserializeAsMap} from "dcerialize";

export enum SimpleOdds{
  WIN_ODDS = 'winOdds',
  GOLD_ODDS = 'goldOdds',
  EXP_ODDS = 'expOdds',
}
export enum CompoundOdds{
  TOWERS_ODDS = 'towersOdds',
  DRAKE_ODDS = 'drakesOdds',
  INHIBITORS_ODDS = 'inhibitorsOdds',
  ELDER_ODDS = 'eldersOdds',
  BARON_ODDS = 'baronsOdds',
  HERALD_ODDS = 'heraldsOdds',
  KILL_ODDS = 'killsOdds',
  DEATHS_ODDS = 'deathsOdds',
  ASSITS_ODDS = 'assistsOdds'
}

export class BettingOdd {

  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => Number, 'win_odds') winOdds: number;
  @autoserializeAs(() => Number, 'gold_odds') goldOdds: number;
  @autoserializeAs(() => Number, 'exp_odds') expOdds: number;
  @autoserializeAsMap(() => Number, () => Number, undefined, 'towers_odds') towersOdds: Map<number, number>
  @autoserializeAsMap(() => Number, () => Number, undefined, 'drakes_odds') drakesOdds: Map<number, number>
  @autoserializeAsMap(() => Number, () => Number, undefined, 'inhibitors_odds') inhibitorsOdds: Map<number, number>
  @autoserializeAsMap(() => Number, () => Number, undefined, 'elders_odds') eldersOdds: Map<number, number>
  @autoserializeAsMap(() => Number, () => Number, undefined, 'barons_odds') baronsOdds: Map<number, number>
  @autoserializeAsMap(() => Number, () => Number, undefined, 'heralds_odds') heraldsOdds: Map<number, number>
  @autoserializeAsMap(() => Number, () => Number, undefined, 'kills_odds') killsOdds: Map<number, number>
  @autoserializeAsMap(() => Number, () => Number, undefined, 'deaths_odds') deathsOdds: Map<number, number>
  @autoserializeAsMap(() => Number, () => Number, undefined, 'assists_odds') assistsOdds: Map<number, number>

  constructor(
    id: number,
    winOdds: number,
    goldOdds: number,
    expOdds: number,
    towersOdds: Map<number, number>,
    drakesOdds: Map<number, number>,
    inhibitorsOdds: Map<number, number>,
    eldersOdds: Map<number, number>,
    baronsOdds: Map<number, number>,
    heraldsOdds: Map<number, number>,
    killsOdds: Map<number, number>,
    deathsOdds: Map<number, number>,
    assistsOdds: Map<number, number>
  ) {
    this.id = id;
    this.winOdds = winOdds;
    this.goldOdds = goldOdds;
    this.expOdds = expOdds;
    this.towersOdds = towersOdds;
    this.drakesOdds = drakesOdds;
    this.inhibitorsOdds = inhibitorsOdds;
    this.eldersOdds = eldersOdds;
    this.baronsOdds = baronsOdds;
    this.heraldsOdds = heraldsOdds;
    this.killsOdds = killsOdds;
    this.deathsOdds = deathsOdds;
    this.assistsOdds = assistsOdds;
  }

}

export class BettingOddsDuo {
  @autoserializeAs(() => BettingOdd, 'away_team_odds') awayTeamOdd: BettingOdd;
  @autoserializeAs(() => BettingOdd,'local_team_odds') localTeamOdd: BettingOdd;

  constructor(awayTeamOdd: BettingOdd, localTeamOdd: BettingOdd) {
    this.awayTeamOdd = awayTeamOdd;
    this.localTeamOdd = localTeamOdd;
  }
}

