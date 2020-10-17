import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.accessToken;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && this.router.url.indexOf('/login') === -1) {
            switch ((error as HttpErrorResponse).status) {
              case 401:
                this.authService.logOut();
                break;
              default:
                return throwError(error);
            }
          } else {
            return throwError(error);
          }
        }),
      );
  }
}
