# Mosquée En-Nour — site vitrine 

Site vitrine de la **Mosquée En-Nour** (Le Havre) : cours d’arabe, apprentissage du
Noble Coran et sciences musulmanes (Fiqh, Sîra). Contenu piloté par un unique fichier de données.

---

## Stack

| | |
|---|---|
| Build | Vite 8 |
| UI | React 19 (composants fonctionnels, JSX) |
| Routage | react-router-dom 7 (une seule route, `/`) |
| Styles | CSS pur, système à tokens — **aucun framework CSS** |
| Typographie | Alegreya (titres) + Alegreya Sans (texte) + Amiri (arabe uniquement), via Google Fonts |

Aucune autre dépendance d’exécution. Ne rien ajouter sans nécessité.

## Commandes

```bash
npm install       # installation
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
npm run preview   # prévisualisation du build
npm run lint      # ESLint sur tout le dépôt
```

`npm run build` et `npm run lint` passent tous les deux sans erreur ni avertissement.

## Arborescence

```
index.html                     favicon + méta + point de montage
src/
  main.jsx                     monte <App/>, importe tokens.css puis site.css
  App.jsx                      BrowserRouter, route "/" → Vitrine
  pages/
    Vitrine.jsx                LA PAGE : ordre des sections, landmarks,
                               et les lignes d’horizon inter-sections
  components/
    Nav.jsx                    barre fixe, menu mobile, progression de lecture
    Hero.jsx                   #accueil    — le seul <h1> : le nom de la mosquée
    Facade.jsx                 bandeau photo pleine largeur, entre accueil
                               et cours ; il y REMPLACE la ligne d’horizon
    Cours.jsx                  #cours      — les trois pôles illustrés
    Planning.jsx               #planning   — semaine filtrable par pôle
                               et par groupe
    Tarifs.jsx                 #tarifs     — trois formules et règlement
    Calendrier.jsx             #calendrier — frise + registre de l’année
    Faq.jsx                    #faq        — 19 questions en trois familles,
                               <details> natifs
    Inscription.jsx            #inscription— parcours + formulaire
    Contact.jsx                #contact    — coordonnées
    Footer.jsx                 pied de page (id « pied-de-page »)
    Logo.jsx                   la marque du site, SVG inline
    ScrollReveal.jsx           révélation au défilement
    illustrations/             Coran.jsx, Alphabetisation.jsx, Sciences.jsx —
                               une plaque dessinée par pôle, choisie par
                               POLES[].illustration. Aucun être vivant.
  hooks/                       useInView, useScrollY, useScrollProgress,
                               useCountUp, useReducedMotion
  data/
    contenu.js                 ★ SOURCE UNIQUE DE VÉRITÉ DU CONTENU
  styles/
    tokens.css                 couleurs, typo, espacements + classes de rôle (.lp-*)
    motifs.css                 lueur, arcade, grain, ligne d’horizon
    site.css                   reset, layout, accessibilité, @import des partials
    sections/*.css             un partial par section, classes préfixées lp-
  assets/                      arcade.svg (tuile de masque)
public/
  favicon.svg
  logos/ame-*.webp|png         logo de l’association, détouré de son fond
                               blanc opaque. Illisible sous 110px, à ne pas
                               poser sur un aplat orange.
  photos/facade-ennour-*.webp  la façade, 1672px de large au maximum —
                               c’est la taille de la source
```

### Règles de contribution

- **Tout texte affiché vient de `src/data/contenu.js`.** Aucun contenu éditorial
  en dur dans un composant.
- Chaque section a **son partial CSS** dans `src/styles/sections/`, importé en tête
  de `site.css`. Classes préfixées `lp-<section>__<élément>`.
- **Aucune valeur hexadécimale** dans les partials : uniquement `var(--token)`.
- Les sections **alternent** les fonds `--bg` / `--surface` dans l’ordre du DOM.
  Déplacer une section dans `Vitrine.jsx` oblige à reprendre son `background`.
- Les `<hr class="lp-horizon">` entre sections sont posés **dans `Vitrine.jsx`
  uniquement**, avec un `--horizon-x` qui change à chaque fois : le point de
  lumière se déplace de haut en bas de la page.
- Une donnée absente s’affiche avec `<span class="lp-attente">…</span>` — jamais un
  trou, jamais `undefined`, jamais un chiffre inventé.

---

## Les sources, et laquelle prime

Trois documents ont été fournis par la mosquée, dans cet ordre. **Le plus
récent prime**, et chacun a corrigé le précédent :

