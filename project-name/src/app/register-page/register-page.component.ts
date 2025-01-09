import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  email: string = '';
  nume: string = '';
  tip_boala: string = '';
  varsta: number | null = null;
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  specializations: string[] = []; // To store the specializations

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchSpecializations();
  }

  fetchSpecializations() {
    this.doctorService.getSpecializations().subscribe(
      (specializations) => {
        this.specializations = specializations;
      },
      (error) => {
        console.error('Error fetching specializations:', error);
      }
    );
  }

  onSubmit() {
    if (this.email && this.nume && this.tip_boala && this.varsta !== null && this.password) {
      const newUser = {
        email: this.email,
        nume: this.nume,
        tip_boala: this.tip_boala,
        varsta: this.varsta,
        password: this.password
      };

      this.userService.createUser(newUser).subscribe(
        () => {
          this.successMessage = 'User registered successfully!';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/welcome']), 2000);
        },
        (error) => {
          this.errorMessage = 'Failed to register user. Email may already be in use.';
          this.successMessage = '';
          console.error('Registration error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out all fields.';
    }
  }
}
