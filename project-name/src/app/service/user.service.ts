import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id?: number;
  email: string;
  nume: string;
  tip_boala: string;
  varsta: number;
  password: string;
}

// Define the User interface outside the class and decorator
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/users';
  private currentUser: User | null = null;  // Store logged-in user data

  constructor(private http: HttpClient) {}

  // Login method to authenticate and store user data
  loginUser(email: string, password: string): Observable<User> {
    const url = `${this.apiUrl}/login`;
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<User>(url, body.toString(), { headers }).pipe(
      tap(user => {
        this.currentUser = user;  // Store logged-in user data
      })
    );
  }

  // Retrieve the stored data of the current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Fetch additional personal data for the logged-in user by their ID
  getPersonalData(): Observable<User> {
    if (!this.currentUser?.id) {
      throw new Error("User not logged in");
    }
    return this.getUserById(this.currentUser.id);
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  // Get user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get/${id}`);
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  // Update user by ID
  updateUser(id: number, updatedUser: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/update/${id}`, updatedUser);
  }

  // Delete user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}