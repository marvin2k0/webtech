import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private readonly cacheDuration = 1000 * 60 // 1 Minute
  private cache = new Map<String, CachedResponse>()

  get(url: string): HttpResponse<any> | undefined {
    const cached = this.cache.get(url)

    if (!cached) {
      return undefined
    }

    const isExpired = Date.now() - cached.timestamp > this.cacheDuration

    if (isExpired) {
      this.cache.delete(url)
      return undefined
    }

    return cached.response
  }

  set(url: string, response: HttpResponse<any>): void {
    this.cache.set(url, {response, timestamp: Date.now()})
  }

  invalidate(url: string) {
    this.cache.delete(url)
  }

  invalidateAll() {
    this.cache.clear()
  }
}

interface CachedResponse {
  response: HttpResponse<any>,
  timestamp: number
}
