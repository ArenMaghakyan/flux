import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(protected router: Router,
              protected authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (state.url !== '/login' && !this.authService.isAuthenticated()) {
      console.log(this.authService.isAuthenticated(), 'this.authService.isAuthenticated()');
      this.authService.logOut();
      const navigationExtras: NavigationExtras = {
        queryParams: {redirectUrl: state.url},
      };
      this.router.navigate(['login'], navigationExtras);
      return false;
    }
    return true;
  }
}
