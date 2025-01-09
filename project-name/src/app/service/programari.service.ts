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

export interface Programari {
  id: number;
  client: User;
  doctor: Doctor;
  ziLucru: string;
  oraProgramare: number;
}

  @Injectable({
    providedIn: 'root'
  })

  export class ProgramariService {
    private apiUrl = 'http://localhost:9090/api/programari';  // Your backend API URL
  
    constructor(private http: HttpClient) {}
  
    // Get all appointments
    getAllProgramari(): Observable<Programari[]> {
      return this.http.get<Programari[]>(`${this.apiUrl}/all`);
    }
  
    // Get appointments by doctor ID
    getProgramariByDoctorId(doctorId: number): Observable<Programari[]> {
      return this.http.get<Programari[]>(`${this.apiUrl}/doctor/${doctorId}`);
    }
  
    // Get appointments by client ID
    getProgramariByClientId(clientId: number): Observable<Programari[]> {
      return this.http.get<Programari[]>(`${this.apiUrl}/client/${clientId}`);
    }
  
    // Get a single appointment by ID
    getProgramareById(id: number): Observable<Programari> {
      return this.http.get<Programari>(`${this.apiUrl}/get/${id}`);
    }
  
    // Create a new appointment
    createProgramare(clientId: number, doctorId: number, oraProgramare: number): Observable<Programari> {
      const params = new HttpParams()
        .set('clientId', clientId.toString())
        .set('doctorId', doctorId.toString())
        .set('oraProgramare', oraProgramare.toString());
  
      return this.http.post<Programari>(`${this.apiUrl}/add`, {}, { params });
    }
  
    // Delete an appointment by ID
    deleteProgramare(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }

    getAllSpecializations(): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/specializations`);
    }

  }