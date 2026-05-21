import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError, switchMap, BehaviorSubject, filter, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getAccessToken();

    console.log('🔑 Token:', token ? token.substring(0, 20) + '...' : 'NO HAY TOKEN');
    console.log('🌐 URL:', req.url);

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('❌ Error:', err.status, req.url);
        if (err.status === 401 && !req.url.includes('/auth/token/')) {
          if (!this.refreshing) {
            this.refreshing = true;
            this.refreshSubject.next(null);

            return this.auth.refreshToken().pipe(
              switchMap(res => {
                this.refreshing = false;
                this.refreshSubject.next(res.access);
                return next.handle(
                  req.clone({ setHeaders: { Authorization: `Bearer ${res.access}` } })
                );
              }),
              catchError(e => {
                this.refreshing = false;
                this.auth.logout();
                return throwError(() => e);
              })
            );
          } else {
            return this.refreshSubject.pipe(
              filter(token => token !== null),
              take(1),
              switchMap(token =>
                next.handle(
                  req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
                )
              )
            );
          }
        }
        return throwError(() => err);
      })
    );
  }
}