| Source | Ce qu’elle établit |
|---|---|
| Note manuscrite | Premier jet du planning. Examens trimestriels, HelloAsso. |
| **Affiche « Inscriptions ouvertes — Cours adultes 2026-2027 »** | Les trois formules, leurs **tarifs** (300 / 80 / 80 € l’année), le **téléphone**, le cumul des formules, les places limitées. Document public, imprimé, distribué. |
| **Classeur `planning des Salles Ennour.xlsx`** | Six feuilles, une par salle. Les **horaires réels**, les **salles**, les **groupes** hommes/femmes, les **deux niveaux de Fiqh**. |
| **FAQ** (19 questions) | Le déroulement, les modalités de règlement échelonné, la clause d’abandon, les conférences, les groupes WhatsApp. |

### Quatre corrections que le classeur a imposées — ne pas les défaire

1. **L’alphabétisation n’est pas de 7 h à 8 h 30.** Elle est le **dimanche de
   16 h à 17 h**, salle 3 pour les hommes et salle 4 pour les femmes. L’affiche
   ne portait que le créneau du matin, ce qui laissait croire le contraire.
   Il n’y a **pas d’alphabétisation en semaine** : c’est une formule à part.
2. **« Samedi OU Dimanche » n’était pas un choix de jour.** Le Fiqh a **deux
   niveaux** à deux jours fixes : niveau 1 le dimanche (classe nouvelle,
   inscriptions ouvertes), niveau 2 le samedi (anciens élèves uniquement). Le
   champ `auChoix` a disparu du modèle : plus aucun cours n’offre de choix.
3. **La Sîra adultes est le samedi seulement.** Le créneau du dimanche
   après-midi est celui des ados.
4. **Le Coran femmes existe** : lundi, mardi et jeudi de 14 h 30 à 16 h.

`CRENEAUX[].poles` est un **tableau** — la séance du week-end sert deux
formules et relève de deux pôles. Aucun code ne doit lire `creneau.pole` au
singulier. Un créneau peut aussi n’avoir **aucun** pôle (le cours d’arabe du
mercredi) : il n’apparaît alors que dans la semaine non filtrée.

**16 séances par semaine**, et les trois compteurs de la page — repère du
premier écran, pied des cartes de cours, en-tête du planning — appliquent la
même règle et tombent sur le même chiffre.

### Deux consignes de fond, données par la mosquée

- **Rester humble.** Aucune promesse de qualification, d’encadrement ou de
  moyens qui ne soit pas vérifiable.
- **Adultes uniquement.** « Pour l’instant c’est que pour les adultes, on ne
  communique pas pour les enfants encore. » Aucune mention d’enfant,
  d’adolescent ou d’âge minimum, nulle part — y compris dans la balise
  `<meta name="description">` de `index.html`.

---

## ⚠ À confirmer avant mise en production

Trois documents ont successivement réduit cette liste : l’**affiche
2026-2027** (tarifs, téléphone, cumul des formules), le **classeur des
salles** (horaires réels, salles, groupes, niveaux de Fiqh) et la **FAQ**
fournie par la mosquée (19 questions, modalités de règlement).

Tout se passe dans **`src/data/contenu.js`**.

| # | Donnée | Où | État | Effet une fois renseigné |
|---|---|---|---|---|
| ~~1~~ | ~~**Adresse postale**~~ | `ORG.adresse` | **Réglé le 21/08** — `'12 Rue Léon Peulevey, 76620 Le Havre'` | Ligne conservée pour la leçon qu’elle porte : le marqueur affichait `76600` comme « partie connue », et ce code postal était **faux**. Une donnée en attente ne doit pas être pré-remplie sans source. |
| ~~2~~ | ~~**E-mail**~~ | `ORG.email` | **Réglé le 26/08** — `'enseignement@mesjedennour.fr'` | Les lignes e-mail de la section Contact et du pied de page, masquées tant que l’adresse manquait, sont revenues d’elles-mêmes avec leur `mailto:`. |
| ~~3~~ | ~~**Horaires du secrétariat**~~ | — | **Clos le 21/08** — il n’y en a pas | « On n’a pas d’horaires fixes, donc ne le mets pas. » La ligne « Secrétariat » a été retirée de la section Contact, `MENTION_SECRETARIAT` supprimé, et la FAQ ne renvoie plus à des « horaires d’ouverture » inexistants. Ne pas réintroduire une pastille d’attente : la donnée n’arrivera jamais. |
| 4 | **URL de la campagne HelloAsso** | `MOYENS_REGLEMENT` → `helloasso.url` | `null` | Le moyen est nommé mais pas cliquable. |
| ~~5~~ | ~~**Sigle AME**~~ | `ORG.sigle` | **Clos le 21/08** — connu, mais non publié | La mosquée a donné le développement du sigle **et** demandé que le terme « association » n’apparaisse pas sur le site. Le sigle reste donc seul, l’alt du logo se réduit à « AME », et aucune chaîne affichée ne contient ce mot. Ne pas « compléter » l’alt. |
| 6 | **Dates du calendrier** | `CALENDRIER[].debut/.fin` | 4 entrées sur 10 encore `provisoire` | **Vacances réglées le 21/08** : « on se cale sur les vacances scolaires ». Les dates ont été relevées sur le calendrier officiel 2026-2027 de la **zone B** (Le Havre → académie de Normandie) et ne sont plus provisoires. **Restent à confirmer** les trois sessions d’examens et la fin des cours : la mosquée a donné une règle (« dernière semaine à chaque trimestre »), pas des dates. La répartition retenue les place sur la dernière semaine de cours avant Noël, avant les vacances de printemps et avant l’été. |
| 7 | **Mentions légales** | `PIED.mentionsLegales.url` | `null` | Page à rédiger. Tant que l’URL est nulle, le colophon affiche une pastille au lieu d’un lien mort. |

