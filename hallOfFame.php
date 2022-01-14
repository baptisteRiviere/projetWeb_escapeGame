<?php
  include "connect.php";

  $requete = "SELECT score,nom FROM hallOfFame ORDER BY score DESC LIMIT 10";

  $tableau = [];
  if ($result = mysqli_query($link,$requete)) {
    while ($ligne = mysqli_fetch_assoc($result)) {
      $tableau[] = $ligne;
    }
  }
  echo json_encode($tableau);

?>
