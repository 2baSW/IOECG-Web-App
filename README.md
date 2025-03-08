# IOECG-Web-App
Projet académique de développement d'une application web d'exécution de modèles de deep learning sur des données ECG.

# dossier client
Ce dossier concerne le dévellopement frontend.
Pour lancer l'application côté client, positionnez-vous dans ce dossier et exécutez la commande suivante :

```bash
npm run dev
```

# dossier serveur
Ce dossier concerne le développement backend.
Pour lancer l'application côté serveur, positionnez-vous dans ce dossier et exécutez la commande suivante :

```bash
mvn spring-boot:run
```

# Base de données
Le scrip de création de la base de donnée (IOECG_BDD.sql) est dans le dossier **server** pour l'instant la base de données PostgreSQL est à créer en local.
Après création de la BDD, il faudra mettre à jour les paramètre de connection à la base dans le fichier pom.xml qui se trouve dans le dossier **server** aussi.