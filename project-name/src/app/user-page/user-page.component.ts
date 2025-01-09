import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { DoctorService } from '../service/doctor.service';
import { CompatibilityService } from '../service/compatibility.service';
import { ProgramariService } from '../service/programari.service';
import { User } from '../service/user.service';
import { Doctor } from '../service/doctor.service';
import { Programari } from '../service/programari.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userData: User | null = null;
  compatibleDoctors: Doctor[] = [];
  appointmentDoctors: { doctorName: string; appointmentDay: string; appointmentHour: number }[] = [];
  
  // New properties for booking
  selectedDoctorId: number | null = null;
  selectedDay: string = '';
  availableHours: number[] = [];
  selectedHour: number | null = null;

  constructor(
    private userService: UserService,
    private compatibilityService: CompatibilityService,
    private doctorService: DoctorService,
    private programariService: ProgramariService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser && currentUser.id !== undefined) {
      this.userData = currentUser;
      this.loadCompatibleDoctors(currentUser.id);
      this.loadAppointmentDoctors(currentUser.id);
    }
  }

  loadCompatibleDoctors(userId: number): void {
    this.compatibilityService.getCompatibilitiesByUserId(userId).subscribe(compatibilities => {
      const doctorIds: number[] = compatibilities
        .map(compatibility => compatibility.doctor.id)
        .filter((id): id is number => id !== undefined);

      this.doctorService.getAllDoctors().subscribe(doctors => {
        this.compatibleDoctors = doctors.filter(doctor => doctorIds.includes(doctor.id as number));
      });
    });
  }

  loadAppointmentDoctors(userId: number): void {
    this.programariService.getProgramariByClientId(userId).subscribe(programari => {
      this.doctorService.getAllDoctors().subscribe(doctors => {
        this.appointmentDoctors = programari.map(appointment => {
          const doctor = doctors.find(d => d.id === appointment.doctor.id);
          return {
            doctorName: doctor ? doctor.nume : 'Unknown Doctor',
            appointmentDay: appointment.ziLucru,
            appointmentHour: appointment.oraProgramare
          };
        });
      });
    });
  }

  onDoctorSelect(): void {
    if (this.selectedDoctorId) {
      this.doctorService.getDoctorById(this.selectedDoctorId).subscribe(selectedDoctor => {
        if (selectedDoctor) {
          this.selectedDay = selectedDoctor.zi_lucru;  // Automatically set the available day
          this.loadAvailableHours(selectedDoctor);
        }
      });
    }
  }

  loadAvailableHours(doctor: Doctor): void {
    // Check if the doctor.id is defined before proceeding
    if (doctor.id !== undefined) {
      this.programariService.getProgramariByDoctorId(doctor.id).subscribe(programari => {
        const bookedHours = programari.map(p => p.oraProgramare);
        
        // Generate available hours between doctor’s working hours
        this.availableHours = [];
        for (let hour = doctor.ora_start; hour <= doctor.ora_finish; hour++) {
          if (!bookedHours.includes(hour)) {
            this.availableHours.push(hour);
          }
        }
      });
    } else {
      console.warn('Selected doctor has no ID defined');
    }
  }

  bookAppointment(): void {
    // Ensure userData and selectedDoctorId are defined before booking
    if (this.userData && this.userData.id !== undefined && this.selectedDoctorId && this.selectedHour !== null) {
      // Remove ":00" if it's being passed as a string and convert it to an integer if necessary
      const oraProgramare = typeof this.selectedHour === 'string' ? parseInt(this.selectedHour, 10) : this.selectedHour;
  
      this.programariService.createProgramare(this.userData.id, this.selectedDoctorId, oraProgramare).subscribe(
        () => {
          if (typeof this.userData?.id === 'number') { // Ensure userData.id is a number
            this.loadAppointmentDoctors(this.userData.id);  // userData is confirmed to be non-null here
          }
          this.onDoctorSelect();  // Refresh available hours after booking
        },
        error => console.error('Error booking appointment:', error)
      );
    } else {
      console.warn('Please select a doctor, day, and hour');
    }
  }
}