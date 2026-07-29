# Mosquée En-Nour — site vitrine

Site vitrine de la **Mosquée En-Nour** (Le Havre) : cours d’arabe, apprentissage du
Noble Coran et sciences musulmanes (Fiqh, Sîra). Une seule page, sept sections,
contenu piloté par un unique fichier de données.

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
    Cours.jsx                  #cours      — les trois pôles
    Planning.jsx               #planning   — semaine filtrable
    Tarifs.jsx                 #tarifs     — formules et règlement
    Calendrier.jsx             #calendrier — frise + registre de l’année
    Inscription.jsx            #inscription— parcours + formulaire
    Contact.jsx                #contact    — coordonnées
    Footer.jsx                 pied de page (id « pied-de-page »)
    Logo.jsx                   la marque, SVG inline
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
public/favicon.svg
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

## La source : l’affiche 2026-2027

Le contenu de référence est l’**affiche officielle « Inscriptions ouvertes —
Cours adultes 2026-2027 »** fournie par la mosquée. C’est elle qui fait foi :
c’est le document public, daté, tarifé, qui ouvre les inscriptions. Elle est
transcrite dans `contenu.js` (`FORMULES`, `CRENEAUX`, `ORG.tel`,
`FORMULES_CUMULABLES`, `ARGUMENTS`, `PLACES_LIMITEES`, `HERO.annonce`).

Trois pièges de lecture, déjà traités dans les données — **ne pas les défaire** :

1. **« Samedi OU Dimanche »** (formule 3) n’est pas « Samedi et Dimanche ».
   L’élève choisit **un** des deux jours ; c’est ce que porte `auChoix: true`.
   Tout décompte doit compter ces séances pour **une**. Les trois compteurs de
   la page (repère du hero, pied des cartes de cours, en-tête du planning)
   appliquent la même règle et tombent sur les mêmes chiffres — 7 séances dans
   la semaine, dont 5 au Coran et 2 à l’alphabétisation.
2. **La séance du week-end de 7 h à 8 h 30 est une seule séance** qui sert deux
   formules et relève de **deux** pôles. D’où `CRENEAUX[].poles`, un **tableau**.
   Aucun code ne doit lire `creneau.pole` au singulier.
3. **« étalonné »** est une coquille de l’affiche pour « échelonné ».
   `ARGUMENTS` porte la forme correcte ; ne pas recopier la coquille.

Deux consignes de fond, données par la mosquée :

- **Rester humble.** Aucune promesse de qualification, d’encadrement ou de moyens
  qui ne soit pas vérifiable.
- **Adultes uniquement.** « Pour l’instant c’est que pour les adultes, on ne
  communique pas pour les enfants encore. » Aucune mention d’enfant,
  d’adolescent ou d’âge minimum, nulle part — y compris dans la balise
  `<meta name="description">` de `index.html`.

---

## ⚠ À confirmer avant mise en production

La liste a beaucoup maigri : **les tarifs, le téléphone et les jours du Fiqh
sont désormais connus**, l’affiche les donne. Il reste **7 pastilles
« à confirmer »** dans la page, pour 4 données manquantes. Elles disparaissent
d’elles-mêmes dès que les données sont renseignées : aucune retouche de code ni
de style n’est nécessaire.

Tout se passe dans **`src/data/contenu.js`**.

| # | Donnée | Où exactement | État actuel | Effet une fois renseigné |
|---|---|---|---|---|
| 1 | **E-mail** | `ORG.email` | `'__EMAIL_A_CONFIRMER__'` | Les liens `mailto:` s’activent dans le pied de page, la section Contact et l’encart Inscription. Le pied de page cesse alors d’afficher son chemin de secours (`PIED_SECOURS`). L’affiche ne porte aucune adresse : c’est la seule coordonnée encore manquante. |
| 2 | **Adresse postale** | `ORG.adresse` | `'__ADRESSE_A_CONFIRMER__, 76600 Le Havre'` | Remplacer le marqueur par la rue et le numéro. La partie déjà connue (« 76600 Le Havre ») est affichée en attendant. Débloque aussi le plan d’accès (`MENTION_CARTE`). |
| 3 | **Horaires du secrétariat** | `MENTION_SECRETARIAT` | libellé d’attente | Remplacer par les horaires réels (section Contact). |
| 4 | **Mentions légales** | `PIED.mentionsLegales.url` | `null` | Page à rédiger puis à publier. Tant que l’URL est nulle, le colophon affiche une pastille « à publier » au lieu d’un lien mort. |
| 5 | **Dates du calendrier scolaire** | `CALENDRIER[].debut` / `.fin` | 9 entrées, **non recalées sur le calendrier officiel zone B** | À vérifier une par une. Format ISO strict `AAAA-MM-JJ`. `fin: null` = jalon d’un seul jour. La frise, le registre et le bloc « prochaine rentrée » se recalculent seuls. Ces dates n’affichent pas de pastille : elles ont l’air justes, c’est ce qui les rend dangereuses. |
| 6 | **Photographies du lieu** | aucune | le site n’en utilise pas | La photo transmise ne l’avait été que comme référence de couleur : elle a servi à relever la palette puis a été retirée. Le premier écran s’appuie sur un portail dessiné. Pour en ajouter : déposer dans `public/photos/`, 1600 px de large minimum, et déclarer un export `PHOTOS` dans `contenu.js` — **chemins via `import.meta.env.BASE_URL`**, sinon ils cassent sur le sous-chemin de déploiement. |

