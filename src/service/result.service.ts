import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Deserialize, IJsonObject} from "dcerialize";
import {ResultByMatch, Statistic} from "../model/result";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private path = '/result';

  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  get_result_from_match(matchId : number){
    return this.http.get<IJsonObject>(this.path + '/match/' + matchId).pipe(
      map((resultByMatch) => Deserialize(resultByMatch, () => ResultByMatch))
    );
  }

  get_statistic_from_team(teamId : number){
    return this.http.get<IJsonObject[]>(this.path + '/team/' + teamId).pipe(
      map((statistics) => {
        const res : Statistic[] = []
        for (let json of statistics){
          res.push(Deserialize(json, () => Statistic))
        }
        return res
      })
    );
  }
}
