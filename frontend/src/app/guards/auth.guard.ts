import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.isUserAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }

  private isUserAuthenticated(): boolean {

    return !!localStorage.getItem('accessToken');
  }
}
