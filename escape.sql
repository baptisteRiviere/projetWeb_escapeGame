-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 27 nov. 2021 à 16:50
-- Version du serveur :  5.7.24
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `escape`
--

-- --------------------------------------------------------

--
-- Structure de la table `halloffame`
--

CREATE TABLE `halloffame` (
  `score` int(11) NOT NULL,
  `nom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `halloffame`
--

INSERT INTO `halloffame` (`score`, `nom`) VALUES
(12, 'Jean Bdebois'),
(250, 'Justin Peumeilleur'),
(950, 'Lucie de SaufSurLaFin'),
(1600, 'Sophie Sticket');

-- --------------------------------------------------------

--
-- Structure de la table `objets`
--

CREATE TABLE `objets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(19) DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `zoom` int(4) DEFAULT NULL,
  `icone` varchar(20) DEFAULT NULL,
  `bloque` varchar(29) DEFAULT NULL,
  `bloquePar` text,
  `indice` varchar(3000) DEFAULT NULL,
  `behaviour` text,
  `openPopup` tinyint(1) NOT NULL DEFAULT '0',
  `taille_largeur` int(11) DEFAULT NULL,
  `taille_hauteur` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `objets`
--

INSERT INTO `objets` (`id`, `nom`, `longitude`, `latitude`, `zoom`, `icone`, `bloque`, `bloquePar`, `indice`, `behaviour`, `openPopup`, `taille_largeur`, `taille_hauteur`) VALUES
(1, 'Ilona', 5.79614, 44.0518, 18, 'ilona.png', '2,3', NULL, '<p>Ah te voilà, c\'est pas trop tôt !</p>\r\n<p>Tancrède a pris un cul sec de Bardouin pur, il est ko</p>\r\n<p>Tu es prêt à le remplacer ce soir ?</p>', 'OK', 2, 38, 95),
(2, 'Ilona', 5.79614, 44.0518, 18, 'ilona.png', '5', '4', '<p>Va voir Pageot au centre IGN à Forcalquier, c\'est à quelques km au sud d\'ici</p> <p>Il te dira où est son barbecue, ramène le ici !</p>', 'blockedByInventory', 1, 38, 95),
(3, 'Pageot', 5.77387, 43.9626, 17, 'pageot.png', '2,4', '', '<p>J’ai laissé mon BBQ à la citadelle, va le chercher</p>', 'OK', 0, 38, 95),
(4, 'BBQ', 5.78185, 43.9571, 17, 'BBQ.png', '', NULL, '', 'inventory', 0, 95, 38),
(5, 'Ilona', 5.79614, 44.0518, 18, 'ilona.png', '6,7,8,9,10', NULL, '<p>Merci ! Je te mets respo bar pendant une heure ! Dépêche toi Antoine t\'attend déjà</p>', 'OK', 2, 38, 95),
(6, 'Antoine', 5.79676, 44.0522, 18, 'antoine.png', '11', '8,9', '<p>Salut BG! Tu me fais un petit B52 ? Si tu ne sais pas ce qu’il y a dedans va voir le grand sage des cocktails au 7 boulevard Archimède sur le campus à Champs</p>', 'blockedByInventory', 2, 38, 95),
(7, 'Cointreau', -0.568136, 47.4838, 13, 'cointreau.png', '', NULL, '', 'inventory', 0, 38, 95),
(8, 'Bailey\'s', -6.25943, 53.3422, 12, 'bailey.png', '', NULL, '', 'inventory', 0, 38, 95),
(9, 'Liqueur de café', -76.8019, 18.0266, 9, 'cafe.png', '', NULL, '', 'inventory', 0, 38, 95),
(10, 'Elliot', 2.58434, 48.8439, 16, 'elliot.png', NULL, NULL, '<p>Salut ! t\'es pas à Forca toi ?</p>\r\n<p>Ca ne fait rien, je suis Elliot, le grand maître des alcools ENSGiens</p>\r\n<p>Donne moi un cocktail je te donne sa composition,</p>\r\n<p>donne moi un alcool et je te donne son origine,</p>\r\n<p>donne moi une personne et je te donne ses goûts.</p>\r\n<p>Essaye : je connais (presque) tout !</p>\r\n\r\n<input type=\"text\" name=\"input\" id=\"input\">\r\n\r\n<p id=\"reponse\"></p>', 'tableElliot', 0, 95, 38),
(11, 'Antoine', 5.79676, 44.0522, 18, 'antoine.png', '12', NULL, '<p>J\'avais oublié de te dire que je ne voulais pas de Cointreau dans mon B52, mais sinon c\'est top, merci ! </p> <p>Il y a Félix qui veut te parler je crois</p>', 'OK', 1, 38, 95),
(12, 'Felix', 5.79694, 44.0521, 18, 'felix.png', '13', NULL, '<p>Aaaaah là avec Vincent on est bien !</p>', 'OK', 2, 38, 95),
(13, 'Vincent', 5.79694, 44.0521, 18, 'vincent.png', '14,15', NULL, '<p>ah ouais on est bien là</p>', 'OK', 1, 38, 95),
(14, 'Felix', 5.79694, 44.0521, 18, 'felix.png', '20', 'la kiffance', '<p>juste, je suis respo son là... et on oublié le nom de la chanson qu\'on voulait mettre pour ambiancer tout le monde…</p> <p> mais on sait qu\'elle est chantée par un rappeur qui vit à Air-Bel, dans le 11e arrondissement à l\'Est de Marseille… va lui demander si t’as le temps !</p>', 'blockedByPassword', 1, 38, 95),
(15, 'Naps', 5.43211, 43.2894, 13, 'naps.png', '16,14', NULL, '<p>Une chanson ? Ok je veux bien mais il va falloir me suivre…</p>', 'OK', 0, 38, 95),
(16, 'Naps', 5.43211, 43.2894, 13, 'naps.png', '17,14', NULL, '<p>VOYAGEEEEEER, jusqu’au NIRVANAAA</p>\r\n<p>PS, Le saviez-vous ? Nirvana est un groupe de grunge américain, originaire d\'Aberdeen, dans l\'État de Washington</p>', 'OK', 1, 38, 95),
(17, 'Naps', -123.806, 46.9842, 14, 'naps.png', '18,14', NULL, '<p>Hotel 5 étoiles, prendre le ptit dej en pyjama,</p>\r\n<p>faire un ptit pétou sur le mont Fujiyama!</p>', 'OK', 0, 38, 95),
(18, 'Naps', 138.73, 35.3626, 13, 'naps.png', '19,14', NULL, '<p>Faire le tour d’la Thaïlande en 500 Yamaha</p><p> RDV à Bangkok mon petit</p>', 'OK', 0, 38, 95),
(19, 'Naps', 100.493, 13.7548, 10, 'naps.png', '19,14', NULL, '<p>C’est \'la kiffance\', c’est \'la kiffance\'</p>', 'OK', 0, 38, 95),
(20, 'Vincent', 5.79694, 44.0521, 18, 'vincent.png', '21', NULL, '<p>Ah merci mec, Félix il va pouvoir faire danser les minettes</p>', 'OK', 1, 38, 95),
(21, 'Ilona', 5.79614, 44.0518, 18, 'ilona.png', '22', NULL, '<p>Ne les écoute pas ils sont totalement bourrés</p> <p>Merci pour le coup de main de cette soirée, pendant ce temps là on a cherché Louis, il s\'est perdu dans les champs... introuvable...</p>', 'OK', 2, 38, 95),
(22, 'Ilona', 5.79614, 44.0518, 18, 'ilona.png', NULL, NULL, '<p>Boh on le trouvera bien demain, allez va te coucher ! Encore merci !</p>', 'endOfTheGame', 1, 38, 95);

-- --------------------------------------------------------

--
-- Structure de la table `tableelliot`
--

CREATE TABLE `tableelliot` (
  `cle` text NOT NULL,
  `reponse` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tableelliot`
--

INSERT INTO `tableelliot` (`cle`, `reponse`) VALUES
('b52', 'nooon, tu connais pas le B52 ? C\'est du cointreau, de la liqueur de café et du baileys !'),
('cointreau', 'C\'est un spiritueux à base d\'écorces d\'oranges douces et amères, et plus spécifiquement une liqueur triple sec. Créée à Angers en 1849 par Édouard Cointreau, la marque appartient depuis 1989 à la société Cointreau filiale de Rémy Cointreau.'),
('baileys', 'Baileys Irish Cream est une liqueur à base de whiskey irlandais et de crème, fabriquée par la société R. A. Bailey & Co. de Dublin, actuellement détenue par le groupe britannique Diageo. Sa teneur en alcool est de 17 %'),
('liqueur de cafe', 'La liqueur de café est une liqueur à base de café, de sucre et d\'eau-de-vie, pouvant être consommée telle quelle, mais aussi utilisée comme ingrédient de dessert ou de cocktail. Elle serait apparue en Jamaïque au XVII e siècle'),
('antoine', 'Antoine ? Surtout pas de Cointreau dans son B52, il n\'aime pas ça'),
('suze bull', 'C\'est de la suze, du red Bull et un super jeu de mot'),
('bapteme', 'de l\'absinthe, de la chartreuse et du cointreau... bon courage'),
('kiss cool', 'de la vodka, du get 31 et du curucao, c\'est du bleu en gros'),
('bleu', 'de la vodka, du get 31 et du curucao, on appelle ça un kiss cool'),
('shrek', 'moitié baileys - moitié jet 27, c\'est un délice'),
('veuve noire', '4 doses de vodka, 2 doses de cointreau, 2 doses de jus de citron et 2 doses de jus de cramberry'),
('passion piquante', '3 doses de rhum\r\n5 doses de jus de passion \r\n1 dose de canne à sucre\r\ndu tabasco (le piquant quoi)'),
('cervelle', 'Sous ce joli nom se cachent de la vodka, de la grenadine et du baileys'),
('baise brulant', 'prendre 3 alcools aléatoires et les arroser de tabasco'),
('RVB', 'C\'est du rouge, du vert et du bleu évidemment'),
('rouge', 'Aussi appelé tequila sunrise, on y trouve de la tequila, du jus d\'orange et on finit par de la grenadine'),
('tequila sunrise', 'On y trouve de la tequila, du jus d\'orange et on finit par de la grenadine'),
('vert', 'C\'est un bapteme, on y met de l\'absinthe, de la cartreuse et du cointreau'),
('juliette', 'Vodka - limonade - sirop de violette\r\nC\'est si bon... tout le monde en raffole '),
('gin tonic', 'tout simple, du gin et du schweppes'),
('jager bomb', 'une dose de jager pour 4 doses de red Bull'),
('vodkapple', 'sirop de grenadine, vodka, jus de pomme : miam'),
('suze', 'La Suze est une marque commerciale française qui appartient au groupe français Pernod Ricard. La Suze est une liqueur de gentiane apéritive amère de couleur dorée à base de gentianes jaunes'),
('absinthe', 'L\'absinthe est un ensemble de spiritueux à base de plantes d\'absinthe, également appelé « fée verte » ou encore « bleue ». La fabrication, la vente et la consommation de l\'absinthe étaient interdites en Suisse de 1910 à 2005 et en France de 1915 à 1988.'),
('chartreuse', 'La Chartreuse est une liqueur fabriquée à la distillerie d\'Aiguenoire à Entre-deux-Guiers en Isère, en plein cœur du Massif de la Chartreuse, sous la supervision des moines de la Grande-Chartreuse. Liqueur à très haut degré d\'alcool, sa vente est la principale ressource financière des chartreux'),
('vodka', 'La vodka est une boisson alcoolisée incolore titrant environ 40 degrés. La vodka peut être issue de la transformation de quantités de produits agricoles'),
('get 27', 'Get 27 est une marque de liqueur française à la menthe appartenant à Bacardí-Martini. La société productrice a été créée à la fin du xviiie siècle à Revel (Haute-Garonne) et commercialise également le Get 31.'),
('get 31', 'Get 27 est une marque de liqueur française à la menthe appartenant à Bacardí-Martini. La société productrice a été créée à la fin du xviiie siècle à Revel (Haute-Garonne) et commercialise également le Get 31.'),
('curucao', 'Le curaçao est une liqueur d\'orange titrant entre 20° et 40°, utilisée pour confectionner de nombreux cocktails. Son nom a pour origine l\'île de Curaçao, île des Antilles néerlandaises.'),
('rhum', 'Le rhum est une eau-de-vie originaire des Amériques, produite soit par distillation de sous-produits fermentés de l\'industrie sucrière ou mélasse : le rhum industriel ou traditionnel, soit à partir du jus de canne à sucre fermenté : le rhum agricole'),
('tequila', 'La (ou le) tequila, ou téquila, est une boisson alcoolisée produite au Mexique à partir d\'une plante nommée Agave tequilana'),
('gin', 'Le gin est une boisson spiritueuse obtenue en aromatisant de l\'alcool éthylique d\'origine agricole avec principalement des baies de genévrier. Il est assez proche de son ancêtre le genièvre, qui est une boisson traditionnelle dans tous les anciens Pays-Bas'),
('ti punch', 'Le ti-punch ou ti-ponch est un cocktail à base de rhum, de citron vert, et de sirop de batterie, de sucre roux de canne, ou sirop de canne à sucre'),
('punch', 'Le punch, ou ponch traditionnellement appelé planteur dans les Antilles françaises, est un cocktail contenant la plupart du temps des fruits en morceaux et le jus de ces fruits. La recette connait plusieurs variantes, alcoolisées ou non, certaines associées aux noms de personnes célèbres'),
('Baptiste', 'Il adore les coktails avec du Baileys, et surtout le shrek ! Mais ne cherche pas à le saouler, il tient trop bien l\'alcool'),
('Léa', 'Elue meilleure respo bar Moselle 2017 dans sa catégorie plume, elle aime surtout la trostine'),
('trostine', 'Vodka Black, jus de cramberry et jus d\'ananas');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `objets`
--
ALTER TABLE `objets`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `objets`
--
ALTER TABLE `objets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
