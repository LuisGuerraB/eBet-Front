import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";
import {catchError, map, tap} from "rxjs";
import {Deserialize, IJsonObject} from "dcerialize";
import {User, UserLoginResponse} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path = '/user';

  constructor(private http: HttpClient, private api: ApiService) {
    this.path = api.getApiUrl() + this.path;
  }

  public register(username: string, email: string, password: string) {
    return this.http.post(this.path + '/register', {
      username: username,
      email: email,
      password: password
    }).pipe(
      tap(response => {
      }),
      catchError(err => {
        throw new Error(err.error.message);
      }))
  }

  public login(username: string, password: string) {
    return this.http.post<IJsonObject>(this.path + '/login', {
      username: username,
      password: password
    }, {withCredentials: true}).pipe(
      map((user) => Deserialize(user, () => UserLoginResponse)),
      tap(user => {
        sessionStorage.setItem('user', JSON.stringify({'username': user.username, 'balance': user.balance, 'img': user.img, 'last_login' : user.lastLogin}));
      }),
      catchError(err => {
        throw new Error(err.error.message);
      }))
  }

  public redeemPrize() {
    return this.http.post(this.path + '/redeem', {}, {withCredentials: true}).pipe(
      catchError(err => {
        throw new Error(err.error.message);
      })
    )
  }

  public logOut() {
    return this.http.post(this.path + '/logout', {}, {withCredentials: true}).pipe(
      catchError(err => {
        throw new Error(err.error.message);
      }),
      tap(() => {
        sessionStorage.removeItem('user');
      })
    )
  }
}
