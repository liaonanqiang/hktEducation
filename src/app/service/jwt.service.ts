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

    login(username: string, password: string) {
    return this.httpClient.post<{access_token:  string}>(this.apiUrl+'/auth/login', {username, password}).pipe(tap(res => {
    	console.log(res)
    localStorage.setItem('access_token', res.access_token);
	}))
	};

	logout() {
    localStorage.removeItem('access_token');
	};

	public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
	}
}