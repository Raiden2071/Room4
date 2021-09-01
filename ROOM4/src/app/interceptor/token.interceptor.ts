import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    req = req.clone({
      url: environment.API_URL + req.url + environment.API_KEY,
    });
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403) {
          // localStorage.clear();
          // sessionStorage.clear();
        }
        return throwError(err);
      }
      )
    );
  }
}
