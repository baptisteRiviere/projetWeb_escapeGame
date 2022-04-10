/*
Ce script contient tout le déroulé du jeu

*/


// Création de la carte
let map = L.map('map', {
  minZoom: 2,
  maxBounds: [
      [-90, -200], //south west
      [+90, +200] // //north east
      ],
}).setView([44.051830,5.796145], 18);

// var serviceUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
// var credits = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012 etc. etc. etc.';
// L.tileLayer(serviceUrl, {
//         attribution: credits,
//         zoom:19
//     }).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        zoom:19,
    }).addTo(map);

// initialisation des variables

// map permettant d'accéder au group of Layer correspondant au zoom
var zoomLayerGroup = new Map();
for(let zoom=1;zoom<20;zoom++) {
  let layerZoom = L.layerGroup();
  zoomLayerGroup.set(zoom,layerZoom);
}

var dejaOuverts = []; // permet de n'ouvrir automatiquement une popup qu'une seule fois
var inventory = []; // elements dans l'inventaire
var dict = {};  // image dans l'inventaire
var pseudo = document.getElementById("pseudo").textContent; // récupération du pseudo du joueur

//heure de départ (arrivée sur la page)
let startPage = Date.now();

// mise en place de la voiture permettant de retourner au Bruzet
document.getElementById("image").onclick = function() {
  map.flyTo([44.051830,5.796145], 18);
}

// On ajoute un addEventListener à la carte,
// lorsqu'on zoom, cela affiche les marqueurs correspondants
map.on('zoomend', miseAJourMarqueurs)

function miseAJourMarqueurs() {
  var zoomMap = map.getZoom() ;

  for (var [zoomMin,layerZoom] of zoomLayerGroup) {
    if (zoomMap < zoomMin) {
      map.removeLayer(layerZoom);
    } else {
      map.addLayer(layerZoom);
    }
  }
}


// Ajout du premier objet
// permet de débuter la partie
displayMarker(1);



function displayMarker(id) {
  /*
  Fonction permettant de récupérer un marqueur par son id et de l'afficher
  Puis mets en place le fonctionnement de l'objet selon son comportement (behaviour)
  */
  var data = new FormData(); // requete AJAX
  data.append('id',id);
  fetch('objets.php', {
    method: 'post',
    body: data
  }) // résultat
  .then(r => r.json())
  .then(r => {
    // récupération des paramètres et affichage de l'objet
    let marker = L.marker([r.latitude,r.longitude], {icon: L.icon({
        iconUrl: "img/" +  r.icone,
        iconSize:     [r.taille_largeur, r.taille_hauteur], // Taille de l'icone
        iconAnchor:   [r.taille_largeur/2, r.taille_hauteur], // point ou l'image va apparaitre par rapport au point
        popupAnchor:  [r.taille_largeur/4,- r.taille_hauteur - 5] // point ou la popup va apparaitre
    })});

    // on ajoute le marker au layer correspondant à son zoom
    zoomLayerGroup.get(r.zoom).addLayer(marker);
    miseAJourMarqueurs() // puis on met à jour les marqueurs


    // On met en place une popup pour tous les objets, certaines ne seront pas ouvertes
    let popup = '<h1>' + r.nom + '</h1>' + r.indice;
    popup += "<input type='submit' value='OK' class='bouton1' id='OKsubmit" + r.id.toString() + "'>";
    if (r.behaviour == "blockedByPassword") { // si on a un password il faut ajouter l'input' à la popup
      popup += "<input type='text' name='form' id='proposition" + r.id.toString() + "'>";
    }
    // on ajoute alors la popup au marqueur
    marker.bindPopup(popup);

    // on ouvre alors automatiquement la popup si l'objet le demande
    if ((r.openPopup >= 1) && (!dejaOuverts.includes(r.id))) {
      // le tableau dejaOuverts permet de n'ouvrir la popup automatiquement qu'une seule fois
      dejaOuverts.push(r.id);
      if (r.openPopup == 2) { // Si, en + d'ouvrir la popup, on veut se déplacer sur le marqueur
        map.flyTo([r.latitude,r.longitude]);
      }
      marker.openPopup(); // on ouvre la popup
      behaviour(r,marker); // on met en place le comportement de l'objet
    }

    // Si la popup est fermée on attend le click du joueur sur l'objet pour poursuivre
    // la suite dépend du comportement de l'objet (attribut behaviour)
    marker.addEventListener("click", function() {
    behaviour(r,marker);})
  })
}


