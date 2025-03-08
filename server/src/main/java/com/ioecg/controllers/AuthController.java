package com.ioecg.controllers;

import com.ioecg.entities.Utilisateur;
import com.ioecg.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // À restreindre en production
public class AuthController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest loginRequest) {
        Utilisateur user = utilisateurRepository.findByEmail(loginRequest.getEmail());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            // On retourne une réponse sans le mot de passe
            UserResponse response = new UserResponse(
                user.getId(),
                user.getNom(),
                user.getPrenom(),
                user.getEmail()
            );
            return ResponseEntity.ok(response);
        }
        // En cas d'erreur, on renvoie un statut HTTP 401 (Unauthorized)
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // DTO pour la requête de connexion
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }

    // DTO pour la réponse utilisateur (sans le mot de passe)
    public static class UserResponse {
        private Long id;
        private String nom;
        private String prenom;
        private String email;

        public UserResponse(Long id, String nom, String prenom, String email) {
            this.id = id;
            this.nom = nom;
            this.prenom = prenom;
            this.email = email;
        }

        public Long getId() {
            return id;
        }
        public String getNom() {
            return nom;
        }
        public String getPrenom() {
            return prenom;
        }
        public String getEmail() {
            return email;
        }
    }
}
