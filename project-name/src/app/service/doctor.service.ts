import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doctor {
    id?: number;
    nume: string;
    email: string;
    specializare: string;
    zi_lucru: string;
    ora_start: number;
    ora_finish: number;
  }
  
  @Injectable({
    providedIn: 'root'
  })

  export class DoctorService {
    getAllSpecializations() {
      throw new Error('Method not implemented.');
    }
    private apiUrl = 'http://localhost:9090/api/doctors';
  
    constructor(private http: HttpClient) {}
  
    // Get all doctors
    getAllDoctors(): Observable<Doctor[]> {
      return this.http.get<Doctor[]>(`${this.apiUrl}/all`);
    }
  
    // Get doctor by ID
    getDoctorById(id: number): Observable<Doctor> {
      return this.http.get<Doctor>(`${this.apiUrl}/get/${id}`);
    }
  
    // Create a new doctor
    createDoctor(doctor: Doctor): Observable<Doctor> {
      return this.http.post<Doctor>(`${this.apiUrl}/add`, doctor);
    }
  
    // Update doctor by ID
    updateDoctor(id: number, updatedDoctor: Doctor): Observable<Doctor> {
      return this.http.patch<Doctor>(`${this.apiUrl}/update/${id}`, updatedDoctor);
    }
  
    // Delete doctor by ID
    deleteDoctor(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
    getSpecializations(): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/specializations`);
    }
  }