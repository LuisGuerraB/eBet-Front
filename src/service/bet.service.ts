import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Bet, BetList} from "../model/bet";
import {Deserialize, IJsonObject} from "dcerialize";
import {catchError, map, tap} from "rxjs";
import {SessionStorageService} from "./session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BetService {

  private path = '/bet';

  constructor(private http: HttpClient, private api: ApiService, private sessionStorage: SessionStorageService) {
    this.path = api.getApiUrl() + this.path;
  }

  createBet(bet: Bet) {
    return this.http.post<IJsonObject>(this.path + '/', {
      'type': bet.type,
      'set' : bet.set,
      'multiplier': bet.multiplier,
      'amount': bet.amount,
      'subtype': bet.subtype,
      'match_id': bet.match.id,
      'team_id': bet.teamId
    }, {withCredentials: true}).pipe(tap(() => {
        if (this.sessionStorage.getItem('user') != undefined) {
          const userData = this.sessionStorage.getItem('user')!;
          userData.balance -= bet.amount;
          this.sessionStorage.setItem('user', userData);
        }
      }),
      map((bet) => Deserialize(bet, () => Bet)),
      catchError(err => {
        throw new Error(err.statusText);
      }))
  }

  getBets() {
    return this.http.get<IJsonObject>(this.path + '/list', {withCredentials: true}).pipe(
      map((betList) => Deserialize(betList, () => BetList)),
      catchError(err => {
        throw new Error(err.statusText);
      }))
  }

  deleteBet(id: number) {
    return this.http.delete<IJsonObject>(this.path + '/' + id, {withCredentials: true}).pipe(
      catchError(err => {
        throw new Error(err.statusText);
      })
    )
  }

  updateBetAmount(id: number, newAmount: number) {
    return this.http.put<IJsonObject>(this.path + '/' + id + '/amount/' + newAmount.toString(),
      {},{withCredentials: true}
    ).pipe(
      catchError(err => {
        throw new Error(err.statusText);
      })
    )
  }
}
