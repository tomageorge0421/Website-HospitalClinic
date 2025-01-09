package com.example.project_is.repository;

import com.example.project_is.entity.Compatibility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompatibilityRepository extends JpaRepository<Compatibility, Long> {
    List<Compatibility> findByUserId(Long userId);
    List<Compatibility> findByDoctorId(Long doctorId);
}
