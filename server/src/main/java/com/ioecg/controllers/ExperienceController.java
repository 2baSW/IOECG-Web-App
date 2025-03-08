package com.ioecg.controllers;

import com.ioecg.entities.Experience;
import com.ioecg.repositories.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*")
public class ExperienceController {

    @Autowired
    private ExperienceRepository experienceRepository;

    @GetMapping
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    @PostMapping
    public Experience createExperience(@RequestBody Experience experience) {
        return experienceRepository.save(experience);
    }

    @GetMapping("/{id}")
    public Experience getExperienceById(@PathVariable Long id) {
        return experienceRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Experience updateExperience(@PathVariable Long id, @RequestBody Experience expData) {
        return experienceRepository.findById(id).map(existing -> {
            existing.setDescription(expData.getDescription());
            existing.setStatut(expData.getStatut());
            existing.setDateExecution(expData.getDateExecution());
            return experienceRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteExperience(@PathVariable Long id) {
        experienceRepository.deleteById(id);
    }
}
