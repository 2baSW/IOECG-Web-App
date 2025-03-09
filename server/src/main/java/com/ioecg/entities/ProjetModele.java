package com.ioecg.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "projet_modele")
public class ProjetModele {

    @EmbeddedId
    private ProjetModeleId id;

    public ProjetModele() {}
    public ProjetModele(ProjetModeleId id) {
        this.id = id;
    }
    public ProjetModele(Long id_projet, Long id_modele) {
        this.id = new ProjetModeleId(id_projet, id_modele);
    }

    public ProjetModeleId getId() {
        return id;
    }
    public void setId(ProjetModeleId id) {
        this.id = id;
    }
}
