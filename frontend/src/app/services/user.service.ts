import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IRestResponse } from '../model/http/rest-response';
import {environment} from '../../environments/environment.development';
import {UserDetails} from '../components/admin-dashboard/admin-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = `${environment.baseUrl}/users`
  private http: HttpClient = inject(HttpClient)

  updateRole(newRole: string, userId: string) {
    console.log("updating role for " + userId, newRole)
    return this.http.post<IRestResponse>(`${this.baseUrl}/role`, {userId, newRole})
  }

  getAllUsers() {
    return this.http.get<IRestResponse>(`${this.baseUrl}`)
  }

  register(username: string, email: string, password: string) {
    return this.http.post<IRestResponse>(`${this.baseUrl}`, {username, email, password});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password})
  }

  getUserName() {
    return localStorage.getItem("username")
  }

  getRole() {
    return localStorage.getItem("role")
  }

  getUserId() {
    return localStorage.getItem("userId")
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getUserInformation() {
    return this.http.get<IRestResponse>(`${this.baseUrl}/me`);
  }

  postNewUsername(newUsername: string, oldUsername: string): Observable<any> {
    return this.http.post<IRestResponse>(`${this.baseUrl}/updateUser`, {newUsername, oldUsername});
  }

  postNewInformation(usernameTemp: string, newFocusPoint: string, newInstitute: string, newDob: string): Observable<any> {
    return this.http.post<IRestResponse>(`${this.baseUrl}/updateUserInformation`, {usernameTemp, newFocusPoint, newInstitute, newDob});
  }
}
