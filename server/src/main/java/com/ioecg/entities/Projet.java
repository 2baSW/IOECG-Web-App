package com.ioecg.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "projet")
public class Projet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    @Column(name = "type_projet", nullable = false)
    private String typeProjet; // "Analyse" ou "Expérience"

    // Le créateur du projet
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_createur", nullable = false)
    @JsonBackReference          
    private Utilisateur createur;

    // Un projet peut avoir plusieurs expériences
    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Experience> experiences;

    // Association ManyToMany avec Dataset via la table "projet_dataset"
    @ManyToMany
    @JoinTable(name = "projet_dataset",
            joinColumns = @JoinColumn(name = "id_projet"),
            inverseJoinColumns = @JoinColumn(name = "id_dataset"))
    private List<Dataset> datasets;

    // Association ManyToMany avec Modele via la table "projet_modele"
    @ManyToMany
    @JoinTable(name = "projet_modele",
            joinColumns = @JoinColumn(name = "id_projet"),
            inverseJoinColumns = @JoinColumn(name = "id_modele"))
    private List<Modele> modeles;

    // Les collaborateurs du projet (association avec attribut "admin")
    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProjetCollaborateur> collaborateurs;

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
    public List<Experience> getExperiences() {
        return experiences;
    }
    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }
    public List<Dataset> getDatasets() {
        return datasets;
    }
    public void setDatasets(List<Dataset> datasets) {
        this.datasets = datasets;
    }
    public List<Modele> getModeles() {
        return modeles;
    }
    public void setModeles(List<Modele> modeles) {
        this.modeles = modeles;
    }
    public List<ProjetCollaborateur> getCollaborateurs() {
        return collaborateurs;
    }
    public void setCollaborateurs(List<ProjetCollaborateur> collaborateurs) {
        this.collaborateurs = collaborateurs;
    }
}
