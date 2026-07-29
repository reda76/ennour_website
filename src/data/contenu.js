/* ============================================================
   MOSQUÉE EN-NOUR — Source unique de vérité du contenu éditorial.
   Toutes les sections lisent leurs données ici. Les valeurs
   marquées TODO viennent des notes manuscrites et restent à
   confirmer par l'équipe avant mise en prod.

   RÈGLE DE FOND, demandée par la mosquée : on reste humble.
   Aucune promesse de qualification, d'encadrement ou de moyens qui
   ne soit pas vérifiable aujourd'hui. Dans le doute, on retire.
   ============================================================ */

export const ORG = {
  nom: 'Mosquée En-Nour',
  // Tel qu'il figure sur l'enseigne de la façade.
  nomArabe: 'مسجد النور',
  baseline: 'Le Havre',
  ville: 'Le Havre',
  // TODO — à confirmer : adresse postale exacte
  adresse: '__ADRESSE_A_CONFIRMER__, 76600 Le Havre',
  // TODO — à confirmer : téléphone et e-mail officiels
  tel: '__TEL_A_CONFIRMER__',
  telHref: 'tel:+33000000000',
  email: '__EMAIL_A_CONFIRMER__',
  anneeScolaire: '2026 – 2027',
}

/* ---------- Les trois pôles d'enseignement ----------
   Le champ `description` a été RETIRÉ des trois pôles à la demande de la
   mosquée : les paragraphes décrivaient une organisation (groupes par
   niveau, sessions intensives, petits effectifs, supports fournis) qui
   n'est pas arrêtée. Ne pas les réintroduire sans validation.

   Les `points` ont été ramenés à ce que les notes manuscrites établissent :
   des jours, des salles, des publics. Tout le reste était une promesse. */
export const POLES = [
  {
    key: 'coran',
    titre: 'Apprentissage du Noble Coran',
    court: 'Coran',
    accroche: 'Lecture, tajwîd et mémorisation.',
    points: [
      'Groupes séparés hommes et femmes',
      'En semaine ou le week-end',
    ],
  },
  {
    key: 'alphabetisation',
    titre: 'Alphabétisation',
    court: 'Alphabétisation',
    accroche: 'Lire et écrire l’arabe, depuis les toutes premières lettres.',
    points: [
      'Aucun prérequis',
      'Salle dédiée',
      'Une séance par semaine, le week-end',
    ],
  },
  {
    key: 'sciences',
    titre: 'Sciences musulmanes',
    court: 'Sciences musulmanes',
    accroche: 'Jurisprudence (Fiqh) et biographie prophétique (Sîra).',
    points: [
      'Fiqh — niveau 1',
      'Sîra',
    ],
  },
]

/* ---------- Photographies du lieu ----------
   AUCUNE pour le moment. La photo de la façade transmise par la mosquée
   ne l'avait été qu'à titre de RÉFÉRENCE DE COULEUR — elle a servi à
   relever la palette (voir tokens.css) puis a été retirée du site.

   Le premier écran s'appuie donc sur un portail dessiné, insensible à la
   résolution. Le jour où de vraies photos arrivent (salles de cours,
   intérieur, façade en pied, 1600 px de large minimum), les déposer dans
   public/photos/ et déclarer un export PHOTOS ici. Attention : les chemins
   doivent passer par import.meta.env.BASE_URL, sans quoi ils casseront sur
   le sous-chemin de déploiement.                                        */

/* ---------- Planning 2026-2027 ----------
   Transcrit des notes manuscrites de l'équipe.
   `jours` vide = à confirmer.                                */
/* Liste de RÉFÉRENCE de l'association. Elle n'alimente aucune interface :
   les filtres du planning et le formulaire d'inscription lisent
   PUBLICS_OUVERTS (en fin de fichier), déduit des créneaux réels. Proposer
   « Ados » ou « Enfants » tant qu'aucun créneau n'existe pour eux annonce
   une offre inexistante. */
export const PUBLICS = ['Adultes', 'Ados', 'Enfants']

