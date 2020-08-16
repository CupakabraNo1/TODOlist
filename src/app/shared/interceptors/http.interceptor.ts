import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  readonly SIGN_UP = "signUp";
  readonly SIGN_IN = "signIn";

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const path = req.url;

    if (!(path.indexOf(this.SIGN_IN) > -1 || path.indexOf(this.SIGN_UP) > -1)) {

      req = req.clone({
        url: environment.REST_ENDPOINT + path
      });


    }

    return next.handle(req);
  }
}
