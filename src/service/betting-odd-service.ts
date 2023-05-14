import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";
import {Deserialize, IJsonObject} from "dcerialize";
import {map} from "rxjs";
import {BettingOddsDuo} from "../model/betting-odd";

@Injectable({
  providedIn: 'root'
})
export class BettingOddService {

  private path = '/betting_odds';
  constructor(private http: HttpClient,private api:ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  public getBettingOdds(matchId: number) {
    return this.http.get<IJsonObject>(this.path + '/' + matchId ).pipe(
      map((bettingOddsDuo) => Deserialize(bettingOddsDuo, () => BettingOddsDuo))
    );
  }
}
