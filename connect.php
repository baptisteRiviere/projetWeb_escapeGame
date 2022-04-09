<?php

  //$link =  mysqli_connect('localhost','root','root','escape');
  $link = mysqli_connect('mysql-riviereb.alwaysdata.net', 'riviereb_code', 'mdpPeuSécurisé', 'riviereb_escape');
  $link->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, 1);
  mysqli_set_charset($link, "utf8");
  if (mysqli_connect_error()) {
    die('Erreur de connexion');
  }

?>
