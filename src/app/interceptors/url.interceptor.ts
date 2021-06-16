import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class URLInterceptor implements HttpInterceptor {

  constructor() { }

  private updateUrl(req: string) {
    if (req.startsWith('http', 0)) {
      return `${req}`;
    } else {
      return `${environment.oktaApiUrl}${req}`;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      url: this.updateUrl(request.url),
      setParams: {client: 'true'},
    });

    return next.handle(newRequest);
  }
}
