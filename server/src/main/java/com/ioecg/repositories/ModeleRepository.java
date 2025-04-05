package com.ioecg.repositories;

import com.ioecg.entities.Modele;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ModeleRepository extends JpaRepository<Modele, Long> {
    @Query("SELECT m FROM Modele m JOIN ProjetModele pm ON m.id = pm.id.id_modele WHERE pm.id.id_projet = :projetId")
    List<Modele> findByProjetId(@Param("projetId") Long projetId);
}
