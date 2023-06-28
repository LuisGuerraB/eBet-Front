import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public getApiUrl(){
    return "http://localhost:30888/api/v1";
  }

  public getBackEndUrl(){
    return "http://localhost:30888/";
  }
}
