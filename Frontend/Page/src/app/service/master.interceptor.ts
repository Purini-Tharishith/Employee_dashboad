import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedDataService } from '../shared-data.service';
@Injectable()
export class MasterInterceptor implements HttpInterceptor {

  constructor(private sharedData :SharedDataService,private router :Router) {}
  token : any;
  cloneRequest:any;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const allowRequest1="http://localhost:8082/api/signup";
    const allowRequest2="http://localhost:8082/api/signin";
    const allowRequest3 = "http://localhost:8082/api/check/email"
    if(request.url==allowRequest1 || request.url==allowRequest2 || request.url == allowRequest3){
      return next.handle(request);
    }
    else{
    
    const sessionData = sessionStorage.getItem('key');
    if(sessionData){this.token = JSON.parse(sessionStorage.getItem('key')).token
    this.cloneRequest=request.clone({
      setHeaders:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  else{
    this.router.navigateByUrl('/login');
  }
    return next.handle(this.cloneRequest);
  
  
    }
  
  }
}

