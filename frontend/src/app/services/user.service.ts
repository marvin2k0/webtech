import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO use environments? (glaube ng g environments)
  private baseUrl: string = "http://localhost:8080/users"
  private http: HttpClient = inject(HttpClient)

  register(username: string, email: string, password: string) {

  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password})
  }
}
