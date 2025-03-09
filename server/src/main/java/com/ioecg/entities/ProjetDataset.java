package com.ioecg.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "projet_dataset")
public class ProjetDataset {

    @EmbeddedId
    private ProjetDatasetId id;

    public ProjetDataset() {}
    public ProjetDataset(ProjetDatasetId id) {
        this.id = id;
    }
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
