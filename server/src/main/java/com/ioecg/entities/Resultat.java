package com.ioecg.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resultat")
public class Resultat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "jsonb", nullable = false)
    private String donnees; // Résultat d'exécution en JSON

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    // Getters & Setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDonnees() {
        return donnees;
    }
    public void setDonnees(String donnees) {
        this.donnees = donnees;
    }
    public LocalDateTime getDateCreation() {
        return dateCreation;
    }
    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
}
