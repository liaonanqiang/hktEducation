import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from './../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
	 apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.apiUrl+'/users');
    }

    getById(id: number) {
        return this.http.get(this.apiUrl+'/users/'+'1');
    }

    // register(user: User) {
    //     return this.http.post(`${config.apiUrl}/users/register`, user);
    // }

    // update(user: User) {
    //     return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }
}