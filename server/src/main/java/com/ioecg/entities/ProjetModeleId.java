package com.ioecg.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProjetModeleId implements Serializable {
    private Long id_projet;
    private Long id_modele;

    public ProjetModeleId() {
    }

    public ProjetModeleId(Long id_projet, Long id_modele) {
        this.id_projet = id_projet;
        this.id_modele = id_modele;
    }

    // Getters, setters, equals et hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProjetModeleId)) return false;
        ProjetModeleId that = (ProjetModeleId) o;
        return Objects.equals(id_projet, that.id_projet) &&
               Objects.equals(id_modele, that.id_modele);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_projet, id_modele);
    }
}
