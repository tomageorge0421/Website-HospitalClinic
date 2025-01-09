package com.example.project_is.service;

import com.example.project_is.entity.Doctor;
import com.example.project_is.entity.User;
import com.example.project_is.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctorById(Long id) {
        doctorRepository.deleteById(id);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Optional<Doctor> existingDoctorOptional = doctorRepository.findById(id);
        if (existingDoctorOptional.isPresent()) {
            Doctor existingDoctor = existingDoctorOptional.get();
            if (updatedDoctor.getEmail() != null) {
                existingDoctor.setEmail(updatedDoctor.getEmail());
            }
            if (updatedDoctor.getNume() != null) {
                existingDoctor.setNume(updatedDoctor.getNume());
            }
            if (updatedDoctor.getSpecializare() != null) {
                existingDoctor.setSpecializare(updatedDoctor.getSpecializare());
            }
            if (updatedDoctor.getZi_lucru() != null) {
                existingDoctor.setZi_lucru(updatedDoctor.getZi_lucru());
            }
            if (updatedDoctor.getOra_start() != 0) {
                existingDoctor.setOra_start(updatedDoctor.getOra_start());
            }
            if (updatedDoctor.getOra_finish() != 0) {
                existingDoctor.setOra_finish(updatedDoctor.getOra_finish());
            }
            return doctorRepository.save(existingDoctor);
        } else {
            return null;
        }
    }
}
