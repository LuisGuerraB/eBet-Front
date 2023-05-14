import {autoserializeAs} from 'dcerialize';
export class Team {
  @autoserializeAs(()=>Number )id: number;
  @autoserializeAs(()=>String )acronym: string;
  @autoserializeAs(()=>String )name: string;
  @autoserializeAs(()=>String )img?: string;
  @autoserializeAs(()=>String )website?: string;
  @autoserializeAs(()=>String )nationality?: string;

  constructor(id : number,acronym : string,name : string,img: string,website: string,nationality: string) {
    this.id = id;
    this.acronym = acronym;
    this.name = name;
    this.img = img;
    this.website = website;
    this.nationality = nationality;
  }
}
