package com.ioecg.repositories;

import com.ioecg.entities.ProjetModele;
import com.ioecg.entities.ProjetModeleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetModeleRepository extends JpaRepository<ProjetModele, ProjetModeleId> {
}
