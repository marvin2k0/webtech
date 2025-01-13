import { HttpInterceptorFn } from '@angular/common/http';
import {UserService} from '../services/user.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService)

  if (userService.isLoggedIn()) {
    const token = userService.getToken()!
    const authenticatedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(authenticatedRequest);
  }

  return next(req);
};
