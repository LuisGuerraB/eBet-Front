import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {catchError, map, Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredPrivilege = next.data['requiredPrivilege'];

    return this.authService.getPrivileges().pipe(
      map(privileges => {
        if (privileges.privileges.includes(requiredPrivilege)) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth/error/403']);
        }
      }),
      catchError(() => {
        return this.router.navigate(['/auth/error/403']);
      })
    );

  }
}
