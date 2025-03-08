package com.ioecg.repositories;

import com.ioecg.entities.Modele;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeleRepository extends JpaRepository<Modele, Long> {
    // Par exemple, méthodes de recherche par nom ou version
}
