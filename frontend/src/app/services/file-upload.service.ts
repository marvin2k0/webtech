import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IRestResponse } from '../model/http/rest-response';

@Injectable({
  providedIn: 'root'
})

// @ToDo:   Rename to FileService
export class FileUploadService {
  private baseUrl: string = "http://localhost:8080/files"
  private http: HttpClient = inject(HttpClient)

  upload(params: any): Observable<any> | undefined {

    console.log("Enter Upload..")
    console.error("parameters", JSON.stringify(params));

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

  find(params: Object): Observable<any> | undefined {

    console.log("Enter Find files with params", JSON.stringify(params));

    const options = {}

    return ;
  }
}
