import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id: number;
    email: string;
    nume: string;
    tip_boala: string;
    varsta: number;
    password: string;
  }

  export interface Doctor {
    id: number;
    nume: string;
    email: string;
    specializare: string;
    zi_lucru: string;
    ora_start: number;
    ora_finish: number;
  }

  export interface Compatibility {
    id?: number;
    user: User;
    doctor: Doctor;
  }

  @Injectable({
    providedIn: 'root'
  })

  export class CompatibilityService {
    private apiUrl = 'http://localhost:9090/api/compatibilities';
  
    constructor(private http: HttpClient) {}
  
    // Get all compatibilities
    getAllCompatibilities(): Observable<Compatibility[]> {
      return this.http.get<Compatibility[]>(`${this.apiUrl}/all`);
    }
  
    // Get a single compatibility by ID
    getCompatibilityById(id: number): Observable<Compatibility> {
      return this.http.get<Compatibility>(`${this.apiUrl}/get/${id}`);
    }
  
    // Get compatibilities by user ID
    getCompatibilitiesByUserId(userId: number): Observable<Compatibility[]> {
      return this.http.get<Compatibility[]>(`${this.apiUrl}/user/${userId}`);
    }
  
    // Get compatibilities by doctor ID
    getCompatibilitiesByDoctorId(doctorId: number): Observable<Compatibility[]> {
      return this.http.get<Compatibility[]>(`${this.apiUrl}/doctor/${doctorId}`);
    }
  
    // Create a new compatibility between user and doctor
    createCompatibility(userId: number, doctorId: number): Observable<Compatibility> {
      const params = new HttpParams().set('userId', userId.toString()).set('doctorId', doctorId.toString());
      return this.http.post<Compatibility>(`${this.apiUrl}/add`, {}, { params });
    }
  
    // Automatically create compatibility records (if supported by backend logic)
    autoCreateCompatibilities(): Observable<Compatibility[]> {
      return this.http.post<Compatibility[]>(`${this.apiUrl}/auto-create`, {});
    }
  
    // Delete compatibility by ID
    deleteCompatibility(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
  }