function behaviour(r,marker) {
  /*
  Modelise le comportement de la popup
  Selon le comportement de l'objet, cette fonction va écouter
  les evenements correspondants et va déclancher l'action adéquate

  comportements :
  - OK : il suffit de cliquer sur OK pour débloquer le(s) objet(s) suivant(s)
  - inventory : cliquer l'objet permet de le déplacer dans l'inventaire
  - blockedByInventory : l'objet est bloqué par un autre objet qui doit être présent dans l'inventaire
  - BDD : donne une information en réponse à une clé.
  - blockedByPassword : attend un code pour être débloqué
  - endOfTheGame : fin du jeu, met à jour la BDD et retourne vers la page de fin
  */
  if (r.behaviour == "OK") {
    // on ajoute l'indice dans la colonne de gauche
    document.getElementById("quest_text").innerHTML=r.indice+"<img class='people' src="+ "img/"+r.icone+">";
    // Il suffit de cliquer sur ok pour poursuivre, on écoute la variable ok pour activer la suite du jeu
    let ok = document.getElementById('OKsubmit' + r.id.toString());
    ok.addEventListener('click', function() { OKclicked(r); }); // on part vers la fonction correspondante
  } else if (r.behaviour == "inventory") {
    inventoryClicked(r,marker); // on part vers la fonction correspondante
    check_inventory(r); // on met à jour l'inventaire
  } else if (r.behaviour == "blockedByInventory") {
    document.getElementById("quest_text").innerHTML=r.indice+"<img class='people' src="+ "img/"+r.icone+">";
    blockedByInventoryClicked(r,marker);
    check_inventory(r);
  } else if (r.behaviour == "blockedByPassword") {
    document.getElementById("quest_text").innerHTML=r.indice+"<img class='people' src="+ "img/"+r.icone+">";
    blockedByPasswordClicked(r,marker);
  } else if (r.behaviour == "endOfTheGame") {
    endOfTheGame(r);
  } else {
    // Pour tous les autres cas, on considère qu'il s'agit d'un comportement dirigé par une base de donnée
    // r.behaviour contient le nom de cette base de donnée
    BDDClicked(r);
  }
}

function clear_inventory(){
  document.getElementById("slot_1").innerHTML = '';
  document.getElementById("slot_2").innerHTML = '';
  document.getElementById("slot_3").innerHTML = '';
  document.getElementById("slot_4").innerHTML = '';
  document.getElementById("slot_5").innerHTML = '';
}

function check_inventory(r){
    let taille = inventory.length;
    let indice = 1;
    while(indice <=taille){
      document.getElementById("slot_"+indice).innerHTML = "<img class='img_inventory'src="+ "img/"+dict[inventory[indice-1]]+">" ;
      indice++;
    }
}


function OKclicked(r){
  /*
  fonction appelée lorsqu'un objet au comportement "ok" est cliqué
  on supprime alors tous les objets sauf :
    l'objet actif pour donner un accès à l'indice
    le ou les objets à rechercher
  */

  // on supprime tous les marqueurs présents sur la map
  for (var [zoomMin,layerZoom] of zoomLayerGroup) {
    layerZoom.clearLayers();
  }

  // on met en place tous les marqueurs débloqués
  var objetsDebloques = r.bloque.split(",");
  objetsDebloques.forEach(id => { displayMarker(id); });
}


function inventoryClicked(r,marker) {
  /*
  inventaire cliqué, il faut mettre à jour l'inventaire
  et suppimer ce marqueur
  */
  inventory.push(r.id); // on l'ajoute dans le tableau inventaire
  dict[r.id] = r.icone; // et on ajoute son icone au dictionnaire
  // suppression du marqueur de la carte
  zoomLayerGroup.get(parseInt(r.zoom)).removeLayer(marker);
}


function remove_inventory(list){
  /*
  permet de supprimer une liste d'objets de l'inventaire
  */
  for( var j = 0; j < list.length; j++){
    for( var i = 0; i < inventory.length; i++){
      if ( inventory[i] == list[j]) {
        inventory.splice(i, 1);
      }
    }
  }
}


function blockedByInventoryClicked(r,marker){
  /*
  Traite le cas où un objet est bloqué par un ou plusieurs objets de type "inventory"
  on veut vérifier si on a bien tous les objets, puis faire l'action correspondante
  */

  // on cherche à savoir si on a tous les objets demandés dans l'inventaire
  // on passe par la variable inventoryContainsAllIds (1=true, 0=false)
  var inventoryContainsAllIds = 1;
  // on va comparer les ids dans l'inventaire et les ids nécessaires au déblocage
  var idToUnlock = r.bloquePar.split(",");
  idToUnlock.forEach(id => {
    if (! inventory.includes(parseInt(id))) {inventoryContainsAllIds *= 0;}
    // si un id demandé n'est pas dans l'inventaire, on passe la variable binaire à 0
  });

  // on sait maintenant si l'objet peut être débloqué ou non
  if (inventoryContainsAllIds == 1) { // si l'objet est débloqué

    for (var [zoomMin,layerZoom] of zoomLayerGroup) {
      layerZoom.clearLayers(); // on supprime tous les objets
    }

    // on supprime tous les objets ayant débloqué l'objet de l'inventaire
    remove_inventory(idToUnlock);
    clear_inventory();

    // puis on met en place tous les objets débloqués
    var objetsDebloques = r.bloque.split(",");
    objetsDebloques.forEach(id => { displayMarker(id); });

  } else { // si l'objet n'est pas débloqué
    // L'indice est déjà affiché dans une popup
    // cliquer sur le bouton OK permet seulement de fermer la popup
    var ok = document.getElementById('OKsubmit' + r.id.toString());
    ok.addEventListener('click', function() { marker.closePopup(); });
  }
}

