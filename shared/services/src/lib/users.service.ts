import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    constructor (private http: HttpClient) {}

    getUsers (): Observable<User[]> {

        return this.http.get<User[]>(this.apiUrl);

    }

    getUserById (id: number): Observable<User> {

        return this.http.get<User>(`${this.apiUrl}/${id}`);

    }

}
