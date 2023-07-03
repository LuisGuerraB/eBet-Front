import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public getApiUrl(){
    return "http://bahia.ugr.es:30888/api/v1";
  }

  public getBackEndUrl(){
    return "http://bahia.ugr.es:30888/";
  }
}
