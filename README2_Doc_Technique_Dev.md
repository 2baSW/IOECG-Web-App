# Documentation Technique - IOECG-Web-App

---

## Structure du Projet

### 1. **Entités**
Les entités sont définies dans le package `com.ioecg.entities`.

- **Utilisateur** : Représente un utilisateur de l'application.
- **Projet** : Représente un projet.
- **Modele** : Représente un modèle associé à un projet.
- **Dataset** : Représente un dataset associé à un projet.
- **ProjetCollaborateur** : Représente l'association entre un projet et ses collaborateurs.
- **ProjetModele** : Représente l'association entre un projet et ses modèles.
- **ProjetDataset** : Représente l'association entre un projet et ses datasets.
- **Experience** : Représente une expérience liée à un projet.
- **Execution** : Représente une exécution d'expérience.

---

### 2. **Repositories**
Les repositories pour interagir avec la BDD se trouvent dans le package `com.ioecg.repositories`.

- **UtilisateurRepository** : Gestion des utilisateurs.
- **ProjetRepository** : Gestion des projets.
- **ModeleRepository** : Gestion des modèles.
- **DatasetRepository** : Gestion des datasets.
- **ProjetCollaborateurRepository** : Gestion des collaborateurs associés à un projet.
- **ProjetModeleRepository** : Gestion des modèles associés à un projet.
- **ProjetDatasetRepository** : Gestion des datasets associés à un projet.
- **ExperienceRepository** : Gestion des expériences.
- **ExecutionRepository** : Gestion des exécutions.

---

### 3. **Controllers**
Les controllers exposent des endpoints REST pour interagir avec les entités. Ils se trouvent dans le package `com.ioecg.controllers`.

- **AuthController** : Gestion de l'authentification (login) => (À refaire, on doit utiliser O).
- **UtilisateurController** : Gestion des utilisateurs (CRUD).
- **ProjetController** : Gestion des projets, y compris les associations avec modèles, datasets, et collaborateurs.
- **ModeleController** : Gestion des modèles (CRUD).
- **DatasetController** : Gestion des datasets (CRUD) => (À adapter avec le Backlog).
- **ProjetCollaborateurController** : Gestion des collaborateurs associés à un projet.
- **ExperienceController** : (À adapter) Gestion des expériences (CRUD).
- **ExecutionController** : (À adapter) Gestion des exécutions (CRUD).
- **RapportController** : (À compléter) Gestion des rapports PDF.

---

### 4. **API REST**
Principaux endpoints exposés par l'application pour l'instant:

#### **AuthController**
- `POST /api/auth/login` : Authentification d'un utilisateur.

#### **UtilisateurController**
- `GET /api/users` : Liste des utilisateurs.
- `GET /api/users/{id}` : Détails d'un utilisateur.
- `GET /api/users/email/{email}` : Recherche d'un utilisateur par email.
- `PUT /api/users/{id}/password` : Mise à jour du mot de passe.

#### **ProjetController**
- `GET /api/projects` : Liste des projets.
- `GET /api/projects/{id}` : Détails d'un projet.
- `GET /api/projects/{id}/full` : Détails complets d'un projet (modèles, datasets, collaborateurs).
- `POST /api/projects/full` : Création d'un projet complet.
- `POST /api/projects/{id}/models` : Assignation d'un modèle à un projet.
- `POST /api/projects/{id}/datasets` : Assignation d'un dataset à un projet.
- `POST /api/projects/{id}/collaborators` : Assignation d'un collaborateur à un projet.
- `DELETE /api/projects/{id}` : Suppression d'un projet.

#### **ModeleController**
- `GET /api/models` : Liste des modèles.
- `GET /api/models/{id}` : Détails d'un modèle.
- `POST /api/models` : Création d'un modèle.
- `PUT /api/models/{id}` : Mise à jour d'un modèle.
- `DELETE /api/models/{id}` : Suppression d'un modèle.

#### **DatasetController**
- `GET /api/datasets` : Liste des datasets.
- `GET /api/datasets/{id}` : Détails d'un dataset.
- `POST /api/datasets` : Création d'un dataset.
- `PUT /api/datasets/{id}` : Mise à jour d'un dataset.
- `DELETE /api/datasets/{id}` : Suppression d'un dataset.

#### **ExperienceController**
- `GET /api/experiences` : Liste des expériences.
- `GET /api/experiences/{id}` : Détails d'une expérience.
- `POST /api/experiences` : Création d'une expérience.
- `PUT /api/experiences/{id}` : Mise à jour d'une expérience.
- `DELETE /api/experiences/{id}` : Suppression d'une expérience.

#### **ExecutionController**
- `GET /api/executions` : Liste des exécutions.
- `GET /api/executions/{id}` : Détails d'une exécution.
- `POST /api/executions` : Création d'une exécution.
- `PUT /api/executions/{id}` : Mise à jour d'une exécution.
- `DELETE /api/executions/{id}` : Suppression d'une exécution.


---

### 6. **Tests**
Les tests automatisés sont définis dans le package `com.ioecg.tests`. 
- **Selenium** : Utilisé pour les tests automatisés avec WebDriverManager.
Par exemple :
- **TestCreationProjet** : Teste la création de projets via l'interface utilisateur.


---


## Auteurs

**Baba Sow**  
GitHub : [https://github.com/2baSW](https://github.com/2baSW)

## Collaborateurs

- **Lucas Zeng**  
  GitHub : [https://github.com/LucasZheng42](https://github.com/LucasZheng42)

- **Naoufal Benamar**  
  GitHub : [https://github.com/NaoufalBgit](https://github.com/NaoufalBgit)

- **Kaouthar Bourouis**  
  GitHub : [https://github.com/kaoutharBrs-bot](https://github.com/kaoutharBrs-bot)

- **Haibala El Varougou**  
  GitHub : [https://github.com/HAIBALLA1](https://github.com/HAIBALLA1)

- **Alioune Seck**  
  GitHub : [https://github.com/seckalioune](https://github.com/seckalioune)