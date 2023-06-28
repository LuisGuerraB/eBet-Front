import {Team} from "./team";
import {autoserializeAs} from "dcerialize";

export class PlayTeam{
  @autoserializeAs( () => Team) team : Team;
  @autoserializeAs(() => Boolean) local : boolean;

  constructor(team : Team, local : boolean){
    this.team = team;
    this.local = local;
  }
}
