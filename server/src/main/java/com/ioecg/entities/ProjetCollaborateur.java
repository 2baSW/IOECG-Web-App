package com.ioecg.entities;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "projet_collaborateur")
public class ProjetCollaborateur {

    @EmbeddedId
    private ProjetCollaborateurId id;

    private boolean admin;

    // Référence vers le projet – on l’ignore lors de la sérialisation pour éviter la boucle
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_projet", insertable = false, updatable = false)
    @JsonBackReference
    private Projet projet;

    // Référence vers l’utilisateur collaborateur (sérialisation possible si nécessaire)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_utilisateur", insertable = false, updatable = false)
    private Utilisateur collaborateur;

    // Constructeurs
    public ProjetCollaborateur() {}

    public ProjetCollaborateur(ProjetCollaborateurId id, boolean admin) {
        this.id = id;
        this.admin = admin;
    }

    // Getters & Setters

    public ProjetCollaborateurId getId() {
        return id;
    }
    public void setId(ProjetCollaborateurId id) {
        this.id = id;
    }
    public boolean isAdmin() {
        return admin;
    }
    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
    public Projet getProjet() {
        return projet;
    }
    public void setProjet(Projet projet) {
        this.projet = projet;
    }
    public Utilisateur getCollaborateur() {
        return collaborateur;
    }
    public void setCollaborateur(Utilisateur collaborateur) {
        this.collaborateur = collaborateur;
    }
}
