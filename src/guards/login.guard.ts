import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {catchError, map, Observable, take} from "rxjs";
import {SessionStorageService} from "../service/session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private sessionStorage: SessionStorageService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    if (this.sessionStorage.getItem('user') != undefined) {
      return true;
    } else {
      return this.router.createUrlTree(['/auth/error/401']);
    }

  }
}