### Les points encore ouverts avec la mosquée

| Sujet | Où | Question |
|---|---|---|
| **L’affiche imprimée est caduque** | — | Elle porte l’ancienne structure (Coran intensif à 300 €, une formule mêlant Coran et alphabétisation) **et** l’ancien numéro de téléphone. Le site suit la rectification du 08/08 : trois formules à 80 €, une par pôle. L’affiche est à refaire avant toute nouvelle distribution. |
| **Séances retirées** | `CRENEAUX` | Les trois séances de la salle 2 — « Fiqh et Coran » le lundi, « Arabe » le mercredi, « Coran et tafsîr » le dimanche — ont été **retirées** le 07/08 : « c’est à part et non officiel ». Le classeur des salles les porte toujours ; il décrit l’occupation des salles, pas l’offre publiée. Ne pas les réintroduire depuis lui. |
| **Barème du dégressif** | `DEGRESSIF.remises` | La règle est connue — « dégressif à partir de la troisième formule » — mais **pas le montant**. `remises` reste vide, et l’interface annonce la remise sans la chiffrer : au-delà de deux formules, aucun total n’est affiché, une somme brute n’étant pas le prix. |
| **Formulaire de contact** | — | La FAQ y renvoie ; le site n’en a pas de distinct. La réponse pointe vers le formulaire d’inscription, qui porte un champ de message libre. |

### Ce qui est volontairement absent

- **Les cours enfants et ados.** Le classeur en compte 35 créneaux. La mosquée
  ne communique pas encore dessus : « pour l’instant c’est que pour les
  adultes ». Aucune mention d’enfant, d’adolescent ni d’âge minimum nulle part,
  y compris dans la méta description et la FAQ.
- **Les noms des enseignants**, qui figurent au classeur. Publier le nom de
  quelqu’un est une décision qui lui appartient.
- **Toute promesse non vérifiable.** Ont été retirés sur demande : les
  descriptions des pôles, « professeurs qualifiés », « petits effectifs »,
  « suivi individuel », « aucun prérequis », et un bloc « tarif famille »
  hypothétique. Ne rien réintroduire sans validation.


### Branchements techniques restants

1. **Le formulaire d’inscription n’envoie rien.** Un unique `TODO` explicite dans
   `soumettre()` de `src/components/Inscription.jsx` marque l’emplacement de
   l’appel réseau et de la redirection HelloAsso. Tant que rien n’est branché,
   le bouton s’appelle « **Vérifier ma demande** » (pas « Envoyer ») et
   l’interface propose de copier un récapitulatif : c’est le seul état honnête
   possible. À la mise en service : brancher l’appel, renommer le bouton, et
   supprimer `MENTION_ENVOI_INDISPONIBLE`.
   Le champ concerné s’appelle désormais `donnees.formules` et c’est un
   **tableau** : les formules étant cumulables, le formulaire propose des cases
   à cocher, pas une liste déroulante. Le récapitulatif liste les formules
   retenues avec leur prix mais **n’en fait pas la somme** : l’affiche ne dit
   rien du tarif d’un cumul, et additionner serait une hypothèse. À trancher
   avec la mosquée avant d’afficher un total.
2. **Aucune campagne HelloAsso** n’a été fournie (URL à insérer au même endroit).
3. **Texte de consentement insuffisant pour le RGPD** :
   `MENTION_CONSENTEMENT` est une formulation de travail — ni durée de
   conservation, ni mention des droits, ni responsable de traitement. À faire
   rédiger avant toute collecte réelle.
4. **Routage.** `App.jsx` déclare la route `/` et une route attrape-tout qui
   redirige vers `/` : une URL mal recopiée ne rend plus un écran vide. Le site
   étant une page unique, aucune 404 légitime n’est masquée. Si un jour de vraies
   pages sont ajoutées, cette redirection est à revoir.
5. **Préfiltre du planning par l’URL.** « Voir les créneaux » (section « Les
   cours ») pose `?pole=<clé>` et émet l’événement `lp:pole` ; `Planning.jsx` lit
   les deux. Une adresse `/?pole=coran` partagée arrive donc sur un planning
   réellement filtré.
