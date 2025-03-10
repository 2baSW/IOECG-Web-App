package com.ioecg.controllers;

import com.ioecg.dto.ProjectDTO;
import com.ioecg.dto.CollaboratorDTO;
import com.ioecg.entities.*;
import com.ioecg.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjetController {

    @Autowired
    private ProjetRepository projetRepository;
    
    @Autowired
    private ProjetDatasetRepository projetDatasetRepository;
    
    @Autowired
    private ProjetModeleRepository projetModeleRepository;
    
    @Autowired
    private ProjetCollaborateurRepository projetCollaborateurRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping
    public List<Projet> getAllProjects() {
        return projetRepository.findAll();
    }

    @PostMapping("/full")
    public Projet createProjectFull(@RequestBody ProjectDTO projectDTO) {
        // 1) Création du projet
        Projet projet = new Projet();
        projet.setNom(projectDTO.getNom());
        projet.setDescription(projectDTO.getDescription());
        projet.setTypeProjet(projectDTO.getTypeProjet());
        projet.setDateCreation(LocalDateTime.now());

        // Récupération du créateur via son ID
        if (projectDTO.getId_createur() != null) {
            Utilisateur createur = utilisateurRepository.findById(projectDTO.getId_createur())
                    .orElseThrow(() -> new RuntimeException("Utilisateur introuvable pour id_createur=" + projectDTO.getId_createur()));
            projet.setCreateur(createur);
        }

        Projet savedProject = projetRepository.save(projet);

        // 2) Association des datasets
        if (projectDTO.getDatasets() != null) {
            projectDTO.getDatasets().forEach(datasetId -> {
                ProjetDatasetId pdId = new ProjetDatasetId(savedProject.getId(), datasetId);
                ProjetDataset pd = new ProjetDataset(pdId);
                projetDatasetRepository.save(pd);
            });
        }

        // 3) Association des modèles
        if (projectDTO.getModels() != null) {
            projectDTO.getModels().forEach(modelId -> {
                ProjetModeleId pmId = new ProjetModeleId(savedProject.getId(), modelId);
                ProjetModele pm = new ProjetModele(pmId);
                projetModeleRepository.save(pm);
            });
        }

        // 4) Association des collaborateurs
        if (projectDTO.getCollaborators() != null) {
            for (CollaboratorDTO collab : projectDTO.getCollaborators()) {
                Long collaboratorId = collab.getId();
                // Vérifier que le collaborateur existe
                Utilisateur collabUser = utilisateurRepository.findById(collaboratorId)
                        .orElseThrow(() -> new RuntimeException("Collaborateur introuvable : ID=" + collaboratorId));

                ProjetCollaborateurId pcId = new ProjetCollaborateurId(savedProject.getId(), collaboratorId);
                ProjetCollaborateur pc = new ProjetCollaborateur(pcId, collab.isAdmin());
                // Renseigner les entités associées pour MapsId
                pc.setProjet(savedProject);
                pc.setUtilisateur(collabUser);

                projetCollaborateurRepository.save(pc);
            }
        }
        return savedProject;
    }

    @GetMapping("/{id}")
    public Projet getProjectById(@PathVariable Long id) {
        return projetRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Projet updateProject(@PathVariable Long id, @RequestBody Projet projetData) {
        return projetRepository.findById(id).map(existing -> {
            existing.setNom(projetData.getNom());
            existing.setDescription(projetData.getDescription());
            existing.setTypeProjet(projetData.getTypeProjet());
            return projetRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projetRepository.deleteById(id);
    }
}
