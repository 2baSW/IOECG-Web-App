package com.ioecg.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "dataset")
public class Dataset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    // Stockage du contenu du dataset en tant que texte
    @Column(columnDefinition = "TEXT", nullable = false)
    private String fichier;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation = LocalDateTime.now();

    // Getters & Setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getFichier() {
        return fichier;
    }
    public void setFichier(String fichier) {
        this.fichier = fichier;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }
    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
}
