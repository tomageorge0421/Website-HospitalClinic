import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { UserService, User } from '../service/user.service';
import { DoctorService, Doctor } from '../service/doctor.service';
import { CompatibilityService, Compatibility } from '../service/compatibility.service';
import { ProgramariService, Programari } from '../service/programari.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
   // Users
   users: User[] = [];
   selectedUser: User | null = null;
   newUser: User = { email: '', nume: '', tip_boala: '', varsta: 0, password: '' };
   userToUpdate: User = { email: '', nume: '', tip_boala: '', varsta: 0, password: '' };
 
   // Doctors
   doctors: Doctor[] = [];
   selectedDoctor: Doctor | null = null;
   newDoctor: Doctor = {
     email: '',
     nume: '',
     specializare: '',
     zi_lucru: '',
     ora_start: 0,
     ora_finish: 0,
   };
   doctorToUpdate: Doctor = {
     email: '',
     nume: '',
     specializare: '',
     zi_lucru: '',
     ora_start: 0,
     ora_finish: 0,
   };
   
   compatibilities: Compatibility[] = [];

   programari: Programari[] = [];
   newProgramare = {
    clientId: null,
    doctorId: null,
    oraProgramare: null
  };

   errorMessage: string = '';
 
   constructor(private userService: UserService, private doctorService: DoctorService, 
    private compatibilityService: CompatibilityService, private programariService: ProgramariService) {}
 
   ngOnInit(): void {
     this.loadUsers();
     this.loadDoctors();
     this.loadCompatibilities();
     this.loadAllProgramari();
   }
 
   // User Methods
   loadUsers(): void {
     this.userService.getAllUsers().subscribe(
       (users) => {
         this.users = users;
       },
       (error) => {
         this.errorMessage = 'Failed to load users. Please try again later.';
       }
     );
   }
 
   getUserById(id: number): void {
     this.userService.getUserById(id).subscribe(
       (user) => {
         this.selectedUser = user; // Set the selected user
         this.userToUpdate = { ...user }; // Pre-fill the update form
       },
       (error) => {
         this.errorMessage = 'User not found!';
       }
     );
   }
 
   addUser(): void {
     if (this.isFormInvalid(this.newUser)) {
       this.errorMessage = 'All fields are required to add a new user.';
       return;
     }
     this.userService.createUser(this.newUser).subscribe(
       (user) => {
         this.users.push(user);
         this.resetNewUser();
         this.errorMessage = ''; // Clear error message on success
       },
       (error) => {
         this.errorMessage = 'Failed to add user. Please check the details.';
       }
     );
   }
 
   updateUser(id: number): void {
     if (this.isFormInvalid(this.userToUpdate)) {
       this.errorMessage = 'All fields are required to update the user.';
       return;
     }
     this.userService.updateUser(id, this.userToUpdate).subscribe(
       (updatedUser) => {
         const index = this.users.findIndex((user) => user.id === id);
         if (index !== -1) {
           this.users[index] = updatedUser;
         }
         this.resetUpdateForm();
         this.errorMessage = ''; // Clear error message on success
       },
       (error) => {
         this.errorMessage = 'Failed to update user. Please check the details.';
       }
     );
   }
 
   deleteUser(id: number): void {
     this.userService.deleteUser(id).subscribe(
       () => {
         this.users = this.users.filter((user) => user.id !== id);
       },
       (error) => {
         this.errorMessage = 'Failed to delete user. Please try again later.';
       }
     );
   }
 
   resetNewUser(): void {
     this.newUser = { email: '', nume: '', tip_boala: '', varsta: 0, password: '' };
   }
 
   resetUpdateForm(): void {
     this.userToUpdate = { email: '', nume: '', tip_boala: '', varsta: 0, password: '' };
     this.selectedUser = null; // Hide the user edit form
   }
 
   isFormInvalid(user: User): boolean {
     return (
       !user.email.trim() ||
       !user.nume.trim() ||
       !user.tip_boala.trim() ||
       user.varsta <= 0 ||
       !user.password.trim()
     );
   }
 
   // Doctor Methods
   loadDoctors(): void {
     this.doctorService.getAllDoctors().subscribe(
       (doctors) => {
         this.doctors = doctors;
       },
       (error) => {
         this.errorMessage = 'Failed to load doctors. Please try again later.';
       }
     );
   }
 
   getDoctorById(id: number): void {
     this.doctorService.getDoctorById(id).subscribe(
       (doctor) => {
         this.selectedDoctor = doctor; // Set the selected doctor
         this.doctorToUpdate = { ...doctor }; // Pre-fill the update form
       },
       (error) => {
         this.errorMessage = 'Doctor not found!';
       }
     );
   }
 
   addDoctor(): void {
     if (this.isDoctorFormInvalid(this.newDoctor)) {
       this.errorMessage = 'All fields are required to add a new doctor.';
       return;
     }
     this.doctorService.createDoctor(this.newDoctor).subscribe(
       (doctor) => {
         this.doctors.push(doctor);
         this.resetNewDoctor();
         this.errorMessage = ''; // Clear error message on success
       },
       (error) => {
         this.errorMessage = 'Failed to add doctor. Please check the details.';
       }
     );
   }
 
   updateDoctor(id: number): void {
     if (this.isDoctorFormInvalid(this.doctorToUpdate)) {
       this.errorMessage = 'All fields are required to update the doctor.';
       return;
     }
     this.doctorService.updateDoctor(id, this.doctorToUpdate).subscribe(
       (updatedDoctor) => {
         const index = this.doctors.findIndex((doctor) => doctor.id === id);
         if (index !== -1) {
           this.doctors[index] = updatedDoctor;
         }
         this.resetDoctorUpdateForm();
         this.errorMessage = ''; // Clear error message on success
       },
       (error) => {
         this.errorMessage = 'Failed to update doctor. Please check the details.';
       }
     );
   }
 
   deleteDoctor(id: number): void {
     this.doctorService.deleteDoctor(id).subscribe(
       () => {
         this.doctors = this.doctors.filter((doctor) => doctor.id !== id);
       },
       (error) => {
         this.errorMessage = 'Failed to delete doctor. Please try again later.';
       }
     );
   }
 
   resetNewDoctor(): void {
     this.newDoctor = {
       email: '',
       nume: '',
       specializare: '',
       zi_lucru: '',
       ora_start: 0,
       ora_finish: 0,
     };
   }
 
   resetDoctorUpdateForm(): void {
     this.doctorToUpdate = {
       email: '',
       nume: '',
       specializare: '',
       zi_lucru: '',
       ora_start: 0,
       ora_finish: 0,
     };
     this.selectedDoctor = null; // Hide the doctor edit form
   }
 
   isDoctorFormInvalid(doctor: Doctor): boolean {
     return (
       !doctor.email.trim() ||
       !doctor.nume.trim() ||
       !doctor.specializare.trim() ||
       !doctor.zi_lucru.trim() ||
       doctor.ora_start < 0 ||
       doctor.ora_finish <= 0
     );
   }
   loadCompatibilities(): void {
    this.compatibilityService.getAllCompatibilities().subscribe(
      (compatibilities) => {
        this.compatibilities = compatibilities;
      },
      (error) => {
        this.errorMessage = 'Failed to load compatibilities. Please try again later.';
      }
    );
  }

  deleteCompatibility(id: number): void {
    this.compatibilityService.deleteCompatibility(id).subscribe(
      () => {
        this.compatibilities = this.compatibilities.filter((comp) => comp.id !== id);
      },
      (error) => {
        this.errorMessage = 'Failed to delete compatibility. Please try again later.';
      }
    );
  }

  autoCreateCompatibilities(): void {
    this.compatibilityService.autoCreateCompatibilities().subscribe(
      (newCompatibilities) => {
        this.compatibilities = newCompatibilities; // Refresh the table
      },
      (error) => {
        this.errorMessage = 'Failed to auto-create compatibilities. Please try again later.';
      }
    );
  }
  loadAllProgramari(): void {
    this.programariService.getAllProgramari().subscribe(
      (data) => {
        this.programari = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load appointments.';
        console.error(error);
      }
    );
  }
  addProgramare(): void {
    const { clientId, doctorId, oraProgramare } = this.newProgramare;

    if (clientId && doctorId && oraProgramare) {
      this.programariService.createProgramare(clientId, doctorId, oraProgramare).subscribe(
        (data) => {
          this.errorMessage = "";
          this.loadAllProgramari();
        },
        (error) => {
          this.errorMessage = 'Failed to create appointment.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'All fields are required to create an appointment.';
    }
  }

  // Delete an appointment
  deleteProgramare(id: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.programariService.deleteProgramare(id).subscribe(
        () => {
          this.errorMessage = "";
          this.loadAllProgramari();
        },
        (error) => {
          this.errorMessage = 'Failed to delete appointment.';
          console.error(error);
        }
      );
    }
  }
}