export const CRENEAUX = [
  {
    id: 'coran-h-semaine',
    pole: 'coran',
    intitule: 'Coran — intensif semaine',
    public: 'Adultes',
    genre: 'Hommes',
    debut: '20:00',
    fin: '21:30',
    jours: ['Lundi', 'Mercredi', 'Vendredi'],
    salle: null,
  },
  {
    id: 'coran-h-weekend',
    pole: 'coran',
    intitule: 'Coran — week-end',
    public: 'Adultes',
    genre: 'Hommes',
    debut: '07:00',
    fin: '08:30',
    jours: ['Samedi', 'Dimanche'],
    salle: null,
  },
  {
    id: 'coran-f',
    pole: 'coran',
    intitule: 'Coran',
    public: 'Adultes',
    genre: 'Femmes',
    debut: '14:30',
    fin: '16:00',
    jours: ['Lundi', 'Mardi', 'Jeudi'],
    salle: null,
  },
  {
    id: 'alpha-h',
    pole: 'alphabetisation',
    intitule: 'Alphabétisation',
    public: 'Adultes',
    genre: 'Hommes',
    debut: '16:00',
    fin: '17:00',
    jours: ['Samedi'],
    salle: 'Salle 3',
  },
  {
    id: 'alpha-f',
    pole: 'alphabetisation',
    intitule: 'Alphabétisation',
    public: 'Adultes',
    genre: 'Femmes',
    debut: '16:00',
    fin: '17:00',
    jours: ['Dimanche'],
    salle: 'Salle 4',
  },
  {
    id: 'fiqh-n1',
    pole: 'sciences',
    intitule: 'Fiqh — niveau 1',
    public: 'Adultes',
    genre: 'Mixte',
    debut: '17:00',
    fin: '19:00',
    jours: [], // TODO — jours non précisés sur la note manuscrite
    salle: null,
  },
]

export const JOURS_SEMAINE = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche',
]

export const MENTION_HORAIRES =
  "Les horaires et les salles peuvent être modifiés en cours d’année en fonction des besoins pédagogiques et des effectifs. Toute modification est communiquée aux inscrits."

/* ---------- Formules & tarifs ----------
   TODO — montants à confirmer par le bureau.                 */
export const FORMULES = [
  {
    key: 'coran-intensif',
    nom: 'Coran — intensif',
    rythme: '3 séances par semaine',
    prix: null, // TODO
    prixNote: 'Tarif à confirmer',
    inclus: ['Coran, tajwîd et mémorisation', 'Examens trimestriels'],
    poles: ['coran'],
  },
  {
    key: 'coran-weekend',
    // Trait d'union INSÉCABLE (U+2011) : dans la grille de tarifs à quatre
    // colonnes, « week-end » se coupait sur son trait et cassait la ligne
    // des étagères. Le glyphe est identique à l'œil.
    nom: 'Coran — week‑end',
    rythme: '2 séances le week-end',
    prix: null, // TODO
    prixNote: 'Tarif à confirmer',
    inclus: ['Coran, tajwîd et mémorisation', 'Format adapté aux actifs', 'Examens trimestriels'],
    poles: ['coran'],
  },
  {
    key: 'alphabetisation',
    nom: 'Alphabétisation',
    rythme: '1 séance par semaine',
    prix: null, // TODO
    prixNote: 'Tarif à confirmer',
    inclus: ['Lecture et écriture de l’arabe', 'Aucun prérequis'],
    poles: ['alphabetisation'],
  },
  {
    key: 'sciences',
    nom: 'Sciences musulmanes',
    rythme: '1 séance par semaine',
    prix: null, // TODO
    prixNote: 'Tarif à confirmer',
    inclus: ['Fiqh niveau 1', 'Sîra', 'Examens trimestriels'],
    poles: ['sciences'],
  },
]

/* ---------- Calendrier scolaire ----------
   Zone B (Le Havre / académie de Normandie), année 2026-2027.
   TODO — à recaler sur le calendrier officiel publié.        */
export const CALENDRIER = [
  { key: 'rentree', libelle: 'Rentrée des cours', debut: '2026-09-14', fin: null, type: 'jalon' },
  { key: 'toussaint', libelle: 'Vacances de la Toussaint', debut: '2026-10-17', fin: '2026-11-02', type: 'vacances' },
  { key: 'examen-t1', libelle: 'Examens du 1er trimestre', debut: '2026-12-12', fin: '2026-12-19', type: 'examen' },
  { key: 'noel', libelle: 'Vacances de Noël', debut: '2026-12-19', fin: '2027-01-04', type: 'vacances' },
  { key: 'hiver', libelle: 'Vacances d’hiver', debut: '2027-02-20', fin: '2027-03-08', type: 'vacances' },
  { key: 'examen-t2', libelle: 'Examens du 2e trimestre', debut: '2027-03-13', fin: '2027-03-20', type: 'examen' },
  { key: 'printemps', libelle: 'Vacances de printemps', debut: '2027-04-17', fin: '2027-05-03', type: 'vacances' },
  { key: 'examen-t3', libelle: 'Examens du 3e trimestre', debut: '2027-06-05', fin: '2027-06-12', type: 'examen' },
  { key: 'fin', libelle: 'Fin des cours', debut: '2027-06-26', fin: null, type: 'jalon' },
]

