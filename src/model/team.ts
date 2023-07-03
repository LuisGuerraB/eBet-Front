import {autoserializeAs} from 'dcerialize';
import {League} from "./league";

export class Team {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => String) acronym: string;
  @autoserializeAs(() => String) name: string;
  @autoserializeAs(() => League, 'regular_league') regularLeague: League;
  @autoserializeAs(() => String) img?: string;
  @autoserializeAs(() => String) website?: string;
  @autoserializeAs(() => String) nationality?: string;

  constructor(id: number, acronym: string, name: string, regularLeague: League, img: string, website: string, nationality: string) {
    this.id = id;
    this.acronym = acronym;
    this.name = name;
    this.regularLeague = regularLeague;
    this.img = img;
    this.website = website;
    this.nationality = nationality;
  }
}
