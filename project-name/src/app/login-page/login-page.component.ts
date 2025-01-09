import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.email === 'admin@admin.com' && this.password === 'admin') {
      // Admin user detected
      this.message = 'Admin login successful!';
      localStorage.setItem("role","admin");
      console.log(this.message);
      setTimeout(() => {
        this.router.navigate(['/admin']);  // Redirect to admin page
      }, 1500);
    } else {
      // Regular user login attempt
      this.userService.loginUser(this.email, this.password).subscribe(
        (response) => {
          localStorage.setItem("role","user");
          this.message = 'User login successful!';
          console.log(this.message, response);
          setTimeout(() => {
            this.router.navigate(['/user']);  // Redirect to user page
          }, 1500);
        },
        (error) => {
          // Handle error and show failure message
          this.message = 'Login unsuccessful, wrong email or password!';
          console.error(this.message, error);
        }
      );
    }
  }
}