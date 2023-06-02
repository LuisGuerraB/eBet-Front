import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";
import {Deserialize, IJsonObject} from "dcerialize";
import {ParticipationList} from "../model/Participation";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private path = '/participation';
  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  getParticipationByLeague(leagueId: number) {
    return this.http.get<IJsonObject>(this.path + '/league/' + leagueId).pipe(
      map((participationList) => Deserialize(participationList, () => ParticipationList))
    )
  }
}
