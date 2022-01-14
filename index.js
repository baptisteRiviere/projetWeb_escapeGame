var form_pseudo = document.getElementById("form_pseudo");
var lapin1 = document.getElementById("lapin1");
var lapin2 = document.getElementById("lapin2");
var divText = document.getElementById("divText");
var bravoText = document.getElementById("bravo").textContent;

var lapin1_HTML_depart = "<p id='textDescr' style='font-size:1.8vw'> Nous avons mis <strong> énormément de temps </strong> à développer ce jeu pour <strong class='allezSVP'>que Victor et Amaury nous mettent un ptit 20</strong> te faire découvrir la vie au BDE qui, tu le verras, est faite de situations totalement délirantes mais (presque) totalement vraies ! </p>";
var lapin1_HTML_fin = "<img src='img/freddie-mercury.gif'>";
var lapin2_HTML_depart = "<p id='textDescr' style='font-size:1.9vw'> Pour te montrer ça on t'emmène à Forca, tu vas rencontrer notre présidente: Ilona, elle te dira quoi faire là bas ! Un dernier petit conseil: Si très vite tu vas, dans le Hall of Fame tu seras </p>";
var lapin2_HTML_fin = "<img src='img/congrats.gif'>";
var base_HTML_depart = "<p id='textDescr' style='font-size:2vw'><strong style='text-decoration: underline;'>Micmac au Bruzet</strong>Bienvenue à toi cher visiteur ! Nous sommes Léa et Baptiste: deux étudiants de l'ENSG géomatique ET membres du BDE de cette même école ! Passe ta souris sur nos lapins pour en savoir plus</p>";
var base_HTML_fin = "<p id='textDescr' style='font-size:2vw'>" + bravoText +"</p>";


var data = new FormData(); // requete AJAX pour obtenir le contenu du hall of fame
fetch('hallOfFame.php', {
  method: 'post',
  body: data
}) // résultat
.then(r => r.json())
.then(r => {
  const divTable = document.getElementById("table");
  var table = document.createElement('table');
  for (let k=0;k<r.length;k++) {
    const tr = table.insertRow();
    for (let j=0;j<2;j++) {
      const td = tr.insertCell();
      if (j==0) {
        td.classList.add("score");
        td.appendChild(document.createTextNode(r[k].score));
      } else {
        td.classList.add("pseudo");
        td.appendChild(document.createTextNode(r[k].nom));
      }
    }
  }
  divTable.appendChild(table);
})




// gestion de l'événement : le formulaire a été soumis
form_pseudo.addEventListener('submit', function() {valider(event)});
// on vérifie que le joueur a bien rentré un pseudo
function valider (event) {
  var champ_nom = form_pseudo.elements["pseudo"];
  // Vétif si champs vide
  if((champ_nom.value == "") || (champ_nom.value == "Entre ton pseudo") || (champ_nom.value =="Veuillez préciser un pseudo")){
      event.preventDefault();
      champ_nom.style.background = "gray";
      champ_nom.value = "Veuillez préciser un pseudo";
    }
  }

// selon si on est au début ou à la fin du jeu, on n'a pas le même comportement de la page
if (bravoText == "debutJeu") { // si on est au début du jeu, on affiche les règles, les conseils de départ
  var base_HTML = base_HTML_depart;
  var lapin1_HTML = lapin1_HTML_depart;
  var lapin2_HTML = lapin2_HTML_depart;
} else { // si on est à la fin du jeu, on félicite le joueur
  var base_HTML = base_HTML_fin;
  var lapin1_HTML = lapin1_HTML_fin;
  var lapin2_HTML = lapin2_HTML_fin;
  divText.innerHTML = base_HTML;
}

lapin1.setAttribute("style", "animation: bounce 0.7s ease infinite;");
lapin2.setAttribute("style", "animation: bounce 0.7s ease infinite;");
// une fois ces variables initialisées correctement selon la situation, on les ajoute au HTML

lapin1.addEventListener('mouseenter', function() { // si on passe sur le lapin1, le texte change
  divText.innerHTML = lapin1_HTML;
  lapin1.removeAttribute("style");
})

lapin2.addEventListener('mouseenter', function() { // de même pour le lapin2
  divText.innerHTML = lapin2_HTML;
  lapin2.removeAttribute("style");
})

// si la souris quitte les images des lapins, on rétablit le texte de base
lapin1.addEventListener("mouseleave", function() {
  divText.innerHTML = base_HTML;
  lapin1.setAttribute("style", "animation: bounce 0.7s ease infinite;");
})
lapin2.addEventListener("mouseleave", function() {
  divText.innerHTML = base_HTML;
  lapin2.setAttribute("style", "animation: bounce 0.7s ease infinite;");
})
