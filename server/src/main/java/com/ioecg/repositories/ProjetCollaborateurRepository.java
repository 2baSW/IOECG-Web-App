package com.ioecg.repositories;

import com.ioecg.entities.ProjetCollaborateur;
import com.ioecg.entities.ProjetCollaborateurId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjetCollaborateurRepository extends JpaRepository<ProjetCollaborateur, ProjetCollaborateurId> {
    List<ProjetCollaborateur> findByProjetId(Long projetId);
}
