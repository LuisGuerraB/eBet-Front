import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api-service";
import {catchError, tap} from "rxjs";

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
    return this.http.post(this.path + '/login', {
      username: username,
      password: password
    }, {withCredentials: true}).pipe(
      tap(response => {
        sessionStorage.setItem('user', JSON.stringify(response));
      }),
      catchError(err => {
        throw new Error(err.error.message);
      }))
  }
}
