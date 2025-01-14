import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IRestResponse } from '../model/http/rest-response';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

// @ToDo:   Rename to FileService
export class FileUploadService {
  private baseUrl: string = `${environment.baseUrl}/files`
  private http: HttpClient = inject(HttpClient)

  upload(params: any): Observable<any> | undefined {

    if (!params.filename) {
      return ;
    }

    if (!params.course && !params.visibility) {
      return ;
    }

    if (!params.fileContent) return ;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }),
      //withCredentials: true // This includes credentials like cookies
    };

    return this.http.post<IRestResponse>(`${this.baseUrl}`, params, options);
  }


  edit() {
    // @ToDo:   Implement.
  }

  find(query: string): Observable<IRestResponse> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }),
    }

    // @ToDo: suche erweitern
    return this.http.get<IRestResponse>(`${this.baseUrl}/find?rndFilename=${query}`, options);
  }

  retrieve(rndFilename: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${rndFilename}`, { responseType: "blob" });
  }
}
