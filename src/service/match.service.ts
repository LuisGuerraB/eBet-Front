import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";
import {Deserialize, IJsonObject} from "dcerialize";
import {map} from "rxjs";
import {Match} from "../model/match";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private path = '/match';
  constructor(private http: HttpClient,private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  public getMatchById(matchId: number) {
    return this.http.get<IJsonObject>(this.path + '/' + matchId ).pipe(
      map((match) => Deserialize(match, () => Match))
    );
  }
}
