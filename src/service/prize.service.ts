import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "./api.service";
import {catchError, tap} from "rxjs";
import {FormBuilder} from "@angular/forms";

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
}
