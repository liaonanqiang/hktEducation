import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError, map } from 'rxjs/operators';
//import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResolverserviceService implements Resolve<any> {

  constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute) { }
      
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let url = route.data['path'];
    let user = { "id" : "1"};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    // let param = JSON.stringify(user);
    // console.log(param)
    return this._http.post<any>(url,user).pipe(

    // return this._http.post(url,{JSON.stringify(user)},{ options:{ headers: headers}}).pipe(
      take(1),
      map(res => {
        if (res) {
        console.log('33333333')
          //console.log(res)
          return res;
        } else { 
          this.router.navigate(['']);
          return res;
        }
      })
    )
  }
}