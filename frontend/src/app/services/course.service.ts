import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRestResponse} from '../model/http/rest-response';
import {environment} from '../../environments/environment.development';
import {CachingService} from './caching.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl: string = `${environment.baseUrl}/course`

  http: HttpClient = inject(HttpClient)
  cachingService: CachingService = inject(CachingService)

  findCourses(query: string): Observable<IRestResponse> {
    return this.http.get<IRestResponse>(`${this.baseUrl}?name=${query}&description=${query}`);
  }

  findCourseById(id: string): Observable<IRestResponse> {
    return this.http.get<IRestResponse>(`${this.baseUrl}/${id}`)
  }

  joinCourse(id: string): Observable<IRestResponse> {
    return this.http.post<IRestResponse>(`${this.baseUrl}/join/${id}`, {})
  }

  leaveCourse(id: string ): Observable<IRestResponse> {
    return this.http.post<IRestResponse>(`${this.baseUrl}/leave/${id}`, {})
  }
}
