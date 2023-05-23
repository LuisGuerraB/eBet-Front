import {autoserializeAs} from "dcerialize";


export class User {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => String) username: string;
  @autoserializeAs(() => Number) balance: number;
  @autoserializeAs(() => String) img?: string;

  constructor(id: number, username: string, balance: number, img?: string) {
    this.id = id;
    this.username = username;
    this.balance = balance;
    this.img = img;
  }
}
