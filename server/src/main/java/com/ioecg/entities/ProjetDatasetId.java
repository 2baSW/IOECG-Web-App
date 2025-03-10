package com.ioecg.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProjetDatasetId implements Serializable {
    private Long id_projet;
    private Long id_dataset;

    public ProjetDatasetId() {
    }

    public ProjetDatasetId(Long id_projet, Long id_dataset) {
        this.id_projet = id_projet;
        this.id_dataset = id_dataset;
    }

    // Getters, setters, equals et hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProjetDatasetId)) return false;
        ProjetDatasetId that = (ProjetDatasetId) o;
        return Objects.equals(id_projet, that.id_projet) &&
               Objects.equals(id_dataset, that.id_dataset);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_projet, id_dataset);
    }
}
