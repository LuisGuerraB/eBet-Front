import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";
import {Deserialize, IJsonObject} from "dcerialize";
import {map} from "rxjs";
import {LeagueList} from "../model/league";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private path = '/league';
  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  getLeagueList(esportId : number){
    return this.http.get<IJsonObject>(this.path + '/list/' + esportId.toString()).pipe(
      map((leagueList) => Deserialize(leagueList, () => LeagueList))
    );
  }
}
