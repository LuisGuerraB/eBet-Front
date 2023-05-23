import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";
import {Bet} from "../model/bet";
import {Deserialize, IJsonObject, Serialize} from "dcerialize";
import {catchError, map, tap} from "rxjs";
import {BettingOddsDuo} from "../model/betting-odd";

@Injectable({
  providedIn: 'root'
})
export class BetService {

  private path = '/bet';

  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  createBet(bet: Bet) {
    return this.http.post<IJsonObject>(this.path + '/', {
      'date': bet.date.toISOString(),
      'type': bet.type.toUpperCase(),
      'multiplier': bet.multiplier,
      'amount': bet.amount,
      'subtype': bet.subtype,
      'match_id': bet.matchId,
      'team_id': bet.teamId
    }, {withCredentials: true}).pipe(
      map((bet) => Deserialize(bet, () => Bet)),
      catchError(err => {
        throw new Error(err.error.message);
      }))
  }
}
