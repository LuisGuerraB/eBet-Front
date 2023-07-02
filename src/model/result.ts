import {autoserializeAs, autoserializeAsArray} from "dcerialize";

export class Stat {
  @autoserializeAs(() => String) type: string;
  @autoserializeAs(() => Number) value: number;

  constructor(type: string, value: number) {
    this.type = type;
    this.value = value;
  }
}

export class Result {
  @autoserializeAs(() => Number)set: number;
  @autoserializeAsArray(() => Stat)stats: Stat[];

  constructor( set: number, stats: Stat[]) {
    this.set = set;
    this.stats = stats;
  }
}


export class ResultByMatch {
  @autoserializeAsArray(() => Result, undefined ,'away_team_result')awayTeamResult: Result[]
  @autoserializeAsArray(() => Result, undefined, 'local_team_result')localTeamResult: Result[]

  constructor(awayTeamResult: Result[], localTeamResult: Result[]) {
    this.awayTeamResult = awayTeamResult;
    this.localTeamResult = localTeamResult;
  }
}


export class Statistic {
  @autoserializeAs(()=> String ) type: string;
  @autoserializeAs(()=>Number , 'sum_values') sumValues: number;
  @autoserializeAs(()=>Number, 'count_values') countValues: number;

  constructor(type: string, sumValues: number, countValues: number){
    this.type = type;
    this.sumValues = sumValues;
    this.countValues = countValues;
  }
}
