package com.ioecg.dto;

import java.util.List;

public class ProjectDTO {
    private String nom;
    private String description;
    private String typeProjet;
    private Long id_createur; // ID du créateur
    private List<Long> datasets; // IDs des datasets sélectionnés
    private List<Long> models;   // IDs des modèles sélectionnés (un seul pour "Expérience" ou plusieurs pour "Analyse")
    private List<CollaboratorDTO> collaborators; // Liste des collaborateurs

    // Getters & Setters
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
    public String getTypeProjet() {
        return typeProjet;
    }
    public void setTypeProjet(String typeProjet) {
        this.typeProjet = typeProjet;
    }
    public Long getId_createur() {
        return id_createur;
    }
    public void setId_createur(Long id_createur) {
        this.id_createur = id_createur;
    }
    public List<Long> getDatasets() {
        return datasets;
    }
    public void setDatasets(List<Long> datasets) {
        this.datasets = datasets;
    }
    public List<Long> getModels() {
        return models;
    }
    public void setModels(List<Long> models) {
        this.models = models;
    }
    public List<CollaboratorDTO> getCollaborators() {
        return collaborators;
    }
    public void setCollaborators(List<CollaboratorDTO> collaborators) {
        this.collaborators = collaborators;
    }
}