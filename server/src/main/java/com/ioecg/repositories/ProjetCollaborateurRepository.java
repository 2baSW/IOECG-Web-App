package com.ioecg.repositories;

import com.ioecg.entities.ProjetCollaborateur;
import com.ioecg.entities.ProjetCollaborateurId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetCollaborateurRepository extends JpaRepository<ProjetCollaborateur, ProjetCollaborateurId> {
}
