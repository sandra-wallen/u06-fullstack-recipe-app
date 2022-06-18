import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'https://u06-backend-sandrawallen.herokuapp.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient, 
    public router: Router
  ) { }

  register(user: object): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/register`, user, { headers: this.headers });
  }

  login(user: object) {
    return this.http.post<any>(`${this.endpoint}/login`, user, { headers: this.headers });
  }

  // Can be called to retrieve token
  getToken() {
      return localStorage.getItem('access_token');
  }

  // Can be called to check if user is logged in
  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
