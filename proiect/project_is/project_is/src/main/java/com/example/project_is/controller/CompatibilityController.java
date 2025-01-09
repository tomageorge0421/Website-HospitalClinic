package com.example.project_is.controller;

import com.example.project_is.entity.Compatibility;
import com.example.project_is.entity.Doctor;
import com.example.project_is.service.CompatibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/compatibilities")
public class CompatibilityController {
    @Autowired
    private CompatibilityService compatibilityService;

    // Get all compatibilities
    @GetMapping("/all")
    public List<Compatibility> getAllCompatibilities() {
        return compatibilityService.getAllCompatibilities();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Compatibility> getCompatibilityById(@PathVariable Long id) {
        Compatibility compatibility = compatibilityService.getCompatibilityById(id);
        if (compatibility == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(compatibility);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Compatibility>> getCompatibilitiesByUserId(@PathVariable Long userId) {
        List<Compatibility> compatibilities = compatibilityService.getCompatibilitiesByUserId(userId);
        if (compatibilities.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(compatibilities);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Compatibility>> getCompatibilitiesByDoctorId(@PathVariable Long doctorId) {
        List<Compatibility> compatibilities = compatibilityService.getCompatibilitiesByDoctorId(doctorId);
        if (compatibilities.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(compatibilities);
    }

    @PostMapping("/add")
    public ResponseEntity<Compatibility> createCompatibility(@RequestParam Long userId, @RequestParam Long doctorId) {
        Compatibility compatibility = compatibilityService.createCompatibility(userId, doctorId);
        if (compatibility == null) {
            return ResponseEntity.badRequest().build(); // Return 400 if the compatibility is invalid
        }
        return ResponseEntity.ok(compatibility);
    }

    @PostMapping("/auto-create")
    public ResponseEntity<List<Compatibility>> autoCreateCompatibilities() {
        List<Compatibility> compatibilities = compatibilityService.autoCreateCompatibilities();
        return ResponseEntity.ok(compatibilities);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCompatibility(@PathVariable Long id) {
        Compatibility compatibility = compatibilityService.getCompatibilityById(id);
        if(compatibility==null){
            return ResponseEntity.notFound().build();
        }
        compatibilityService.deleteCompatibility(id);
        return ResponseEntity.noContent().build();
    }
}
