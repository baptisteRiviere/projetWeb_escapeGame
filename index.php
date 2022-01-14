<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Escape Game</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet">
</head>
    <link href="style.css" rel="stylesheet" type="text/css" />
    <link href="styleBouton.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Bonheur+Royale&display=swap" rel="stylesheet">



  </head>
  <body>


    <div id='launcher'>
      <form action="carte.php" method="post" id="form_pseudo">
        <input type="text" name="pseudo" id="pseudo" value="Entre ton pseudo" onfocus="this.value=''">
        <input type="submit" name="valider" id="boutonJeu" value="Commencer à jouer" class="bouton1">
      </form>
    </div>

    <div id="description">
      <div class="lapin">
        <img src="img/scribe.png" id="lapin1">
      </div>
      <div id="divText">
        <p id="textDescr" style="font-size:2vw">
          <strong style='text-decoration: underline;'>Micmac au Bruzet</strong>
          Bienvenue à toi cher visiteur ! Nous sommes Léa et Baptiste :
          deux étudiants de l'ENSG géomatique ET membres du BDE de cette même école !
          Passe ta souris sur nos lapins pour en savoir plus
        </p>

      </div>
      <div class="lapin">
        <img src="img/VP.png" id="lapin2">
      </div>
    </div>

    <div id="php">
    <?php
      if ((isset($_POST['score'])) && (! empty($_POST['score']))) {
        $score = $_POST['score'];
        $pseudo = $_POST['pseudo'];
        echo "<p id='bravo' style='visibility: hidden'>Bravo $pseudo , tu as fais un score de $score</p>";
      } else {
        echo "<p id='bravo' style='visibility: hidden'>debutJeu</p>";
      }
    ?>

    </div>

    <div id="divLogos">
      <img src="img/logo.svg" class="logo">
      <img src="img/ENSG.svg" class="logo">


    </div>



    <div id="hallOfFame">
      <h1>Hall of Fame</h1>
      <div id="table">
      </div>
    </div>


    <script src="index.js"></script>
  </body>
</html>
