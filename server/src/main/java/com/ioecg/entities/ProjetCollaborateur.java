package com.ioecg.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "projet_collaborateur")
public class ProjetCollaborateur {

    @EmbeddedId
    private ProjetCollaborateurId id;

    @Column(nullable = false)
    private boolean admin;

    // Association vers le projet (pour MapsId)
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("id_projet")
    @JoinColumn(name = "id_projet", insertable = false, updatable = false)
    private Projet projet;

    // Association vers l'utilisateur (pour MapsId)
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("id_utilisateur")
    @JoinColumn(name = "id_utilisateur", insertable = false, updatable = false)
    private Utilisateur utilisateur;

    public ProjetCollaborateur() {
        this.id = new ProjetCollaborateurId();
    }

    public ProjetCollaborateur(ProjetCollaborateurId id, boolean admin) {
        this.id = id;
        this.admin = admin;
    }

    public ProjetCollaborateur(Long id_projet, Long id_utilisateur, boolean admin) {
        this.id = new ProjetCollaborateurId(id_projet, id_utilisateur);
        this.admin = admin;
    }

    // Getters et Setters
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
    public Utilisateur getUtilisateur() {
        return utilisateur;
    }
    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}
