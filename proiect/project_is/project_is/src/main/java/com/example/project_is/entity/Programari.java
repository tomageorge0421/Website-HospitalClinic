package com.example.project_is.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "programari")

@Setter
@Getter
public class Programari {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "zi_lucru", nullable = false)
    private String ziLucru;

    @Column(name = "ora_programare", nullable = false)
    private Integer oraProgramare;
}
