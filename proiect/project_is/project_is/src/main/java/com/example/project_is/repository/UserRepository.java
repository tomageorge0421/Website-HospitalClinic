package com.example.project_is.repository;

import com.example.project_is.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email); // New method to check email existence

    Optional<User> findByEmail(String email); // Find user by email
}
