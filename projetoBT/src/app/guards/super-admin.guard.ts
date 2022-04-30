import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.roles.user.pipe(
      take(1),
      map(user => user && this.roles.canSuperAdmin(user) ? true : false),
      tap(isSuperAdmin => {
        if (!isSuperAdmin) {
          console.error('Acesso restrito para admins')
        }
      })
    );
  }
  constructor(private roles: AuthService) { }


}
