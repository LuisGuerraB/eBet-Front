import {autoserializeAs} from "dcerialize";


export interface User {
  username: string;
  balance: number;
  img: string;
}

export class UserLoginResponse implements User {
  @autoserializeAs(() => String) username: string;
  @autoserializeAs(() => Number) balance: number;
  @autoserializeAs(() => String) img: string;
  @autoserializeAs(() => Boolean) prize: boolean;
  @autoserializeAs(() => Date, 'last_login') lastLogin: Date;

  constructor(username: string, balance: number, prize: boolean, img: string, lastLogin: Date) {
    this.username = username;
    this.balance = balance;
    this.img = img;
    this.prize = prize;
    this.lastLogin = lastLogin;
  }
}
