# IOECG-Web-App
Projet académique de développement d'une application web d'exécution de modèles de deep learning sur des données ECG.

# dossier client
Ce dossier concerne le développement frontend.
Suivez le guide d'installation suivant si vous ne possèdez pas Node.js et npm : 
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
Pour lancer l'application côté client, positionnez-vous dans ce dossier et exécutez la commande suivante :

```bash
npm install //pour la première fois
npm run dev
```

# dossier serveur
Ce dossier concerne le développement backend.
Suivez le guide d'installation suivant si vous ne possèdez pas Maven : 
https://maven.apache.org/install.html
Pour lancer l'application côté serveur, positionnez-vous dans ce dossier et exécutez la commande suivante :

```bash
mvn spring-boot:run
```

# Base de données
Suivez le guide d'installation suivant si vous ne possèdez pas la base de données PostgreSQL : 
https://www.postgresql.org/download/
Les scripts de création de la base de donnée (IOECG_BDD.sql) et d'insertion d'exemples de modèles sont dans le dossier **resources/scripts**. Pour l'instant la base de données PostgreSQL est à créer en local. et l'insertion des modèles se fait par exectuion de script.
Après création de la BDD, il faudra mettre à jour les paramètre de connection à la base dans le fichier pom.xml qui se trouve dans le dossier **server** aussi.
