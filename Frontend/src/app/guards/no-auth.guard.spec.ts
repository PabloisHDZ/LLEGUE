import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token) {
      // Si hay token, redirige a home y bloquea acceso a login
      this.router.navigate(['/home']);
      return false;
    } else {
      // Si no hay token, permite acceso a login
      return true;
    }
  }
}