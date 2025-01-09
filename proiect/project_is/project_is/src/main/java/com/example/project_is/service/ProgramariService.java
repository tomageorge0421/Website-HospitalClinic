package com.example.project_is.service;

import com.example.project_is.entity.Compatibility;
import com.example.project_is.entity.Doctor;
import com.example.project_is.entity.Programari;
import com.example.project_is.entity.User;
import com.example.project_is.repository.CompatibilityRepository;
import com.example.project_is.repository.DoctorRepository;
import com.example.project_is.repository.ProgramariRepository;
import com.example.project_is.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramariService {
    @Autowired
    private ProgramariRepository programariRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private CompatibilityRepository compatibilityRepository;

    public List<Programari> getAllProgramari() {
        return programariRepository.findAll();
    }

    public List<Programari> getProgramariByDoctorId(Long doctorId) {
        return programariRepository.findByDoctorId(doctorId);
    }

    public List<Programari> getProgramariByClientId(Long clientId) {
        return programariRepository.findByClientId(clientId);
    }

    public Programari getProgramareById(Long id) {
        return programariRepository.findById(id).orElse(null);
    }

    public Programari createProgramare(Long clientId, Long doctorId, Integer oraProgramare) {
        User client = userRepository.findById(clientId).orElse(null);
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        // Check if client and doctor both exist
        if (client == null || doctor == null) {
            return null; // Return null if either client or doctor is not found
        }

        // Get compatible doctors for this client
        List<Compatibility> compatibilities = compatibilityRepository.findByUserId(clientId);
        boolean isCompatible = compatibilities.stream()
                .anyMatch(c -> c.getDoctor().getId().equals(doctorId));

        if (!isCompatible) {
            return null; // Incompatible: the doctor is not compatible with this client
        }

        // Get doctor's working day and validate the appointment time
        String ziLucru = doctor.getZi_lucru();

        // Check if the appointment time is within doctor's working hours
        if (oraProgramare < doctor.getOra_start() || oraProgramare > doctor.getOra_finish()) {
            return null; // Invalid appointment time
        }

        // Check for an existing appointment at the same time for the same doctor and day
        if (programariRepository.findByDoctorIdAndZiLucruAndOraProgramare(doctorId, ziLucru, oraProgramare).isPresent()) {
            return null; // Conflict: an appointment at the same time already exists
        }

        // Create and save the appointment
        Programari programare = new Programari();
        programare.setClient(client);
        programare.setDoctor(doctor);
        programare.setZiLucru(ziLucru);
        programare.setOraProgramare(oraProgramare);
        return programariRepository.save(programare);
    }

    public void deleteProgramare(Long id) {
        programariRepository.deleteById(id);
    }
}