export const MENTION_CALENDRIER =
  'Calendrier aligné sur les vacances scolaires de la zone B. Les dates sont indicatives et confirmées à la rentrée.'

/* ---------- Inscription ---------- */
export const ETAPES_INSCRIPTION = [
  {
    n: 1,
    titre: 'Choisir sa formule',
    texte: "Sélectionnez le pôle et le créneau qui vous conviennent — groupe hommes ou femmes, semaine ou week-end.",
  },
  {
    n: 2,
    titre: 'Remplir le formulaire',
    texte: "Identité, niveau estimé et formule souhaitée. Quelques minutes suffisent.",
  },
  {
    n: 3,
    titre: 'Validation pédagogique',
    texte: "L’équipe pédagogique valide le placement dans le groupe adapté et vous recontacte.",
  },
  {
    n: 4,
    titre: 'Règlement',
    texte: "Paiement en ligne via HelloAsso (sans frais pour l’association) ou sur place.",
  },
]

export const MOYENS_REGLEMENT = [
  { key: 'helloasso', libelle: 'En ligne — HelloAsso', detail: "Carte bancaire, sans frais pour l’association." },
  { key: 'especes', libelle: 'Sur place', detail: 'Espèces ou chèque, au secrétariat.' },
]

/* ---------- Navigation ---------- */
export const SECTIONS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'cours', label: 'Les cours' },
  { id: 'planning', label: 'Planning' },
  { id: 'tarifs', label: 'Formules & tarifs' },
  { id: 'calendrier', label: 'Calendrier' },
  { id: 'inscription', label: 'Inscription' },
  { id: 'contact', label: 'Contact' },
]

/* ---------- Habillage de la section « calendrier » ----------
   Uniquement des libellés : les dates restent dans CALENDRIER.
   Aucun décompte n'est écrit ici (« trois sessions », « neuf repères »)
   pour que le texte reste juste si la liste des dates bouge.        */
export const CALENDRIER_TEXTES = {
  surtitre: 'Calendrier scolaire',
  titre: 'De la rentrée à la fin des cours',
  chapo:
    "Le rythme de l’année en une seule lecture : périodes de cours, vacances scolaires et sessions d’examens.",
  /* « des repères » et non « de la frise » : la frise est aria-hidden et
     masquée sous 760px, la légende ne peut donc pas s'annoncer comme la
     sienne. Elle décrit les marques du registre, qui portent les mêmes formes. */
  legendeTitre: 'Légende des repères',
  registreTitre: 'Toutes les dates de l’année',
  statutAvant: 'Prochaine rentrée',
  statutPendant: 'Aujourd’hui',
  periodeCours: 'Période de cours',
  badgeEnCours: 'En cours',
  vide: 'Calendrier à confirmer',
  datesAConfirmer: 'Dates à confirmer',
  legende: [
    {
      key: 'cours',
      libelle: 'Période de cours',
      detail: 'Les créneaux hebdomadaires ont lieu normalement.',
    },
    {
      key: 'vacances',
      libelle: 'Vacances',
      detail: 'Le centre est fermé, aucun cours n’est assuré.',
    },
    {
      key: 'examen',
      libelle: 'Examens trimestriels',
      detail: 'Une semaine d’évaluations à la fin de chaque trimestre.',
    },
  ],
  examensTitre: 'Les examens trimestriels',
  examensTexte:
    "Une session d’examens clôt chaque trimestre. Elle porte sur ce qui a été étudié depuis la session précédente et sert à confirmer le placement de chacun dans son groupe de niveau.",
}

/* ---------- Section « Planning » — libellés éditoriaux ----------
   Ajoutés pour que la section planning ne code aucun texte en dur.
   Les libellés d'interface (filtres, boutons) restent, eux, dans le
   composant : ce sont des commandes, pas du contenu éditorial.      */
