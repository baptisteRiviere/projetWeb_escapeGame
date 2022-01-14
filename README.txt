Micmac au Bruzet
Un escape game cartographique
Imaginé et développé par Léa Frédoc et Baptiste Rivière
cadre : projet WEB, ENSG géomatique

### Installation du jeu

1 - Disposer du logiciel MAMP
    https://www.mamp.info/en/downloads/
    Version utilisée: 5.0.2.3860

2 - S'assurer que MAMP est lancé
    et que Apache Server et MySQL Server sont activés.
    Apache Version: 2.4.33
    MYSQL Version: 5.7.24
    Version PHP utilisée: 7.4.16

3 - Dans les préférences de MAMP définir les ports sur 80 & 3306.
    (MAMP -> préférences -> Ports)

4 - Vérifier que le fichier Web server séléctionné est le fichier
    cloné à partir de gitlab "projetWEB".

5 - Ouvrir le site http://localhost/phpMyAdmin/ sur un navigateur, de préférence
    Chrome ou Firefox.

6 - Créer une BDD nommée "escape".

7 - Importer la base de donnée escape.sql .

8 - Vérifier que la Bdd est bien installée et que la table objets a
    été créée grace à l'interface.

9 - Dans un nouvel onglet de votre navigateur, tapez dans la barre URL
    "localhost" et lancer la recherche.

10 - La page d'accueil "index.php" doit se lancer.

11 - Une connexion internet est nécessaire pour jouer, bonne partie !



### Description des fichiers

# index.php contient la page d'accueil du jeu, prépare le joueur avant de lancer carte.php
# index.js permet d'ajouter certaines fonctionnalités à index.php
# style.css contient la mise en forme de index.php

# carte.php permet d'afficher le jeu : la carte, l'inventaire, le timer...
# map.js contient toutes les fonctionnalités du jeu
# styleMap.css contient la mise en forme de carte.php

# escape.sql contient la Base de données du jeu
# connect.php permet aux scripts suivants de se connecter à la BDD
# hallOfFame permet d'accéder au 10 meilleurs joueurs
# objets.php permet d'accéder à un objet du jeu
# requeteBDDClicked.php permet de mettre en place un objet de type "BDD"
# MAJ_HoF.php permet de mettre à jour la BDD lors de la fin du jeu, pour enregistrer le score et le pseudo du joueur


## Page de fin

  # il s'agit de la page de début modifiée, le hall of fame a été mis à jour (la BDD aussi)
  # un message de félicitation apparait, de même en passant sur les lapins
