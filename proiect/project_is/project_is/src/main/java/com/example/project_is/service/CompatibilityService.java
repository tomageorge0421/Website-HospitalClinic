package com.example.project_is.service;

import com.example.project_is.entity.Compatibility;
import com.example.project_is.entity.Doctor;
import com.example.project_is.entity.User;
import com.example.project_is.repository.CompatibilityRepository;
import com.example.project_is.repository.DoctorRepository;
import com.example.project_is.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompatibilityService {
    @Autowired
    private CompatibilityRepository compatibilityRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Compatibility> getAllCompatibilities() {
        return compatibilityRepository.findAll();
    }

    public List<Compatibility> getCompatibilitiesByUserId(Long userId) {
        return compatibilityRepository.findByUserId(userId);
    }

    public List<Compatibility> getCompatibilitiesByDoctorId(Long doctorId) {
        return compatibilityRepository.findByDoctorId(doctorId);
    }

    public Compatibility getCompatibilityById(Long id) {
        return compatibilityRepository.findById(id).orElse(null);
    }

    public Compatibility createCompatibility(Long userId, Long doctorId) {
        User user = userRepository.findById(userId).orElse(null);
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (user == null || doctor == null) {
            return null; // return null if either user or doctor is not found
        }

        // Ensure the doctor's specialization matches the user's illness type
        if (!user.getTip_boala().equalsIgnoreCase(doctor.getSpecializare())) {
            return null; // Incompatible
        }

        Compatibility compatibility = new Compatibility();
        compatibility.setUser(user);
        compatibility.setDoctor(doctor);
        return compatibilityRepository.save(compatibility);
    }

    public List<Compatibility> autoCreateCompatibilities() {
        List<User> users = userRepository.findAll();
        List<Doctor> doctors = doctorRepository.findAll();

        for (User user : users) {
            for (Doctor doctor : doctors) {
                // Check compatibility based on specialization and illness type
                if (user.getTip_boala().equalsIgnoreCase(doctor.getSpecializare())) {
                    // Check if compatibility already exists to avoid duplicates
                    if (!compatibilityExists(user, doctor)) {
                        Compatibility compatibility = new Compatibility();
                        compatibility.setUser(user);
                        compatibility.setDoctor(doctor);
                        compatibilityRepository.save(compatibility);
                    }
                }
            }
        }
        return compatibilityRepository.findAll();
    }

    // Helper method to check if compatibility already exists
    private boolean compatibilityExists(User user, Doctor doctor) {
        return compatibilityRepository.findByUserId(user.getId()).stream()
                .anyMatch(c -> c.getDoctor().getId().equals(doctor.getId()));
    }

    public void deleteCompatibility(Long id) {
        compatibilityRepository.deleteById(id);
    }
}
