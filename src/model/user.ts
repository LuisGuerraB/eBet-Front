import {autoserializeAs, autoserializeAsArray} from "dcerialize";


export class User {
  @autoserializeAs(() => String) username: string;
  @autoserializeAs(() => Number) balance: number;
  @autoserializeAs(() => String) img: string;
  @autoserializeAs(() => Boolean) prize: boolean;
  @autoserializeAs(() => String) email?: string;
  @autoserializeAs(() => Date, 'last_login') lastLogin: Date;
  @autoserializeAsArray(() => String) privileges: string[];

  constructor(username: string, balance: number, prize: boolean, img: string, lastLogin: Date, privileges: string[], email?: string) {
    this.username = username;
    this.balance = balance;
    this.img = img;
    this.prize = prize;
    this.email = email;
    this.lastLogin = lastLogin;
    this.privileges = privileges;
  }
}

export class Privileges{
  @autoserializeAsArray(() => String) privileges: string[];
  constructor(privileges: string[]) {
    this.privileges = privileges;
  }
}
