import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IRestResponse } from '../model/http/rest-response';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = `${environment.baseUrl}/users`
  private http: HttpClient = inject(HttpClient)

  register(username: string, email: string, password: string) {
    return this.http.post<IRestResponse>(`${this.baseUrl}`, {username, email, password});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password})
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getUserInformation() {
    return this.http.get<IRestResponse>(`${this.baseUrl}/me`)
  }
}
