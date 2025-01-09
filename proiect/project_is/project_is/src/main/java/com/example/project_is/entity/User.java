package com.example.project_is.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")

@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nume;

    @Column(nullable = false)
    private int varsta;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String tip_boala;

    @Column(nullable = false)
    private String password; // New password column
}
