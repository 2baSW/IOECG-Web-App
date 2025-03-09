package com.ioecg.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProjetCollaborateurId implements Serializable {

    private Long id_projet;
    private Long id_utilisateur;

    public ProjetCollaborateurId() {}

    public ProjetCollaborateurId(Long id_projet, Long id_utilisateur) {
        this.id_projet = id_projet;
        this.id_utilisateur = id_utilisateur;
    }

    public Long getId_projet() {
        return id_projet;
    }
    public void setId_projet(Long id_projet) {
        this.id_projet = id_projet;
    }
    public Long getId_utilisateur() {
        return id_utilisateur;
    }
    public void setId_utilisateur(Long id_utilisateur) {
        this.id_utilisateur = id_utilisateur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProjetCollaborateurId)) return false;
        ProjetCollaborateurId that = (ProjetCollaborateurId) o;
        return Objects.equals(getId_projet(), that.getId_projet()) &&
               Objects.equals(getId_utilisateur(), that.getId_utilisateur());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId_projet(), getId_utilisateur());
    }
}
