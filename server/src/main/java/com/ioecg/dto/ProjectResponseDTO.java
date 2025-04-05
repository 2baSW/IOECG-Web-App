package com.ioecg.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ProjectResponseDTO {
    
    private Long id;
    private String nom;
    private String description;
    private LocalDateTime dateCreation;
    private String typeProjet;
    private String createurNom;
    private String createurPrenom;
    // Nouveau champ pour la liste des collaborateurs
    private List<CollaboratorDTO> collaborators;

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
    public String getCreateurNom() {
        return createurNom;
    }
    public void setCreateurNom(String createurNom) {
        this.createurNom = createurNom;
    }
    public String getCreateurPrenom() {
        return createurPrenom;
    }
    public void setCreateurPrenom(String createurPrenom) {
        this.createurPrenom = createurPrenom;
    }
    public List<CollaboratorDTO> getCollaborators() {
        return collaborators;
    }
    public void setCollaborators(List<CollaboratorDTO> collaborators) {
        this.collaborators = collaborators;
    }
}
