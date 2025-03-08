package com.ioecg.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "projet_collaborateur")
public class ProjetCollaborateur {

    @EmbeddedId
    private ProjetCollaborateurId id;

    @Column(nullable = false)
    private boolean admin;

    // Ajout de la relation ManyToOne vers Projet pour le mapping inverse
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("id_projet")  // Indique que ce champ correspond à la partie id_projet de la clé composite
    @JoinColumn(name = "id_projet", insertable = false, updatable = false)
    private Projet projet;

    // Optionnel : si vous voulez également une référence vers l'utilisateur
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("id_utilisateur")
    @JoinColumn(name = "id_utilisateur", insertable = false, updatable = false)
    private Utilisateur utilisateur;

    // Constructeur par défaut pour JPA
    public ProjetCollaborateur() {
        this.id = new ProjetCollaborateurId();
    }

    // Constructeur avec clé composite et admin
    public ProjetCollaborateur(ProjetCollaborateurId id, boolean admin) {
        this.id = id;
        this.admin = admin;
    }

    // Constructeur avec id_projet, id_utilisateur et admin
    public ProjetCollaborateur(Long id_projet, Long id_utilisateur, boolean admin) {
        this.id = new ProjetCollaborateurId(id_projet, id_utilisateur);
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

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}
