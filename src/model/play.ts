import {Team} from "./team";
import {autoserializeAs} from "dcerialize";
import {Match} from "./match";

export class PlayTeam{
  @autoserializeAs( () => Team) team : Team;
  @autoserializeAs(() => Boolean) local : boolean;

  constructor(team : Team, local : boolean){
    this.team = team;
    this.local = local;
  }
}

export class PlayMatch{
  @autoserializeAs( () => Match) match : Match;
  @autoserializeAs( () => Number,'team_id') teamId : number;

  constructor(match : Match, teamId : number){
    this.match = match;
    this.teamId = teamId;
  }
}
