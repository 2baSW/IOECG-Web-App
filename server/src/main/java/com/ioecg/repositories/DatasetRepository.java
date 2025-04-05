package com.ioecg.repositories;

import com.ioecg.entities.Dataset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DatasetRepository extends JpaRepository<Dataset, Long> {
    @Query("SELECT d FROM Dataset d JOIN ProjetDataset pd ON d.id = pd.id.id_dataset WHERE pd.id.id_projet = :projetId")
    List<Dataset> findByProjetId(@Param("projetId") Long projetId);
}
