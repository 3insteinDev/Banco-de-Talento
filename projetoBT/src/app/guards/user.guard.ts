import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.roles.user.pipe(
      take(1),
      map(user => user && this.roles.canUserAdmin(user) ? true : false),
      tap(isUser => {
        if (!isUser) {
          console.error('Acesso restrito para usuários')
        }
      })
    );
  }

  constructor(private roles: AuthService) { }

}
