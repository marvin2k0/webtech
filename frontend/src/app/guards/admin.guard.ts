import {CanActivateFn, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {inject} from '@angular/core';
import {UserRole} from '../model/user.role.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService)
  const router: Router = inject(Router)
  const userRole = userService.getRole()

  if (!userRole) {
    router.navigateByUrl("/").then();
    return false
  }

  return userRole == UserRole.admin.id.toString();
};
