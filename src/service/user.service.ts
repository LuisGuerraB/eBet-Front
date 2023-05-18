import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = '/user';

  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  public register(username:string,email:string,password:string){
    console.log(this.path + '/register');
    this.http.post(this.path + '/register', {
      username:username,
      email:email,
      password:password
    }).subscribe(value => {console.log(value)})
  }
}
