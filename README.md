# Installation de l'environnement de développement avec Docker

En premier lieu, il vous faudra installer Docker Desktop si vous être sur un environnement Windows.

Vous pourrez ensuite créer une image à partir du Dockerfile en ouvrant un terminal à la racine du projet et en exécutant cette commande :
docker build -t alexandrebonnin-front:latest .

Une fois l'image construite sur votre poste, lancer la commande ci-dessous pour exécuter le container docker :
docker run -d -it -p 3001:3000 --name alexandrebonnin-front -v .:/alexandrebonnin-front -v /alexandrebonnin-front/node_modules alexandrebonnin-front:latest

Pour exécuter l'environnement de développement local avec docker-compose :
```
docker-compose -f docker-compose.dev.yml up -d
```

Ou la commande 
```
npm run docker-dev-up
```

# Installation de l'environnement de production
1. Clônez le projet sur votre serveur à l'emplacement souhaité.
2. Changez les variables d'environnement dand le fichier `prod.env`.
3. Lancez la commande suivante pour lancer le container : `docker compose --env-file /var/projects/env_files/alexandrebonnin.fr.env -f docker-compose.prod.yml up -d --build`.

Pour arrêter le container, exécutez la commande suivante : `docker compose --env-file /var/projects/env_files/alexandrebonnin.fr.env -f docker-compose.prod.yml down`.