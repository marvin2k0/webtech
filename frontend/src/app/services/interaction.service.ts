import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {IRestResponse} from '../model/http/rest-response';
import {CachingService} from './caching.service';
import {CommentDetails} from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private baseUrl: string = `${environment.baseUrl}/interaction`

  cachingService: CachingService = inject(CachingService)
  http: HttpClient = inject(HttpClient)

  getRating(referenceId: string) {
    return this.http.get<IRestResponse>(`${this.baseUrl}/rating/${referenceId}`)
  }

  upvote(referenceId: string) {
    return this.http.post<IRestResponse>(`${this.baseUrl}/upvote`, {referenceId})
  }

  downvote(referenceId: string) {
    return this.http.post<IRestResponse>(`${this.baseUrl}/downvote`, {referenceId})
  }

  saveComment(referenceId: string, text: string) {
    return this.http.post<IRestResponse>(this.baseUrl, {referenceId, text})
  }

  getCommentsByReferenceId(referenceId: string) {
    return this.http.get<IRestResponse>(`${this.baseUrl}/find?referenceId=${referenceId}`)
  }

  formatTime(comment: CommentDetails): string {
    const difference = Date.now() - comment.timestamp
    let formattedTime = ""

    if (difference / 1000 / 60 < 60) {
      formattedTime = Math.round(difference / 1000 / 60) + "m"
    } else if (difference / 1000 / 60 / 60 < 24) {
      formattedTime = Math.round(difference / 1000 / 60 / 60).toString() + "h"
    } else {
      formattedTime = Math.round(difference / 1000 / 60 / 60 / 24).toString() + "d"
    }

    return formattedTime
  }
}
