package com.ioecg.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "projet")
public class Projet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime dateCreation;

    private String typeProjet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_createur")
    private Utilisateur createur;

    // Getters et setters
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
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDateTime getDateCreation() {
        return dateCreation;
    }
    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
    public String getTypeProjet() {
        return typeProjet;
    }
    public void setTypeProjet(String typeProjet) {
        this.typeProjet = typeProjet;
    }
    public Utilisateur getCreateur() {
        return createur;
    }
    public void setCreateur(Utilisateur createur) {
        this.createur = createur;
    }
}
