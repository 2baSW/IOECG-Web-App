package com.ioecg.controllers;

import com.ioecg.dto.CollaboratorDTO;
import com.ioecg.dto.ProjectDTO;
import com.ioecg.dto.ProjectResponseDTO;
import com.ioecg.entities.*;
import com.ioecg.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<ProjectResponseDTO> getAllProjects() {
        List<Projet> projets = projetRepository.findAll();

        return projets.stream().map(projet -> {
            ProjectResponseDTO dto = new ProjectResponseDTO();
            dto.setId(projet.getId());
            dto.setNom(projet.getNom());
            dto.setDescription(projet.getDescription());
            dto.setDateCreation(projet.getDateCreation());
            dto.setTypeProjet(projet.getTypeProjet());
            if (projet.getCreateur() != null) {
                dto.setCreateurNom(projet.getCreateur().getNom());
                dto.setCreateurPrenom(projet.getCreateur().getPrenom());
            }
            // Récupérer la liste des collaborateurs via le repository
            List<ProjetCollaborateur> collabs = projetCollaborateurRepository.findByProjetId(projet.getId());
            List<CollaboratorDTO> collabDTOs = collabs.stream().map(pc -> {
                CollaboratorDTO cDto = new CollaboratorDTO();
                cDto.setId(pc.getUtilisateur().getId());
                cDto.setAdmin(pc.isAdmin());
                return cDto;
            }).collect(Collectors.toList());
            dto.setCollaborators(collabDTOs);
            return dto;
        }).collect(Collectors.toList());
    }

    /**
     * Création d'un projet complet (datasets, modèles, collaborateurs)
     */
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
                    .orElseThrow(() -> new RuntimeException("Utilisateur introuvable pour id_createur=" 
                                                           + projectDTO.getId_createur()));
            projet.setCreateur(createur);
        }

        Projet savedProject = projetRepository.save(projet);

        // Association des datasets
        if (projectDTO.getDatasets() != null) {
            projectDTO.getDatasets().forEach(datasetId -> {
                ProjetDatasetId pdId = new ProjetDatasetId(savedProject.getId(), datasetId);
                ProjetDataset pd = new ProjetDataset(pdId);
                projetDatasetRepository.save(pd);
            });
        }

        // Association des modèles
        if (projectDTO.getModels() != null) {
            projectDTO.getModels().forEach(modelId -> {
                ProjetModeleId pmId = new ProjetModeleId(savedProject.getId(), modelId);
                ProjetModele pm = new ProjetModele(pmId);
                projetModeleRepository.save(pm);
            });
        }

        // Association des collaborateurs
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

    /**
     * Récupérer un projet par ID
     */
    @GetMapping("/{id}")
    public Projet getProjectById(@PathVariable Long id) {
        return projetRepository.findById(id).orElse(null);
    }

    /**
     * Mettre à jour un projet
     */
    @PutMapping("/{id}")
    public Projet updateProject(@PathVariable Long id, @RequestBody Projet projetData) {
        return projetRepository.findById(id).map(existing -> {
            existing.setNom(projetData.getNom());
            existing.setDescription(projetData.getDescription());
            existing.setTypeProjet(projetData.getTypeProjet());
            return projetRepository.save(existing);
        }).orElse(null);
    }

    /**
     * Supprimer un projet
     */
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projetRepository.deleteById(id);
    }
}
