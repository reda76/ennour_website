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

## ⚠ À confirmer avant mise en production

La page est complète et cohérente, mais **elle affiche aujourd’hui 18 mentions
« à confirmer »**. Elles disparaissent d’elles-mêmes dès que les données sont
renseignées : aucune retouche de code ni de style n’est nécessaire.

Tout se passe dans **`src/data/contenu.js`**.

| # | Donnée | Où exactement | État actuel | Effet une fois renseigné |
|---|---|---|---|---|
| 1 | **Tarifs des 4 formules** | `FORMULES[].prix` | `null` | Le montant s’affiche formaté en euros à la place de la pastille. Mettre un **nombre** (`180`, pas `'180 €'`). Ajuster ou vider `prixNote` (aujourd’hui « Tarif à confirmer ») : il devient le qualificatif sous le montant. |
| 2 | **Téléphone** | `ORG.tel` **et** `ORG.telHref` | `'__TEL_A_CONFIRMER__'` / `'tel:+33000000000'` (factice) | Les liens `tel:` s’activent dans le pied de page, la section Contact et l’encart Inscription. **Renseigner les deux ensemble** : tant que `tel` porte le marqueur, aucun lien n’est posé — c’est volontaire, pour ne pas envoyer les gens appeler dans le vide. |
| 3 | **E-mail** | `ORG.email` | `'__EMAIL_A_CONFIRMER__'` | Les liens `mailto:` s’activent aux trois mêmes endroits. |
| 4 | **Adresse postale** | `ORG.adresse` | `'__ADRESSE_A_CONFIRMER__, 76600 Le Havre'` | Remplacer le marqueur par la rue et le numéro. La partie déjà connue (« 76600 Le Havre ») est affichée en attendant. |
| 5 | **Jours du cours de Fiqh** | `CRENEAUX` → entrée `id: 'fiqh-n1'`, champ `jours` | `[]` | Le créneau quitte le bloc « En attente de programmation » et rejoint la grille de la semaine. Valeurs attendues : celles de `JOURS_SEMAINE`. |
| 6 | **Dates du calendrier scolaire** | `CALENDRIER[].debut` / `.fin` | 9 entrées, **non recalées sur le calendrier officiel zone B** | À vérifier une par une. Format ISO strict `AAAA-MM-JJ`. `fin: null` = jalon d’un seul jour. La frise, le registre et le bloc « prochaine rentrée » se recalculent seuls. |
| 7 | **Horaires du secrétariat** | `MENTION_SECRETARIAT` | libellé d’attente | Remplacer par les horaires réels (section Contact). |
| 8 | **Mentions légales** | `PIED.mentionsLegales.url` | `null` | Page à rédiger puis à publier. Tant que l’URL est nulle, le colophon affiche une pastille « à publier » au lieu d’un lien mort. |
| 9 | **Créneaux enfants et adolescents** | `CRENEAUX` | aucun — les 6 entrées portent `public: 'Adultes'` | **Le point le plus urgent.** La mission affiche « accessibles à tous à partir de 6 ans » ; sans créneau enfants, cette phrase envoie des parents chercher au planning des horaires qui n’y sont pas. En attendant, le premier écran accole une réserve (`HERO.mission.reserve`). Ajouter les créneaux la rend caduque — la supprimer alors. |
| 10 | **Photographies du lieu** | aucune | le site n’en utilise pas | La photo transmise ne l’avait été que comme référence de couleur : elle a servi à relever la palette puis a été retirée. Le premier écran s’appuie sur un portail dessiné. Pour en ajouter : déposer dans `public/photos/`, 1600 px de large minimum, et déclarer un export `PHOTOS` dans `contenu.js` — **chemins via `import.meta.env.BASE_URL`**, sinon ils cassent sur le sous-chemin de déploiement. |

### Points éditoriaux à trancher (pas des données manquantes)

| Sujet | Où | Question |
|---|---|---|
| **Mixité du Fiqh** | `CRENEAUX` → `fiqh-n1`, `genre: 'Mixte'` | Tous les autres groupes sont séparés hommes / femmes. Le Fiqh est-il réellement mixte ? `COURS_INTRO.mentionMixite` **et** `HERO.chapo` sont formulés pour rester exacts dans les deux cas (« sauf mention contraire au planning »). Si le Fiqh n’est pas mixte, corriger `genre` — les deux textes peuvent alors être resserrés. |
| **Publics « Ados » / « Enfants »** | `PUBLICS` | Aucun créneau ne les utilise. L’interface ne les propose donc **plus du tout** : les filtres du planning et le formulaire lisent `PUBLICS_OUVERTS`, déduit de `CRENEAUX`. `PUBLICS` reste la liste de référence. Pour ouvrir réellement ces publics, il faut leur **ajouter des créneaux** — la liste se remplira seule. |
| **Ce qui a été retiré sur demande** | `POLES`, `FORMULES`, `TARIFS_MENTION` | La mosquée a demandé de **rester humble**. Ont été supprimés : les trois paragraphes `description` des pôles, « Suivi individuel », « Petits effectifs », « Supports fournis », et le bloc « tarif famille » (une réduction « à l’étude » que personne n’avait confirmée). Le modèle fourni mentionnait « des professeurs qualifiés » — **retiré expressément**. Ne rien réintroduire sans validation. |
| **Texte sur les examens** | `CALENDRIER_TEXTES.examensTexte` | Déduit de `POLES.sciences` (« évaluations trimestrielles »). À faire relire par l’équipe pédagogique. |
| **Acteurs des étapes** | `ACTEURS_ETAPES` | « Vous » / « L’équipe pédagogique » : lecture faite à partir de `ETAPES_INSCRIPTION`, à valider. |
| **Chapô du hero** | `HERO.chapo` | Il nomme les trois pôles **en prose**. Si un pôle est renommé dans `POLES`, ce texte est à reprendre à la main. |

### Branchements techniques restants

1. **Le formulaire d’inscription n’envoie rien.** Un unique `TODO` explicite dans
   `soumettre()` de `src/components/Inscription.jsx` marque l’emplacement de
   l’appel réseau et de la redirection HelloAsso. Tant que rien n’est branché,
   le bouton s’appelle « **Vérifier ma demande** » (pas « Envoyer ») et
   l’interface propose de copier un récapitulatif : c’est le seul état honnête
   possible. À la mise en service : brancher l’appel, renommer le bouton, et
   supprimer `MENTION_ENVOI_INDISPONIBLE`.
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
