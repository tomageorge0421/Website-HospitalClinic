package com.example.project_is.controller;

import com.example.project_is.entity.Compatibility;
import com.example.project_is.entity.Programari;
import com.example.project_is.service.ProgramariService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/programari")
public class ProgramariController {
    @Autowired
    private ProgramariService programariService;

    // Get all appointments
    @GetMapping("/all")
    public List<Programari> getAllProgramari() {
        return programariService.getAllProgramari();
    }

    // Get appointments by doctor ID
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Programari>> getProgramariByDoctorId(@PathVariable Long doctorId) {
        List<Programari> programari = programariService.getProgramariByDoctorId(doctorId);
        if (programari.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(programari);
    }

    // Get appointments by client ID
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Programari>> getProgramariByClientId(@PathVariable Long clientId) {
        List<Programari> programari = programariService.getProgramariByClientId(clientId);
        if (programari.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(programari);
    }

    @PostMapping("/add")
    public ResponseEntity<Programari> createProgramare(@RequestParam Long clientId,
                                                       @RequestParam Long doctorId,
                                                       @RequestParam Integer oraProgramare) {
        Programari programare = programariService.createProgramare(clientId, doctorId, oraProgramare);
        if (programare == null) {
            return ResponseEntity.badRequest().build(); // Return 400 if the appointment is invalid
        }
        return ResponseEntity.ok(programare);
    }

    // Delete an appointment
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProgramare(@PathVariable Long id) {
        Programari programare = programariService.getProgramareById(id);
        if (programare == null) {
            return ResponseEntity.notFound().build();
        }
        programariService.deleteProgramare(id);
        return ResponseEntity.noContent().build();
    }
}
