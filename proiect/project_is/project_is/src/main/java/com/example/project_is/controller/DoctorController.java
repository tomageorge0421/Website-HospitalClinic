package com.example.project_is.controller;

import com.example.project_is.entity.Doctor;
import com.example.project_is.entity.User;
import com.example.project_is.service.DoctorService;
import com.example.project_is.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/doctors")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        if (doctor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(doctor);
    }

    @PostMapping("/add")
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.createDoctor(doctor);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        if (doctor == null) {
            return ResponseEntity.notFound().build();
        }
        doctorService.deleteDoctorById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor updatedDoctor){
        Doctor doctor = doctorService.updateDoctor(id,updatedDoctor);
        if(doctor == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(doctor);
    }
}
