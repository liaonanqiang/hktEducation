import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';  // change to new RxJS 6 import syntax
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class MyhttpService {

  constructor(private httpClient: HttpClient) { }

   postUrl(url: string, body: any, options?: any) {
     let jwt = sessionStorage.getItem('access_token');
     let token = 'Bearer ' + jwt;
     // let headers = new HttpHeaders();
     // headers.append('Content-Type', "application/x-www-form-urlencoded");
     // headers.append('authorization', token);
     // let option = { headers: headers };
     const httpHeaders = new HttpHeaders ({
     'Content-Type': 'application/json',
     'authorization': token
     });

    // return this.httpClient.post(url, body, option);
     return this.httpClient.post<any>(url, {body}, { headers: httpHeaders }).pipe(tap(res => { 
     }))

  }


}
