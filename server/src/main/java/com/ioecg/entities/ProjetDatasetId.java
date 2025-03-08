package com.ioecg.entities;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;

@Embeddable
public class ProjetDatasetId implements Serializable {

    private Long id_projet;
    private Long id_dataset;

    public ProjetDatasetId() {}

    public ProjetDatasetId(Long id_projet, Long id_dataset) {
        this.id_projet = id_projet;
        this.id_dataset = id_dataset;
    }

    public Long getId_projet() {
        return id_projet;
    }

    public void setId_projet(Long id_projet) {
        this.id_projet = id_projet;
    }

    public Long getId_dataset() {
        return id_dataset;
    }

    public void setId_dataset(Long id_dataset) {
        this.id_dataset = id_dataset;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProjetDatasetId)) return false;
        ProjetDatasetId that = (ProjetDatasetId) o;
        return Objects.equals(getId_projet(), that.getId_projet()) &&
               Objects.equals(getId_dataset(), that.getId_dataset());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId_projet(), getId_dataset());
    }
}
