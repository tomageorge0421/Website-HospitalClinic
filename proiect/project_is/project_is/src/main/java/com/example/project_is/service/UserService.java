package com.example.project_is.service;

import com.example.project_is.entity.User;
import com.example.project_is.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return null; // Email already in use
        }
        return userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            if (updatedUser.getEmail() != null) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getNume() != null) {
                existingUser.setNume(updatedUser.getNume());
            }
            if (updatedUser.getVarsta() != 0) {
                existingUser.setVarsta(updatedUser.getVarsta());
            }
            if (updatedUser.getTip_boala() != null) {
                existingUser.setTip_boala(updatedUser.getTip_boala());
            }
            if (updatedUser.getPassword() != null) {
                existingUser.setPassword(updatedUser.getPassword()); // Update password if provided
            }
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }

    // New method to verify email and password
    public User findByEmailAndPassword(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            return userOptional.get();
        }
        return null; // Return null if no match
    }
}
