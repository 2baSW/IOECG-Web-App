--------------------------------------------------------------------
-- pour crérer les tables de la base de données
--   \i /path/IOECG_BDD.sql
--------------------------------------------------------------------

-- Supprimer les tables existantes
DROP TABLE IF EXISTS execution CASCADE;
DROP TABLE IF EXISTS resultat CASCADE;
DROP TABLE IF EXISTS experience CASCADE;
DROP TABLE IF EXISTS projet_modele CASCADE;
DROP TABLE IF EXISTS modele CASCADE;
DROP TABLE IF EXISTS projet_dataset CASCADE;
DROP TABLE IF EXISTS dataset CASCADE;
DROP TABLE IF EXISTS projet_collaborateur CASCADE;
DROP TABLE IF EXISTS projet CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;

------------------------------------------------------------------
-- 1. UTILISATEUR
------------------------------------------------------------------
CREATE TABLE utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

------------------------------------------------------------------
-- 2. PROJET
------------------------------------------------------------------
CREATE TABLE projet (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type_projet VARCHAR(50) NOT NULL CHECK (type_projet IN ('Analyse', 'Expérience')),
    id_createur INTEGER NOT NULL,
    FOREIGN KEY (id_createur) REFERENCES utilisateur(id) ON DELETE CASCADE
);

------------------------------------------------------------------
-- 3. ASSOCIATION PROJET - COLLABORATEURS (N..N)
------------------------------------------------------------------
CREATE TABLE projet_collaborateur (
    id_projet INTEGER NOT NULL,
    id_utilisateur INTEGER NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id_projet, id_utilisateur),
    FOREIGN KEY (id_projet) REFERENCES projet(id) ON DELETE CASCADE,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id) ON DELETE CASCADE
);

------------------------------------------------------------------
-- 4. DATASET (stocké en TEXT)
------------------------------------------------------------------
CREATE TABLE dataset (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    fichier TEXT NOT NULL,  
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

------------------------------------------------------------------
-- 5. ASSOCIATION PROJET - DATASET (N..N)
------------------------------------------------------------------
CREATE TABLE projet_dataset (
    id_projet INTEGER NOT NULL,
    id_dataset INTEGER NOT NULL,
    PRIMARY KEY (id_projet, id_dataset),
    FOREIGN KEY (id_projet) REFERENCES projet(id) ON DELETE CASCADE,
    FOREIGN KEY (id_dataset) REFERENCES dataset(id) ON DELETE CASCADE
);

------------------------------------------------------------------
-- 6. MODELE
------------------------------------------------------------------
CREATE TABLE modele (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    version VARCHAR(50),
    description TEXT,
    fichier TEXT,  -- fichier exécutable en texte pour l'instant
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

------------------------------------------------------------------
-- 7. ASSOCIATION PROJET - MODELE (N..N)
------------------------------------------------------------------
CREATE TABLE projet_modele (
    id_projet INTEGER NOT NULL,
    id_modele INTEGER NOT NULL,
    PRIMARY KEY (id_projet, id_modele),
    FOREIGN KEY (id_projet) REFERENCES projet(id) ON DELETE CASCADE,
    FOREIGN KEY (id_modele) REFERENCES modele(id) ON DELETE CASCADE
);

------------------------------------------------------------------
-- 8. EXPERIENCE (liée à un projet)
------------------------------------------------------------------
CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    id_projet INTEGER NOT NULL,
    description TEXT,
    statut VARCHAR(50) NOT NULL CHECK (statut IN ('Non exécutée', 'En cours', 'Exécutée')),
    date_execution TIMESTAMP,
    FOREIGN KEY (id_projet) REFERENCES projet(id) ON DELETE CASCADE
);

------------------------------------------------------------------
-- 9. RESULTAT 
------------------------------------------------------------------
CREATE TABLE resultat (
    id SERIAL PRIMARY KEY,
    donnees JSONB,
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

------------------------------------------------------------------
-- 10. EXECUTION (association entre EXPERIENCE, MODELE, RESULTAT + métadonnées)
------------------------------------------------------------------
CREATE TABLE execution (
    id SERIAL PRIMARY KEY,
    id_experience INTEGER NOT NULL,
    id_modele INTEGER NOT NULL,
    id_resultat INTEGER,
    metadonnees JSONB,
    etat_execution VARCHAR(50),
    date_execution TIMESTAMP,
    execute_par INTEGER,
    FOREIGN KEY (id_experience) REFERENCES experience(id) ON DELETE CASCADE,
    FOREIGN KEY (id_modele) REFERENCES modele(id) ON DELETE CASCADE,
    FOREIGN KEY (id_resultat) REFERENCES resultat(id) ON DELETE SET NULL,
    FOREIGN KEY (execute_par) REFERENCES utilisateur(id) ON DELETE SET NULL
);

