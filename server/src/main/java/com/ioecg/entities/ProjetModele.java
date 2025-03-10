package com.ioecg.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "projet_modele")
public class ProjetModele {

    @EmbeddedId
    private ProjetModeleId id;

    public ProjetModele() {
    }

    public ProjetModele(ProjetModeleId id) {
        this.id = id;
    }

    // Getters et setters
    public ProjetModeleId getId() {
        return id;
    }
    public void setId(ProjetModeleId id) {
        this.id = id;
    }
}
