import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Deserialize, IJsonObject} from "dcerialize";
import {Team} from "../model/team";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private path = '/team';

  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  getTeam(teamId : number){
    return this.http.get<IJsonObject>(this.path + '/' + teamId).pipe(
      map((team) => Deserialize(team, () => Team))
    );
  }
}
