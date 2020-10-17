import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginModel } from '../../../infrastructure/model/public';
import { LocalService } from '../local';
import { AUTH_API_URL } from './auth.url';
import { environment } from '../../../../environments/environment';


@Injectable({providedIn: 'root'})

export class AuthenticationService {
  private serviceConstants: { access_token: string } = {
    access_token: 'access_token',
  };

  constructor(private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private local: LocalService) {
  }

  public isAuthenticated(): boolean {
    try {
      const jwtHelper = new JwtHelperService();
      const token = this.accessToken;
      return !jwtHelper.isTokenExpired(token);
    } catch (err) {
      return false;
    }
  }

  // =========== Log out ===========

  public logOut(): void {
    this.local.removeItem(this.serviceConstants.access_token);
    this.router.navigate(['/']);
  }

  // =========== Log in ===========

  public login(loginModel: LoginModel): Promise<void | boolean> {
    return new Promise<void | boolean>((resolve, reject) => {
      this.http.post(environment.authPath + AUTH_API_URL.login, loginModel)
        .subscribe(
          (response) => {
            console.log(this.parseJwt(response['data'].access_token));
            this.saveJwt((response['data'].access_token));
            resolve();
          },
          (err) => {
            if (err.error) {
            }
            reject(err);
          },
        );
    });
  }

  // =========== Token ===========

  public get accessToken(): string {
    return this.local.getItem(this.serviceConstants.access_token);
  }

  private saveJwt(jwt): void {
    if (jwt) {
      this.local.setItem(this.serviceConstants.access_token, jwt);
    }
  }

  private parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
