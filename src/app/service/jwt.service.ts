import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

     public get currentUserValue() {
        return sessionStorage.getItem('currentUser');
    }


    login(username: string, password: string) {
    return this.httpClient.post<any>(this.apiUrl+'/api/auth/login', {username, password}).pipe(tap(res => {
    	// console.log(res)
     //   localStorage.setItem('access_token', res.access_token);
    	if(res.account && res.login_status && res.access_token){ 
           sessionStorage.setItem('access_token', res.access_token);
            sessionStorage.setItem('params', JSON.stringify(res.data));
           sessionStorage.setItem('currentUser', res.data.user_id);
        } 
	}))
	};

	logout() {
    sessionStorage.removeItem('access_token');
	};

	public get loggedIn(): boolean{
    return sessionStorage.getItem('access_token') !==  null;
	}
}
