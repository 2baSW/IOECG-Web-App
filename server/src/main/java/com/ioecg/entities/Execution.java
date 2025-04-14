package com.ioecg.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "execution")
public class Execution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Lien vers l'expérience concernée
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_experience", nullable = false)
    private Experience experience;

    // Lien vers le modèle utilisé
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_modele", nullable = false)
    private Modele modele;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_resultat")
    private Resultat resultat;

    @Column(columnDefinition = "jsonb")
    private String metadonnees; 

    @Column(name = "etat_execution")
    private String etatExecution; // "En attente", "En cours", "Terminé"

    @Column(name = "date_execution")
    private LocalDateTime dateExecution; // Date/heure de lancement

    // L'utilisateur qui a lancé l'exécution
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "execute_par")
    private Utilisateur executePar;

    // Getters & Setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Experience getExperience() {
        return experience;
    }
    public void setExperience(Experience experience) {
        this.experience = experience;
    }
    public Modele getModele() {
        return modele;
    }
    public void setModele(Modele modele) {
        this.modele = modele;
    }
    public Resultat getResultat() {
        return resultat;
    }
    public void setResultat(Resultat resultat) {
        this.resultat = resultat;
    }
    public String getMetadonnees() {
        return metadonnees;
    }
    public void setMetadonnees(String metadonnees) {
        this.metadonnees = metadonnees;
    }
    public String getEtatExecution() {
        return etatExecution;
    }
    public void setEtatExecution(String etatExecution) {
        this.etatExecution = etatExecution;
    }
    public LocalDateTime getDateExecution() {
        return dateExecution;
    }
    public void setDateExecution(LocalDateTime dateExecution) {
        this.dateExecution = dateExecution;
    }
    public Utilisateur getExecutePar() {
        return executePar;
    }
    public void setExecutePar(Utilisateur executePar) {
        this.executePar = executePar;
    }
}

