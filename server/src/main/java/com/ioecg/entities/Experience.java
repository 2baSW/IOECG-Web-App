package com.ioecg.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "experience")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Lien vers le projet auquel cette expérience appartient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_projet", nullable = false)
    private Projet projet;

    private String description;

    @Column(nullable = false)
    private String statut; // "Non exécutée", "En cours", "Exécutée"

    @Column(name = "date_execution")
    private LocalDateTime dateExecution;

    // Une expérience peut avoir plusieurs exécutions
    @OneToMany(mappedBy = "experience", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Execution> executions;

    // Getters & Setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Projet getProjet() {
        return projet;
    }
    public void setProjet(Projet projet) {
        this.projet = projet;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getStatut() {
        return statut;
    }
    public void setStatut(String statut) {
        this.statut = statut;
    }
    public LocalDateTime getDateExecution() {
        return dateExecution;
    }
    public void setDateExecution(LocalDateTime dateExecution) {
        this.dateExecution = dateExecution;
    }
    public List<Execution> getExecutions() {
        return executions;
    }
    public void setExecutions(List<Execution> executions) {
        this.executions = executions;
    }
}
