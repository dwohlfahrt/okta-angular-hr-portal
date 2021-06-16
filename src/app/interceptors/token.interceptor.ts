import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { getAccessToken } from '../shared/utils';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith(environment.oktaApiUrl, 0)) {
      return next.handle(request);
    }
    
    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    });
    return next.handle(newRequest);
  }
}
