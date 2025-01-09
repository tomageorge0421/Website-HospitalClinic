package com.example.project_is.repository;

import com.example.project_is.entity.Programari;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProgramariRepository extends JpaRepository<Programari, Long> {
    List<Programari> findByDoctorId(Long doctorId);

    List<Programari> findByClientId(Long clientId);

    // Check for an existing appointment at the specified day and hour
    Optional<Programari> findByDoctorIdAndZiLucruAndOraProgramare(Long doctorId, String ziLucru, Integer oraProgramare);
}
