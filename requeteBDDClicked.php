<?php
  include "connect.php";

  $input = $_POST['input'];
  $table = $_POST['table'];

  if ($input == null) {
    $requete = "SELECT * FROM $table ORDER BY RAND() LIMIT 1";
  } else {
    $requete = "SELECT * FROM $table WHERE cle = '$input'";
  }



  if ($result = mysqli_query($link,$requete)) {
    while ($ligne = mysqli_fetch_assoc($result)) {
      echo json_encode($ligne);
    }
  } else {
    echo "Erreur de requête de base de données.";
  }
?>
