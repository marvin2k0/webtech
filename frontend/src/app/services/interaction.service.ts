import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {IRestResponse} from '../model/http/rest-response';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private baseUrl: string = `${environment.baseUrl}/interaction`

  http: HttpClient = inject(HttpClient)

  saveComment(text: string) {
    return this.http.post<IRestResponse>(this.baseUrl, {text})
  }
}
