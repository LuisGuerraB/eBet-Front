import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path = '/user';
  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  public register(username: string, email: string, password: string) {
    this.http.post(this.path + '/register', {
      username: username,
      email: email,
      password: password
    }).subscribe(value => {
      console.log(value)
    })
  }

  public login(username: string, password: string) {
    this.http.post(this.path + '/login', {
      username: username,
      password: password
    },{ withCredentials: true }).subscribe((user) => {
      sessionStorage.setItem('user', JSON.stringify(user));
    })
  }
}
