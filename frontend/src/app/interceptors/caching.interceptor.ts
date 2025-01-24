import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {CachingService} from '../services/caching.service';
import {inject} from '@angular/core';
import {of, tap} from 'rxjs';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cachingService: CachingService = inject(CachingService)

  if (req.method !== "GET") {
    cachingService.invalidateAll();
    return next(req)
  }

  const cachedResponse = cachingService.get(req.url)

  if (cachedResponse) {
    return of(cachedResponse.clone())
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cachingService.set(req.urlWithParams, event)
      }
    })
  )
};
