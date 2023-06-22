import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "./api.service";
import {catchError, map, tap} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {Deserialize, IJsonObject} from "dcerialize";
import {Prize, PrizeList} from "../model/prize";

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  private path = '/prize';

  constructor(private http: HttpClient, private api: ApiService) {
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
      map((prizesList) => Deserialize(prizesList, () => PrizeList))
    )
  }

  deletePrize(prize_id: number) {
    return this.http.delete(this.path + '/' + prize_id.toString(), {withCredentials: true})
  }

  buyPrize(prize: Prize, email: string) {
    return this.http.post(this.path + '/buy/' + prize.id.toString(), {'email': email}, {withCredentials: true})
  }
}