### Les deux points encore ouverts avec la mosquée

| Sujet | Où | Question |
|---|---|---|
| **Horaires contradictoires** | `CRENEAUX_A_RECONCILIER` | Trois horaires figurent sur la **note manuscrite** de l’équipe et sont **absents de l’affiche**, qui les contredit : l’affiche place l’alphabétisation le week-end de 7 h à 8 h 30, la note la plaçait de 16 h à 17 h en salles 3 et 4 ; la note portait en outre un cours de Coran féminin (lundi, mardi, jeudi, 14 h 30 – 16 h) dont l’affiche ne dit rien. Ils sont conservés pour ne rien perdre et **ne sont JAMAIS rendus** — afficher deux horaires contradictoires pour le même cours est pire que n’en afficher qu’un. **À trancher avec la mosquée**, puis basculer dans `CRENEAUX` ou supprimer. C’est aussi pour cette raison qu’aucune séance ne porte de champ `genre` : la séparation des groupes est énoncée une seule fois, en clair, dans `COURS_INTRO.mentionMixite` et `HERO.chapo`. |
| **Le sigle « AME »** | `ORG.association` (vaut `null`) | L’affiche porte un logo « **AME** » en haut à gauche. **Le nom complet de l’association est inconnu** : ni l’affiche ni les notes ne le développent. Tant qu’il n’est pas confirmé, il n’est écrit nulle part sur le site — on n’invente pas un sigle, et « Association … » avec un mot deviné serait faux sur un document officiel. Une fois le nom obtenu, renseigner `ORG.association` ; il n’est encore lu par aucune section, il faudra décider où le poser (colophon du pied de page, très probablement). |

### Points éditoriaux à trancher (pas des données manquantes)

| Sujet | Où | Question |
|---|---|---|
| **« Enseignement de qualité »** | `ARGUMENTS` → `qualite` | Repris tel quel de l’affiche, mais très proche de « professeurs qualifiés », que la mosquée avait fait retirer au nom de l’humilité. Le retirer coûte une ligne. |
| **Publics « Ados » / « Enfants »** | `PUBLICS` | `PUBLICS` ne contient plus que `'Adultes'`, et l’interface ne propose plus aucun choix de public : le `<select>` du formulaire et le filtre du planning ont été supprimés, un contrôle à une seule option ne demande rien. Pour ouvrir réellement ces publics il faudra **leur ajouter des créneaux** — et rouvrir la question du contrôle, ainsi que celle de la `<meta name="description">`. |
| **Ce qui a été retiré sur demande** | `POLES`, `FORMULES`, `TARIFS_MENTION`, `HERO` | La mosquée a demandé de **rester humble**. Ont été supprimés : les trois paragraphes `description` des pôles, « Suivi individuel », « Petits effectifs », « Supports fournis », le bloc « tarif famille » (une réduction « à l’étude » que personne n’avait confirmée), « des professeurs qualifiés », et « accessibles à tous à partir de 6 ans » avec la réserve qui l’accompagnait. Ne rien réintroduire sans validation écrite. |
| **Redondance de la section Tarifs** | `TARIFS_MENTION.montants`, `FORMULES_CUMULABLES`, `ARGUMENTS` | Le cumul des formules et le paiement échelonné sont dits **trois fois** sur la même section. Le chapô (`TARIFS_MENTION.montants`) est le plus facile à alléger. |
| **Texte sur les examens** | `CALENDRIER_TEXTES.examensTexte` | Rédigé avant l’affiche ; l’affiche ne mentionne aucun examen. À faire relire par l’équipe pédagogique, ou à retirer. |
| **Acteurs des étapes** | `ACTEURS_ETAPES` | « Vous » / « L’équipe pédagogique » : lecture faite à partir de `ETAPES_INSCRIPTION`, à valider. |
| **Étape 1 de l’inscription** | `ETAPES_INSCRIPTION[0].texte` | Écrit « Sélectionnez le pôle et le créneau », alors que le formulaire demande désormais **une ou plusieurs formules**. À reformuler avec la mosquée. |

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
