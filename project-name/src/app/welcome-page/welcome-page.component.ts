import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  constructor(private router: Router) {}

  // Navigation method for login
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Navigation method for register
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}