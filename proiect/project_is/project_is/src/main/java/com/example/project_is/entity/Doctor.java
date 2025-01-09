package com.example.project_is.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "doctor")

@Setter
@Getter
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nume;
    

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String specializare;

    @Column(nullable = false)
    private String zi_lucru;

    @Column(nullable = false)
    private int ora_start;

    @Column(nullable = false)
    private int ora_finish;
}
