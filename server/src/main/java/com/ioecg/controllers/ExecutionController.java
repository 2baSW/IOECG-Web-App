package com.ioecg.controllers;

import com.ioecg.entities.Execution;
import com.ioecg.repositories.ExecutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/executions")
@CrossOrigin(origins = "*")
public class ExecutionController {

    @Autowired
    private ExecutionRepository executionRepository;

    @GetMapping
    public List<Execution> getAllExecutions() {
        return executionRepository.findAll();
    }

    @PostMapping
    public Execution createExecution(@RequestBody Execution execution) {
        // pipeline au HPC Scheduler???
        return executionRepository.save(execution);
    }

    @GetMapping("/{id}")
    public Execution getExecutionById(@PathVariable Long id) {
        return executionRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Execution updateExecution(@PathVariable Long id, @RequestBody Execution execData) {
        return executionRepository.findById(id).map(existing -> {
            existing.setEtatExecution(execData.getEtatExecution());
            existing.setMetadonnees(execData.getMetadonnees());
            existing.setDateExecution(execData.getDateExecution());
            return executionRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteExecution(@PathVariable Long id) {
        executionRepository.deleteById(id);
    }
}
