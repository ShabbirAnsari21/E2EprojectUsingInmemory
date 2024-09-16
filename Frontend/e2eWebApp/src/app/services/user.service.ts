import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7233/api/User';
  constructor(private http: HttpClient) {}

  // Add a new inventory
  signup(username: string, password: string): Observable<any> {
    debugger;
    const signupData = { username, password };
    return this.http.post(`${this.apiUrl}/signup`, signupData);
  }

  // Login user
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
}
