import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { LocalStorageService } from '../../../core/services/local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._localStorageService.get('userAuth.token') as string || '';
    return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
      .pipe(
        catchError((exc) => {
          this._router.navigate(['/login']);
          return throwError(exc);
        })
      );
  }
}
