import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRestResponse} from '../model/http/rest-response';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl: string = "http://localhost:8080/course"

  http: HttpClient = inject(HttpClient)

  findCourses(query: string): Observable<IRestResponse> {
    return this.http.get<IRestResponse>(`${this.baseUrl}?name=${query}&description=${query}`);
  }

  findCourseById(id: string): Observable<IRestResponse> {
    return this.http.get<IRestResponse>(`${this.baseUrl}/${id}`)
  }
}
