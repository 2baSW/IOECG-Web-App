package com.ioecg.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "projet_dataset")
public class ProjetDataset {

    @EmbeddedId
    private ProjetDatasetId id;

    public ProjetDataset() {
    }

    public ProjetDataset(ProjetDatasetId id) {
        this.id = id;
    }

    // Getters et setters
    public ProjetDatasetId getId() {
        return id;
    }
    public void setId(ProjetDatasetId id) {
        this.id = id;
    }
}
