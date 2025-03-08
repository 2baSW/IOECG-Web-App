package com.ioecg.repositories;

import com.ioecg.entities.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    // Méthodes de recherche par projet, par statut, etc.
}
