
<?php
  include "connect.php";

  $score = $_POST['score'];
  $pseudo = $_POST['pseudo'];

  $requete = "INSERT INTO halloffame VALUES(" . $score . ",'" . $pseudo . "')";
  echo $requete;

  if ($result = mysqli_query($link,$requete)) {
    echo "done";
  } else {
    echo "Erreur de requête de base de données.";
  }
?>
