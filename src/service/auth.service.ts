import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {catchError, map, tap} from "rxjs";
import {Deserialize, IJsonObject} from "dcerialize";
import {Privileges, User} from "../model/user";
import {SessionStorageService} from "./session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path = '/user';
  private apiPath: string;

  constructor(private http: HttpClient, private api: ApiService, private sessionStorage: SessionStorageService) {
    this.apiPath = api.getBackEndUrl();
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
      map((user) => Deserialize(user, () => User)),
      tap(user => {
        this.sessionStorage.setItem('user', {
          'username': user.username,
          'balance': user.balance,
          'img': this.apiPath + user.img,
          'last_login': user.lastLogin
        });
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
        this.sessionStorage.removeItem('user');
      })
    )
  }

  public getPrivileges() {
    return this.http.get<IJsonObject>(this.path + '/privileges', {withCredentials: true}).pipe(
      map((privileges) => Deserialize(privileges, () => Privileges)),
      catchError(err => {
        throw new Error(err.error.message);
      })
    )
  }

  getCurrentUser() {
    return this.http.get<IJsonObject>(this.path, {withCredentials: true}).pipe(
      catchError(err => {
        console.log(err);
        throw new Error(err);
      }),
      map((user) => Deserialize(user, () => User)),
      map((user) => {
        user.img = this.apiPath + user.img;
        return user;
      })
    )
  }

  checkAttribute(attribute: string, field: string) {
    return this.http.post<IJsonObject>(this.path + '/check/' + attribute, {field: field}, {
      withCredentials: true
    })
  }


  changeAttribute(attribute: string, field: string) {
    return this.http.post<IJsonObject>(this.path + '/change/' + attribute, {field: field}, {
      withCredentials: true
    })
  }

  updateUser(user: User) {
    return this.http.put(this.path, user, {
      withCredentials: true
    }).pipe(
      catchError(err => {
        throw new Error(err.error.message);
      })
    )
  }

  updateUserImg(imgData: any) {
    const formData: FormData = new FormData();
    formData.append('file', imgData, imgData.name);
    return this.http.put<IJsonObject>(this.path + '/img', formData, {
      withCredentials: true
    }).pipe(tap((img) => {
      let current_user = this.sessionStorage.getItem('user')
      this.sessionStorage.setItem('user', {
        'username': current_user.username,
        'balance': current_user.balance,
        'img': this.apiPath + img['img'],
        'last_login': current_user.lastLogin
      })
    }))
  }
}