export const PLANNING_INTRO = {
  eyebrow: 'Planning hebdomadaire',
  titre: 'La semaine, heure par heure',
  lead:
    'Voici la semaine type de l’année. Filtrez par pôle, par groupe ou par public pour ne garder que les créneaux qui vous concernent.',
  // Repli quand `salle` vaut null : court sur la carte, développé sous la grille.
  salleCourt: 'Salle à l’inscription',
  salleNote: 'Les salles non précisées sont communiquées à l’inscription.',
  // Repli quand `jours` est vide.
  attenteTitre: 'En attente de programmation',
  attenteTexte:
    'L’horaire de ce cours est arrêté ; les jours de la semaine restent à fixer par l’équipe pédagogique.',
  attenteJours: 'Jours à confirmer',
}

/* ============================================================
   AJOUT — sections « Inscription » et « Contact ».
   ============================================================ */

/* Le marqueur d'une donnée non encore arrêtée, sous ses deux formes :
   la forme encadrée des notes manuscrites (« __TEL_A_CONFIRMER__ ») et
   le simple suffixe « _A_CONFIRMER ». UNE seule définition pour tout le
   site : trois copies divergentes cohabitaient, et le pied de page
   imprimait en clair ce que le formulaire masquait. */
const MARQUEUR_ATTENTE = /__[A-Z0-9_]+__|_A_CONFIRMER/
const MARQUEUR_ATTENTE_G = /__[A-Z0-9_]+__/g

/** Vrai si la valeur n'est pas exploitable telle quelle : absente, vide,
    ou porteuse d'un marqueur d'attente. L'UI ne doit jamais afficher ces
    chaînes brutes — ni un `null` : elle affiche une attente. */
export function estAConfirmer(valeur) {
  return (
    typeof valeur !== 'string' ||
    valeur.trim() === '' ||
    MARQUEUR_ATTENTE.test(valeur)
  )
}

/** Une valeur peut être partiellement connue (« __ADRESSE__, 76600 Le Havre ») :
    on garde ce qui est vrai et on ne signale que ce qui manque. */
export function partieConnue(valeur) {
  if (typeof valeur !== 'string') return ''
  return valeur
    .replace(MARQUEUR_ATTENTE_G, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s,–—-]+|[\s,]+$/g, '')
    .trim()
}

/* Ce que le candidat a besoin de savoir du parcours d'inscription, ce n'est
   pas l'ordre des étapes mais la main qui agit : à l'étape 3 elle passe à
   l'équipe pédagogique, et la demande attend. */
export const ACTEURS_ETAPES = {
  1: 'Vous',
  2: 'Vous',
  3: 'L’équipe pédagogique',
  4: 'Vous',
}

export const NIVEAUX = ['Débutant', 'Intermédiaire', 'Avancé']

export const INTRO_INSCRIPTION = {
  surtitre: 'Inscription',
  titre: 'Demander une place dans un groupe',
  chapo:
    "Vous choisissez votre formule et remplissez le formulaire ; l’équipe pédagogique valide ensuite votre placement dans le groupe adapté, avant tout règlement.",
}

export const INTRO_CONTACT = {
  surtitre: 'Contact',
  titre: 'Nous joindre',
  chapo: 'Une question sur un niveau, un horaire ou une inscription : le secrétariat répond.',
}

export const MENTION_CHAMPS_REQUIS =
  'Tous les champs sont nécessaires, sauf mention contraire.'

export const MENTION_CONSENTEMENT =
  'J’accepte que la Mosquée En-Nour conserve ces informations pour traiter ma demande d’inscription. Elles ne sont ni cédées, ni revendues.'

/* TODO — supprimer cette mention le jour où l'envoi est branché. */
export const MENTION_ENVOI_INDISPONIBLE =
  'L’envoi en ligne n’est pas encore ouvert : rien ne part d’ici pour le moment.'

export const MENTION_DEMANDE_PRETE =
  'Votre demande est complète. Comme l’envoi en ligne n’est pas encore ouvert, copiez le récapitulatif et transmettez-le au secrétariat : l’équipe pédagogique vous recontactera.'

export const MENTION_CARTE =
  'Le plan d’accès sera publié dès que l’adresse exacte sera arrêtée.'

export const MENTION_SECRETARIAT = 'Horaires du secrétariat à confirmer'

