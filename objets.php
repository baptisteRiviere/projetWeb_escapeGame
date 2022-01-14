<?php
  include "connect.php";

  $id_cherche = $_POST['id'];
  $requete = "SELECT * FROM objets WHERE id = $id_cherche";

  if ($result = mysqli_query($link,$requete)) {
    while ($ligne = mysqli_fetch_assoc($result)) {
      echo json_encode($ligne);
    }
  } else {
    echo "Erreur de requête de base de données.";
  }

?>
