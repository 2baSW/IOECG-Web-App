package com.ioecg.controllers;

import com.ioecg.entities.Utilisateur;
import com.ioecg.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Collections;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(utilisateurRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<Utilisateur> user = utilisateurRepository.findById(id);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Utilisateur user = utilisateurRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Collections.singletonMap("message", "Utilisateur introuvable"));
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody PasswordUpdateRequest req) {
        if (req.getNewPassword() == null || req.getNewPassword().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Collections.singletonMap("message", "Le mot de passe ne peut pas être vide"));
        }
        Optional<Utilisateur> optionalUser = utilisateurRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Collections.singletonMap("message", "Utilisateur introuvable"));
        }
        Utilisateur user = optionalUser.get();
        user.setPassword(req.getNewPassword());
        utilisateurRepository.save(user);
        return ResponseEntity.ok(Collections.singletonMap("message", "Mot de passe mis à jour avec succès"));
    }
}

class PasswordUpdateRequest {
    private String newPassword;
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
