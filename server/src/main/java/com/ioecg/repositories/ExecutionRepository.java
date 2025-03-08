package com.ioecg.repositories;

import com.ioecg.entities.Execution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionRepository extends JpaRepository<Execution, Long> {
    // Vous pouvez ajouter des méthodes pour rechercher par statut ou par expérience
}
