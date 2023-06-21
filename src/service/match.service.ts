import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Deserialize, IJsonObject} from "dcerialize";
import {map} from "rxjs";
import {Match, MatchList, MatchListQueryParams} from "../model/match";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private path = '/match';

  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  public getMatchById(matchId: number) {
    return this.http.get<IJsonObject>(this.path + '/' + matchId).pipe(
      map((match) => Deserialize(match, () => Match))
    );
  }

  public getMatchList(params: MatchListQueryParams) {
    let httpParams = new HttpParams();

    if (params.year != -1) {
      console.log(params.year);
      httpParams = httpParams.append('year', params.year);
    }
    if (params.month != -1) {
      httpParams = httpParams.append('month', params.month);
    }
    if (params.league_id != -1) {
      httpParams = httpParams.append('league_id', params.league_id);
    }
      httpParams = httpParams.append('finished', params.finished);
      httpParams = httpParams.append('limit', params.limit);
      httpParams = httpParams.append('page', params.page);

    return this.http.get<IJsonObject>(this.path + '/list', {params: httpParams}).pipe(
      map((matchList) => Deserialize(matchList, () => MatchList))
    )
  }
}
