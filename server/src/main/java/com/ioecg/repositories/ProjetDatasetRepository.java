package com.ioecg.repositories;

import com.ioecg.entities.ProjetDataset;
import com.ioecg.entities.ProjetDatasetId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetDatasetRepository extends JpaRepository<ProjetDataset, ProjetDatasetId> {
}
