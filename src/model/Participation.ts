import {autoserializeAs, autoserializeAsArray} from "dcerialize";
import {Team} from "./team";
import {Season} from "./season";

export class Participation {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => Number) position: string;
  @autoserializeAs(() => Season) season: Season;
  @autoserializeAs(() => Team) team: Team;

  constructor(id: number, position: string, season: Season, team: Team) {
    this.id = id;
    this.position = position;
    this.season = season;
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