/* ---------- Section « Les cours » ----------
   Libellés éditoriaux du bloc des trois pôles. Regroupés ici pour
   qu'aucun texte ne vive en dur dans le composant. */
export const COURS_INTRO = {
  surtitre: 'Les trois pôles',
  titre: 'Ce que l’on apprend ici',
  chapeau:
    "Trois enseignements, du tout premier alphabet jusqu’aux longues sourates.",
  // Information pratique attendue, énoncée une seule fois. Formulée pour rester
  // exacte : un créneau de sciences musulmanes est noté « Mixte » au planning.
  mentionMixite:
    'Sauf mention contraire au planning, les groupes sont séparés hommes et femmes.',
  groupe: 'groupe ouvert',
  groupes: 'groupes ouverts',
  groupesAConfirmer: 'Groupes à confirmer',
  joursAConfirmer: 'Jours à confirmer',
  lienCreneaux: 'Voir les créneaux',
}

/* ---------- Chrome : barre de navigation et pied de page ---------- */

/* Le bouton d'action de la barre. */
export const NAV_CTA = { cible: 'inscription', libelle: 'S’inscrire' }

/* Deux entrées de SECTIONS ne sont pas reprises dans les liens de la barre :
   le logo mène déjà à l'accueil et le bouton mène déjà à l'inscription.
   Les répéter allongerait la barre sans rien apprendre au lecteur.
   Le menu mobile et le plan du site du pied de page, eux, listent TOUT. */
export const NAV_EXCLUS = ['accueil', 'inscription']

export const PIED = {
  /* Retitré à l'intégration : la section « Contact » qui précède
     immédiatement le pied porte déjà « Contact / Nous joindre ». Deux
     en-têtes identiques bout à bout se lisaient comme une répétition.
     Le pied récapitule, il n'ouvre pas un second contact. */
  titre: 'La mosquée, en bref',
  intro:
    "Le secrétariat répond aux demandes d’inscription et oriente chaque personne vers le groupe adapté à son niveau.",
  statut: 'Association loi 1901',
  // TODO — à confirmer : ligne téléphonique et adresse e-mail du secrétariat.
  contactSecours:
    "Le secrétariat n’a pas encore de ligne dédiée. En attendant, les demandes passent par le formulaire d’inscription en ligne.",
  // TODO — à rédiger puis publier : page de mentions légales (url encore nulle).
  mentionsLegales: { libelle: 'Mentions légales', url: null },
}

/* ---------- Accueil (premier écran) ----------
   Ajout de la passe « hero ». La copie du premier écran est du contenu
   éditorial, pas de la mise en page : elle vit ici pour rester relisible
   par l'équipe sans ouvrir un composant.
   `titre.lumiere` est la ligne qui s'allume en orange — une seule.
   Les libellés de repères accompagnent des valeurs CALCULÉES depuis
   POLES, CRENEAUX et ORG : aucun chiffre n'est écrit ici.             */
export const HERO = {
  /* Le surtitre « Centre de formation — Le Havre » et le titre d'accroche
     « Apprendre, s'élever. » ont été RETIRÉS à la demande de la mosquée.
     Le premier écran ne porte plus de slogan : il porte le nom du lieu,
     sa photo, et ce que la mosquée propose. Le <h1> est désormais
     ORG.nom — ce qui est aussi le titre le plus juste pour la page. */
  mission: {
    surtitre: 'Notre mission',
    /* Texte fourni par la mosquée. La mention « enseignés par des
       professeurs qualifiés » du modèle d'origine a été retirée sur
       demande expresse : elle ne correspond pas à la réalité de
       l'équipe. Ne pas la remettre. */
    texte:
      'La Mosquée En-Nour met à votre disposition des cours d’arabe, de Coran et de sciences musulmanes, accessibles à tous à partir de 6 ans.',
    /* TODO — à lever dès qu'un créneau enfants ou adolescents existe.
       Les six entrées de CRENEAUX portent toutes « Adultes » : sans cette
       réserve, la mention « à partir de 6 ans » ci-dessus enverrait des
       parents chercher au planning des horaires qui n'y sont pas. */
    reserve: 'Créneaux enfants et adolescents à publier',
  },
  /* « sauf mention contraire au planning » n'est pas une précaution de style :
     le créneau « Fiqh — niveau 1 » est noté Mixte dans CRENEAUX. Le premier
     écran ne peut pas promettre ce que le planning dément deux sections
     plus bas. Même formulation que COURS_INTRO.mentionMixite. */
  chapo:
    'Groupes séparés hommes et femmes, sauf mention contraire au planning.',
  ctaPrimaire: { libelle: 'S’inscrire', href: '#inscription' },
  ctaSecondaire: { libelle: 'Voir le planning', href: '#planning' },
  descente: { libelle: 'Les cours', href: '#cours' },
  reperes: {
    poles: 'pôles d’enseignement',
    creneaux: 'créneaux chaque semaine',
    annee: 'année scolaire',
  },
  attente: 'À confirmer',
}

