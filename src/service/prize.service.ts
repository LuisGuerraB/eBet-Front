import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {catchError, map, tap} from "rxjs";
import {Deserialize, IJsonObject} from "dcerialize";
import {Prize, PrizeList} from "../model/prize";
import {SessionStorageService} from "./session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  private path = '/prize';
  private apiPath :string

  constructor(private http: HttpClient, private api: ApiService, private sessionStorage : SessionStorageService) {
    this.apiPath=api.getBackEndUrl();
    this.path = api.getApiUrl() + this.path;
  }


  createPrize(amount: number, price: number, imgData: File) {
    const formData: FormData = new FormData();
    formData.append('img', imgData, imgData.name);
    return this.http.post(this.path + '/', formData, {
      withCredentials: true, params: {
        amount: amount,
        price: price
      }
    })
  }

  getPrizes() {
    return this.http.get<IJsonObject>(this.path + '/list').pipe(
      map((prizesList) => Deserialize(prizesList, () => PrizeList)),
      map( (prizesList) => {
        for (let prize of prizesList.items){
          prize.img = this.apiPath + prize.img;
        }
        return prizesList;
      })
    )
  }

  deletePrize(prize_id: number) {
    return this.http.delete(this.path + '/' + prize_id.toString(), {withCredentials: true})
  }

  buyPrize(prize: Prize, email: string) {
    return this.http.post(this.path + '/buy/' + prize.id.toString(), {'email': email}, {withCredentials: true}).pipe(
      catchError(err => {
        throw new Error(err.error.message);
      }),
      tap(() => {
        let current_user = this.sessionStorage.getItem('user')
        current_user.balance -= prize.price
        this.sessionStorage.setItem('user', current_user)
      })
    )
  }
}