function blockedByPasswordClicked(r,marker) {
  /*
  si un objet bloqué par un mdp est cliqué,
  on attend d'avoir le bon mot de passe pour passre à la suite,
  */
  var proposition = document.getElementById("proposition" + r.id.toString());
  // on ajoute un addEventListener sur l'input

  proposition.addEventListener("input",function() {
    // Si le code est le bon on passe à la suite (idem OKclicked)
    if (proposition.value.toLowerCase() == r.bloquePar) {

      for (var [zoomMin,layerZoom] of zoomLayerGroup) {
        layerZoom.clearLayers(); // on supprime tous les objets
      }

      var objetsDebloques = r.bloque.split(","); // on met en place les objets débloqués
      objetsDebloques.forEach(id => { displayMarker(id); });
    }
  })

  // cliquer sur le bouton OK permet seulement de fermer la popup
  var ok = document.getElementById('OKsubmit' + r.id.toString());
  ok.addEventListener('click', function() { marker.closePopup(); });
}


function BDDClicked(r) {
  /*
  L'objet cliqué est géré par une base de donnée composée d'un mot clé et d'une réponse associée,
  on envoie donc une requete SQL à a BDD corresponde (le nom de la table étant dans r.behaviour)
  On envoie donc une requete AJAX
  */
  var ok = document.getElementById('OKsubmit' + r.id.toString()); // récup de l'objet ok
  var input = document.getElementById('input'); // récupération de l'objet input
  var reponse = document.getElementById("reponse"); // récupération de l'objet réponse
  ok.addEventListener('click', function() { // on envoie la requete lsq ok est cliqué
    input_txt = input.value.toLowerCase(); // on récupère le texte envoyé
    var data = new FormData(); // requete AJAX
    data.append('input',input_txt); // on donne comme argument l'input
    data.append('table',r.behaviour); // et le nom de la table
    fetch('requeteBDDClicked.php', {
      method: 'post',
      body: data
    }) // résultat
    .then(retour => retour.json())
    .then(retour => {
      reponse.innerText = retour.cle + " : " + retour.reponse;
    })
    .catch(error => {
      reponse.innerText = "Désolé, je ne connais pas ceci !";
    })
  });
}

function endOfTheGame(r) {
  /*
  Fin du jeu :
  on compte les points,
  on met à jour la abse de donnée,
  on renvoie vers la page de fin
  */
  var ok = document.getElementById('OKsubmit' + r.id.toString()); // récup de l'objet ok
  ok.addEventListener('click', function() {
    let timeLayout = TimeLayout(Date.now()-startPage).split(":");
    let timeSec = parseInt(timeLayout[0])*60 + parseInt(timeLayout[1])

    // score : le score du joueur est calculé comme suit :
    let score = 3600-timeSec;

    // on va mettre à jour la BDD pour enregistrer le score et le pseudo
    var data = new FormData();
    data.append('score',score);
    data.append('pseudo',pseudo);
    fetch('MAJ_HoF.php', {
      method: 'post',
      body: data
    })
    .then(r => r.text())
    .then(r => {
      post("index.php",{score: score,pseudo: pseudo});
    })
  })
}


function post(path, params, method='post') {
  /*
  fonction permettant de poster des paramètres vers la page souhaitée
  source : https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
  */
  const form = document.createElement('form');
  form.method = method;
  form.action = path;
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}



function TimeLayout(ms){
  //permet de calculer et d'écrire un temps en millisecondes en format minute:secondes

  var  heures =Math.floor( (ms /(1000*60*60))%24);
  var minutes =Math.floor((ms/( 60000))%60);
  var  secondes = Math.floor((ms/1000)%60);
  if (secondes<10){  return   `${minutes}:0${secondes}`;}
  else {return   `${minutes}:${secondes}`;}
  }


setTimeout(function(){},1000);

function loop(){// fonction de récupération de l'heure + affichage sur la page html
  let nowPage = Date.now();
  document.getElementById("compteur").innerText = TimeLayout(nowPage-startPage);
  setTimeout(loop,1000);}
loop();
