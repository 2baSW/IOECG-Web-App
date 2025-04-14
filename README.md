# IOECG-Web-App

Projet académique de développement d'une application web permettant l'exécution et la gestion de modèles de deep learning sur des données ECG.

---

## Cloner le dépôt

```bash
git clone https://github.com/2baSW/IOECG-Web-App.git
cd IOECG-Web-App
```

---

## Structure du projet

Le projet est organisé en trois principaux composants :

- **client** : Application frontend réalisée en React.js  
- **server** : Application backend développée en Java (Spring Boot)  
- **Base de données** : PostgreSQL

Pour chaque partie, suivez les détails pour l'installation.

---

## Dossier "client" (Frontend)

Ce dossier contient l'interface utilisateur.

### Prérequis

- **Node.js & npm**

Si vous n'avez pas encore Node.js et npm, vous pouvez les installer en suivant le guide d'installation : [Installation Node.js et npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation et démarrage

Depuis le dossier `client` :

```bash
npm install
npm run dev
```

Accédez ensuite à l'application frontend sur :

```
http://localhost:5173
```

---

## Dossier "server" (Backend)

Ce dossier contient l'API REST développée avec Spring Boot et Java 17.

### Prérequis

- Java 17 (OpenJDK)
- Maven

Si Maven n'est pas installé, suivez le guide d'installation suivant :  
[Installation Maven](https://maven.apache.org/install.html)

### Installation et démarrage du serveur

Depuis le dossier `server` :

```bash
mvn clean install
mvn spring-boot:run
```

---

## Base de données PostgreSQL

### Prérequis

Si PostgreSQL n'est pas installé, suivez le guide d'installation suivant :  
[Installation PostgreSQL](https://www.postgresql.org/download/)

### Configuration rapide :

```bash
sudo -i -u postgres
psql
```

```sql
CREATE DATABASE ioecg_db;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'baba';
GRANT ALL PRIVILEGES ON DATABASE ioecg_db TO postgres;
\q
exit
```

---

### Scripts SQL

Les scripts SQL de création des tables et d'insertion de données d'exemples sont disponibles dans :

- **Création des tables** : `server/src/main/resources/scripts/IOECG_BDD.sql`
- **Insertion de modèles d'exemple** : `server/src/main/resources/scripts/insertModeles.sql`

Pour importer ces scripts, utilisez les commandes suivantes :

```bash
psql -U postgres -d ioecg_db -f server/src/main/resources/scripts/IOECG_BDD.sql
psql -U postgres -d ioecg_db -f server/src/main/resources/scripts/insertModeles.sql
```

---

## Configuration Spring Boot

Si vous avez modifié les paramètres de connexion lors de la création de la base, adaptez en conséquence le fichier `application.properties` situé dans :

```
server/src/main/resources/
```

---

## Fonctionnalités implémentées

- Authentification utilisateur  
- Gestion du profil de l'utilisateur connecté  
- CRUD sur les projets et datasets  
- Exploration et sélection dynamique de modèles disponibles et datasets créés  
- Gestion avancée des collaborateurs dans un projet  

---

## Fonctionnalités à corriger ou à améliorer

- **Authentification OAuth 2.0** : Prévu pour une meilleure sécurité  
- **CRUD Dataset** : À adapter selon les besoins spécifiques du client (voir Backlog)  
- **Pages d'exécution et suivi d'exécution** : En cours de développement  
- **Historique des exécutions et génération de rapports** : Prévu pour une meilleure traçabilité  

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