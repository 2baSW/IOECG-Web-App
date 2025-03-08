package com.ioecg.entities;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;

@Embeddable
public class ProjetModeleId implements Serializable {

    private Long id_projet;
    private Long id_modele;

    public ProjetModeleId() {}

    public ProjetModeleId(Long id_projet, Long id_modele) {
        this.id_projet = id_projet;
        this.id_modele = id_modele;
    }

    public Long getId_projet() {
        return id_projet;
    }

    public void setId_projet(Long id_projet) {
        this.id_projet = id_projet;
    }

    public Long getId_modele() {
        return id_modele;
    }

    public void setId_modele(Long id_modele) {
        this.id_modele = id_modele;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProjetModeleId)) return false;
        ProjetModeleId that = (ProjetModeleId) o;
        return Objects.equals(getId_projet(), that.getId_projet()) &&
               Objects.equals(getId_modele(), that.getId_modele());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId_projet(), getId_modele());
    }
}
