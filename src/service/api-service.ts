import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public getApiUrl(){
    return "http://localhost:5000/api/v1";
  }
}
