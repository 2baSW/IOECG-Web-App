package com.ioecg.controllers;

import com.ioecg.dto.CollaboratorDTO;
import com.ioecg.dto.ProjectDTO;
import com.ioecg.dto.ProjectResponseDTO;
import com.ioecg.dto.ModeleDTO;
import com.ioecg.dto.DatasetDTO;
import com.ioecg.entities.Dataset;
import com.ioecg.entities.Modele;
import com.ioecg.entities.Projet;
import com.ioecg.entities.ProjetCollaborateur;
import com.ioecg.entities.ProjetCollaborateurId;
import com.ioecg.entities.ProjetDataset;
import com.ioecg.entities.ProjetDatasetId;
import com.ioecg.entities.ProjetModele;
import com.ioecg.entities.ProjetModeleId;
import com.ioecg.entities.Utilisateur;
import com.ioecg.repositories.DatasetRepository;
import com.ioecg.repositories.ModeleRepository;
import com.ioecg.repositories.ProjetCollaborateurRepository;
import com.ioecg.repositories.ProjetDatasetRepository;
import com.ioecg.repositories.ProjetModeleRepository;
import com.ioecg.repositories.ProjetRepository;
import com.ioecg.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    
    @Autowired
    private DatasetRepository datasetRepository;
    
    @Autowired
    private ModeleRepository modeleRepository;

    // GET /api/projects : renvoie la liste des projets (sans modèles et datasets)
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
            List<ProjetCollaborateur> collabs = projetCollaborateurRepository.findByProjetId(projet.getId());
            List<CollaboratorDTO> collabDTOs = collabs.stream().map(pc -> {
                CollaboratorDTO cDto = new CollaboratorDTO();
                cDto.setId(pc.getUtilisateur().getId());
                cDto.setAdmin(pc.isAdmin());
                cDto.setNom(pc.getUtilisateur().getNom());
                cDto.setPrenom(pc.getUtilisateur().getPrenom());
                cDto.setEmail(pc.getUtilisateur().getEmail());
                return cDto;
            }).collect(Collectors.toList());
            dto.setCollaborators(collabDTOs);
            return dto;
        }).collect(Collectors.toList());
    }

    // GET /api/projects/{id}/full : renvoie le projet complet avec modèles et datasets
    @GetMapping("/{id}/full")
    public ProjectResponseDTO getProjectFull(@PathVariable Long id) {
        Projet projet = projetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Projet introuvable"));
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
        // Collaborateurs
        List<ProjetCollaborateur> collabs = projetCollaborateurRepository.findByProjetId(projet.getId());
        List<CollaboratorDTO> collabDTOs = collabs.stream().map(pc -> {
            CollaboratorDTO cDto = new CollaboratorDTO();
            Utilisateur user = pc.getUtilisateur();
            cDto.setId(user.getId());
            cDto.setAdmin(pc.isAdmin());
            cDto.setNom(user.getNom());
            cDto.setPrenom(user.getPrenom());
            cDto.setEmail(user.getEmail());
            return cDto;
        }).collect(Collectors.toList());
        dto.setCollaborators(collabDTOs);
        // Modèles
        List<Modele> modeleEntities = modeleRepository.findByProjetId(projet.getId());
        List<ModeleDTO> modeleDTOs = modeleEntities.stream().map(m -> {
            ModeleDTO mDto = new ModeleDTO();
            mDto.setId(m.getId());
            mDto.setNom(m.getNom());
            mDto.setVersion(m.getVersion());
            mDto.setDescription(m.getDescription());
            mDto.setDateCreation(m.getDateCreation());
            return mDto;
        }).collect(Collectors.toList());
        dto.setModeles(modeleDTOs);
        // Datasets
        List<Dataset> datasetEntities = datasetRepository.findByProjetId(projet.getId());
        List<DatasetDTO> datasetDTOs = datasetEntities.stream().map(ds -> {
            DatasetDTO dsDto = new DatasetDTO();
            dsDto.setId(ds.getId());
            dsDto.setNom(ds.getNom());
            dsDto.setDateCreation(ds.getDateCreation());
            return dsDto;
        }).collect(Collectors.toList());
        dto.setDatasets(datasetDTOs);
        return dto;
    }

    // POST /api/projects/full : création d'un projet complet (datasets, modèles, collaborateurs)
    @PostMapping("/full")
    public Projet createProjectFull(@RequestBody ProjectDTO projectDTO) {
        Projet projet = new Projet();
        projet.setNom(projectDTO.getNom());
        projet.setDescription(projectDTO.getDescription());
        projet.setTypeProjet(projectDTO.getTypeProjet());
        projet.setDateCreation(LocalDateTime.now());
        if (projectDTO.getId_createur() != null) {
            Utilisateur createur = utilisateurRepository.findById(projectDTO.getId_createur())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable pour id_createur=" + projectDTO.getId_createur()));
            projet.setCreateur(createur);
        }
        Projet savedProject = projetRepository.save(projet);

        if (projectDTO.getDatasets() != null) {
            projectDTO.getDatasets().forEach(datasetId -> {
                ProjetDatasetId pdId = new ProjetDatasetId(savedProject.getId(), datasetId);
                ProjetDataset pd = new ProjetDataset(pdId);
                projetDatasetRepository.save(pd);
            });
        }

        if (projectDTO.getModels() != null) {
            projectDTO.getModels().forEach(modelId -> {
                ProjetModeleId pmId = new ProjetModeleId(savedProject.getId(), modelId);
                ProjetModele pm = new ProjetModele(pmId);
                projetModeleRepository.save(pm);
            });
        }

        if (projectDTO.getCollaborators() != null) {
            for (CollaboratorDTO collab : projectDTO.getCollaborators()) {
                Long collaboratorId = collab.getId();
                Utilisateur collabUser = utilisateurRepository.findById(collaboratorId)
                    .orElseThrow(() -> new RuntimeException("Collaborateur introuvable : ID=" + collaboratorId));
                ProjetCollaborateurId pcId = new ProjetCollaborateurId(savedProject.getId(), collaboratorId);
                ProjetCollaborateur pc = new ProjetCollaborateur(pcId, collab.isAdmin());
                pc.setProjet(savedProject);
                pc.setUtilisateur(collabUser);
                projetCollaborateurRepository.save(pc);
            }
        }
        return savedProject;
    }

    // POST /api/projects/{id}/models : assigner un modèle à un projet
    @PostMapping("/{id}/models")
    public ResponseEntity<?> assignModel(@PathVariable Long id, @RequestBody AssignModelRequest req) {
        Projet projet = projetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Projet introuvable"));
        Modele modele = modeleRepository.findById(req.getModelId())
            .orElseThrow(() -> new RuntimeException("Modèle introuvable"));
        ProjetModeleId pmId = new ProjetModeleId(projet.getId(), modele.getId());
        ProjetModele pm = new ProjetModele(pmId);
        projetModeleRepository.save(pm);
        return ResponseEntity.ok().build();
    }

    // POST /api/projects/{id}/datasets : assigner un dataset à un projet
    @PostMapping("/{id}/datasets")
    public ResponseEntity<?> assignDataset(@PathVariable Long id, @RequestBody AssignDatasetRequest req) {
        Projet projet = projetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Projet introuvable"));
        Dataset dataset = datasetRepository.findById(req.getDatasetId())
            .orElseThrow(() -> new RuntimeException("Dataset introuvable"));
        ProjetDatasetId pdId = new ProjetDatasetId(projet.getId(), dataset.getId());
        ProjetDataset pd = new ProjetDataset(pdId);
        projetDatasetRepository.save(pd);
        return ResponseEntity.ok().build();
    }

    // POST /api/projects/{id}/collaborators : assigner un collaborateur à un projet
    @PostMapping("/{id}/collaborators")
    public ResponseEntity<?> assignCollaborator(@PathVariable Long id, @RequestBody AssignCollaboratorRequest req) {
        Projet projet = projetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Projet introuvable"));
        Utilisateur user = utilisateurRepository.findById(req.getUtilisateurId())
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        ProjetCollaborateurId pcId = new ProjetCollaborateurId(projet.getId(), user.getId());
        ProjetCollaborateur pc = new ProjetCollaborateur(pcId, req.isAdmin());
        pc.setProjet(projet);
        pc.setUtilisateur(user);
        projetCollaborateurRepository.save(pc);
        return ResponseEntity.ok().build();
    }

    // DELETE /api/projects/{id}/models/{modelId} : supprimer un modèle du projet
    @DeleteMapping("/{id}/models/{modelId}")
    public ResponseEntity<?> removeModel(@PathVariable Long id, @PathVariable Long modelId) {
        ProjetModeleId pmId = new ProjetModeleId(id, modelId);
        projetModeleRepository.deleteById(pmId);
        return ResponseEntity.ok().build();
    }

    // DELETE /api/projects/{id}/datasets/{datasetId} : supprimer un dataset du projet
    @DeleteMapping("/{id}/datasets/{datasetId}")
    public ResponseEntity<?> removeDataset(@PathVariable Long id, @PathVariable Long datasetId) {
        ProjetDatasetId pdId = new ProjetDatasetId(id, datasetId);
        projetDatasetRepository.deleteById(pdId);
        return ResponseEntity.ok().build();
    }

    // DELETE /api/projects/{id} : suppression d'un projet
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projetRepository.deleteById(id);
    }

    // GET /api/projects/{id} : renvoie le projet sans associations complètes
    @GetMapping("/{id}")
    public Projet getProjectById(@PathVariable Long id) {
        return projetRepository.findById(id).orElse(null);
    }

    // PUT /api/projects/{id} : mise à jour d'un projet
    @PutMapping("/{id}")
    public Projet updateProject(@PathVariable Long id, @RequestBody Projet projetData) {
        return projetRepository.findById(id).map(existing -> {
            existing.setNom(projetData.getNom());
            existing.setDescription(projetData.getDescription());
            existing.setTypeProjet(projetData.getTypeProjet());
            return projetRepository.save(existing);
        }).orElse(null);
    }

    // DTOs pour les assignations
    static class AssignModelRequest {
        private Long modelId;
        public Long getModelId() { return modelId; }
        public void setModelId(Long modelId) { this.modelId = modelId; }
    }

    static class AssignDatasetRequest {
        private Long datasetId;
        public Long getDatasetId() { return datasetId; }
        public void setDatasetId(Long datasetId) { this.datasetId = datasetId; }
    }

    static class AssignCollaboratorRequest {
        private Long utilisateurId;
        private boolean admin;
        public Long getUtilisateurId() { return utilisateurId; }
        public void setUtilisateurId(Long utilisateurId) { this.utilisateurId = utilisateurId; }
        public boolean isAdmin() { return admin; }
        public void setAdmin(boolean admin) { this.admin = admin; }
    }
}
