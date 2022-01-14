<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Escape Game</title>
    <link href="styleMap.css" rel="stylesheet" type="text/css" />
    <link href="styleBouton.css" rel="stylesheet" type="text/css" />

	  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossorigin=""/>
      <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
      integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
      crossorigin=""></script>
  </head>
  <body>


      <div id="menu">
        <a class="bouton1" href=index.php>Abandonner la partie</a>
      </div>


      <div id="map"></div>

      <div id="compteur_conteneur" >
        <p id="compteur">00:00</p>
      </div>

      <div id="quest">


        <p id="quest_text" class="img_inventory">Pas de mission en cours</p>
      </div>


      <div id="car">
        <input class="img_car" type="image" id="image" alt="Login"
       src="img/clio.png">
        <p>Retour au Bruzet</p>
        <?php
          if ((isset($_POST['pseudo'])) && (! empty($_POST['pseudo']))) {
            $pseudo = $_POST['pseudo'];
            echo "<p style='visibility: hidden' id='pseudo'>$pseudo<p>";
          }
        ?>
      </div>

      <div id="inventory">
        <div id="slot_1">
        </div>
        <div id="slot_2">
        </div>
        <div id="slot_3">
        </div>
        <div id="slot_4">
        </div>
        <div id="slot_5">
        </div>

      </div>



    <script src="map.js"></script>
  </body>
</html>
