import {autoserializeAs, autoserializeAsArray} from "dcerialize";
import {Team} from "./team";

export class Participation {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => Number) position: number;
  @autoserializeAs(()=> Number) points: number
  @autoserializeAs(() => Team) team: Team;

  constructor(id: number, position: number,points:number, team: Team) {
    this.id = id;
    this.position = position;
    this.points = points;
    this.team = team;
  }
}

export class ParticipationList{
  @autoserializeAsArray(() => Participation) items: Participation[];
  @autoserializeAs(() => Number) total: number;

  constructor(items: Participation[], total: number) {
    this.items = items;
    this.total = total;
  }
}