/* ---------- Section « Formules & tarifs » — libellés ----------
   Ajout : uniquement les textes propres à la section. Aucun montant
   ici — les prix vivent dans FORMULES et nulle part ailleurs.       */
export const TARIFS_MENTION = {
  /* Sans point final : c'est le seul titre de section du site qui en portait
     un, et la série des sept .lp-h2 se lit à la verticale de la page. */
  titre: 'Ce que couvre chaque formule',
  // Reformulation directe de l'état des données : tous les `prix` sont à null.
  // La suite est adossée à ETAPES_INSCRIPTION (l'équipe recontacte avant règlement).
  montants:
    "Les montants ne sont pas encore arrêtés. Ils vous sont communiqués par l’équipe au moment de la validation de votre inscription, avant tout règlement.",
  reglementTitre: 'Moyens de règlement',
  /* Le bloc « tarif famille » a été RETIRÉ : il annonçait une réduction
     « à l'étude » que personne n'avait confirmée. Une offre hypothétique
     n'a pas sa place sur une page de tarifs. */
}

/* ============================================================
   AJOUT — passe de correction.
   ============================================================ */

/* Les publics RÉELLEMENT ouverts, déduits du planning.
   PUBLICS reste la liste de référence de l'association ; l'interface, elle,
   ne doit proposer que des publics pour lesquels un créneau existe : les six
   entrées de CRENEAUX portent toutes « Adultes », proposer « Ados » ou
   « Enfants » — au filtre comme au formulaire — annonçait une offre qui
   n'existe pas. Cette liste se remplira d'elle-même le jour où un créneau
   ados ou enfants sera ajouté. */
export const PUBLICS_OUVERTS = [...new Set(CRENEAUX.map((c) => c.public))]

/* ---------- Section « Formules & tarifs » — libellés d'interface ---------- */
export const TARIFS_TEXTES = {
  voirPole: 'Voir le pôle',
  sInscrire: 'S’inscrire',
  ctaInscription: 'Démarrer une inscription',
  annee: 'Année scolaire',
  formulesAConfirmer: 'Formules à confirmer',
  reglementAConfirmer: 'Moyens de règlement à confirmer',
  familleAConfirmer: 'À confirmer',
}

/* ---------- Section « Contact » — libellés des lignes ---------- */
export const CONTACT_LIBELLES = {
  adresse: 'Adresse',
  telephone: 'Téléphone',
  email: 'E-mail',
  secretariat: 'Secrétariat',
  adresseAConfirmer: 'Rue et numéro à confirmer',
  telAConfirmer: 'Numéro à confirmer',
  emailAConfirmer: 'Adresse à confirmer',
  planTitre: 'Emplacement réservé au plan d’accès',
}

/* ---------- Pied de page — libellés des trois blocs ---------- */
export const PIED_LIBELLES = {
  coordonnees: 'Coordonnées',
  adresse: 'Adresse',
  telephone: 'Téléphone',
  email: 'E-mail',
  planDuSite: 'Plan du site',
  horaires: 'Horaires',
  adresseAConfirmer: 'Adresse à confirmer',
  telAConfirmer: 'Téléphone à confirmer',
  emailAConfirmer: 'E-mail à confirmer',
  annee: 'Année scolaire',
  mentionsAPublier: 'à publier',
}

/* ---------- Section « Planning » — libellés d'interface ---------- */
export const PLANNING_UI = {
  annee: 'Année scolaire',
  toutAfficher: 'Tout afficher',
  aucunResultat: 'Aucun créneau ne correspond à cette sélection.',
  aucunResultatAide: 'Retirez un filtre, ou revenez à la semaine complète.',
  aNoter: 'À noter',
  aucunCours: 'Aucun cours',
  cleAvant: 'Le trait situe la séance dans la journée, de',
  cleEntre: 'à',
}
