package com.ioecg.controllers;

import com.ioecg.entities.Modele;
import com.ioecg.repositories.ModeleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/models")
@CrossOrigin(origins = "*")
public class ModeleController {

    @Autowired
    private ModeleRepository modeleRepository;

    @GetMapping
    public List<Modele> getAllModels() {
        return modeleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Modele getModelById(@PathVariable Long id) {
        return modeleRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Modele createModel(@RequestBody Modele modele) {
        return modeleRepository.save(modele);
    }

    @PutMapping("/{id}")
    public Modele updateModel(@PathVariable Long id, @RequestBody Modele modelData) {
        return modeleRepository.findById(id).map(existing -> {
            existing.setNom(modelData.getNom());
            existing.setVersion(modelData.getVersion());
            existing.setDescription(modelData.getDescription());
            existing.setFichier(modelData.getFichier());
            return modeleRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteModel(@PathVariable Long id) {
        modeleRepository.deleteById(id);
    }
}
