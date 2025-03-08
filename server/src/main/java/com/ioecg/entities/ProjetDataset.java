package com.ioecg.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "projet_dataset")
public class ProjetDataset {

    @EmbeddedId
    private ProjetDatasetId id;

    // Constructeur par défaut pour JPA
    public ProjetDataset() {}

    // Constructeur avec clé composite
    public ProjetDataset(ProjetDatasetId id) {
        this.id = id;
    }

    // Optionnel : constructeur avec deux Longs
    public ProjetDataset(Long id_projet, Long id_dataset) {
        this.id = new ProjetDatasetId(id_projet, id_dataset);
    }

    public ProjetDatasetId getId() {
        return id;
    }

    public void setId(ProjetDatasetId id) {
        this.id = id;
    }
}
