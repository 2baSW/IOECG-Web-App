package com.ioecg.controllers;

import com.ioecg.entities.Dataset;
import com.ioecg.repositories.DatasetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/datasets")
@CrossOrigin(origins = "*")
public class DatasetController {

    @Autowired
    private DatasetRepository datasetRepository;

    @GetMapping
    public List<Dataset> getAllDatasets() {
        return datasetRepository.findAll();
    }

    @PostMapping
    public Dataset createDataset(@RequestBody Dataset dataset) {
        return datasetRepository.save(dataset);
    }

    @GetMapping("/{id}")
    public Dataset getDatasetById(@PathVariable Long id) {
        return datasetRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Dataset updateDataset(@PathVariable Long id, @RequestBody Dataset datasetData) {
        return datasetRepository.findById(id).map(existing -> {
            existing.setNom(datasetData.getNom());
            existing.setFichier(datasetData.getFichier());
            return datasetRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteDataset(@PathVariable Long id) {
        datasetRepository.deleteById(id);
    }
}
