import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAuthenticated = localStorage.getItem('role'); 

    if (isAuthenticated && isAuthenticated === 'admin') {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}