import {autoserializeAs} from "dcerialize";

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
