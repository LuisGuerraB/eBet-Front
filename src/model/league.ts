import {autoserializeAs, autoserializeAsArray} from "dcerialize";

export class League {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => String) name: string;
  @autoserializeAs(() => String) acronym: string;
  @autoserializeAs(() => String) img: string;

  constructor(id: number, name: string, acronym: string, img:string) {
    this.id = id;
    this.name = name;
    this.acronym = acronym;
    this.img = img;
  }
}

export class LeagueList{
  @autoserializeAsArray(() => League) items: League[];
  @autoserializeAs(() => Number) total: number;

  constructor(items: League[], total: number) {
    this.items = items;
    this.total = total;
  }
}
