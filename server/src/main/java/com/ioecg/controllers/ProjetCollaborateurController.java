package com.ioecg.controllers;

import com.ioecg.entities.ProjetCollaborateur;
import com.ioecg.entities.ProjetCollaborateurId;
import com.ioecg.dto.AdminUpdateRequest;
import com.ioecg.repositories.ProjetCollaborateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PatchMapping("/admin")
    public ResponseEntity<?> updateAdmin(@RequestBody AdminUpdateRequest request) {
        ProjetCollaborateurId id = new ProjetCollaborateurId(request.getProjetId(), request.getUtilisateurId());
        ProjetCollaborateur pc = projetCollaborateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Association projet-collaborateur introuvable"));
        pc.setAdmin(request.isAdmin());
        projetCollaborateurRepository.save(pc);
        return ResponseEntity.ok().build();
    }


    public class AdminUpdateRequest {
        private Long projetId;
        private Long utilisateurId;
        private boolean admin;
    
        public Long getProjetId() {
            return projetId;
        }
        public void setProjetId(Long projetId) {
            this.projetId = projetId;
        }
        public Long getUtilisateurId() {
            return utilisateurId;
        }
        public void setUtilisateurId(Long utilisateurId) {
            this.utilisateurId = utilisateurId;
        }
        public boolean isAdmin() {
            return admin;
        }
        public void setAdmin(boolean admin) {
            this.admin = admin;
        }
    }
    
}
