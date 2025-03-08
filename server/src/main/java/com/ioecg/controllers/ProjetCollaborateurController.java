package com.ioecg.controllers;

import com.ioecg.entities.ProjetCollaborateur;
import com.ioecg.entities.ProjetCollaborateurId;
import com.ioecg.repositories.ProjetCollaborateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project-collaborators")
@CrossOrigin(origins = "*")
public class ProjetCollaborateurController {

    @Autowired
    private ProjetCollaborateurRepository projetCollaborateurRepository;

    @PostMapping
    public ProjetCollaborateur addCollaborator(@RequestBody ProjetCollaborateur projetCollaborateur) {
        return projetCollaborateurRepository.save(projetCollaborateur);
    }

    @DeleteMapping("/{projetId}/{utilisateurId}")
    public void removeCollaborator(@PathVariable Long projetId, @PathVariable Long utilisateurId) {
        ProjetCollaborateurId id = new ProjetCollaborateurId(projetId, utilisateurId);
        projetCollaborateurRepository.deleteById(id);
    }

    // Vous pouvez ajouter un endpoint pour mettre à jour le rôle (admin) d'un collaborateur
}
