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
  // Relevé sur l'affiche « Inscriptions ouvertes — Cours adultes 2026-2027 ».
  tel: '07 59 55 01 40',
  telHref: 'tel:+33759550140',
  // TODO — à confirmer : adresse e-mail officielle. L'affiche n'en porte pas.
  email: '__EMAIL_A_CONFIRMER__',
  anneeScolaire: '2026 – 2027',
  // TODO — l'affiche porte un logo « AME » : nom exact de l'association à
  // confirmer avant de l'écrire où que ce soit. On n'invente pas un sigle.
  association: null,
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
    /* Clé de l'illustration — voir src/components/illustrations/. */
    illustration: 'coran',
    points: [
      'Lecture du Coran',
      'Tajwîd',
      'Mémorisation et révision',
    ],
  },
  {
    key: 'alphabetisation',
    titre: 'Alphabétisation',
    court: 'Alphabétisation',
    accroche: 'Lire et écrire l’arabe, depuis les toutes premières lettres.',
    illustration: 'alphabetisation',
    /* « Aucun prérequis » a été RETIRÉ : l'affiche liste « Alphabétisation
       arabe » sans énoncer la moindre condition d'entrée. Annoncer qu'il
       n'y en a pas, c'est édicter une règle d'admission à la place de la
       mosquée — au même titre que les « petits effectifs » retirés plus
       haut. À réintroduire seulement si l'équipe le confirme. */
    points: [
      'Alphabétisation arabe',
      'Tous les week-ends',
    ],
  },
  {
    key: 'sciences',
    titre: 'Sciences musulmanes',
    court: 'Sciences musulmanes',
    accroche: 'Jurisprudence (Fiqh) et biographie prophétique (Sîra).',
    illustration: 'sciences',
    points: [
      'Cours de Fiqh',
      'Cours de Sîra',
      'Le week-end, au choix',
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
/* L'offre publiée est EXCLUSIVEMENT adulte : « COURS ADULTES 2026-2027 » sur
   l'affiche, et consigne explicite de la mosquée — on ne communique pas encore
   sur les enfants. Cette liste ne sert donc plus d'inventaire de publics :
   elle documente le seul public ouvert. Ne pas y ajouter « Ados » ou
   « Enfants » avant que la mosquée ne décide de communiquer dessus. */
export const PUBLICS = ['Adultes']

/* ---------- Les séances de la semaine ----------
   Transcrites de l'affiche « Inscriptions ouvertes — Cours adultes 2026-2027 »,
   qui fait foi : c'est le document public, daté, tarifé, qui ouvre les
   inscriptions. Les horaires de la note manuscrite qu'elle ne reprend pas sont
   conservés plus bas, dans CRENEAUX_A_RECONCILIER, et NE SONT PAS AFFICHÉS.

   `auChoix: true` traduit le « Samedi OU Dimanche » de l'affiche : l'élève
   choisit un des deux jours, il ne vient pas aux deux. Le confondre avec un
   « Samedi ET Dimanche » doublerait le nombre de séances annoncées.

   `poles` est un TABLEAU : la séance du week-end sert à la fois le Coran et
   l'alphabétisation (formule 2), une séance peut donc relever de deux pôles.

   AUCUN champ `genre` : l'affiche n'attribue aucune séance à un groupe
   hommes ou femmes. La note manuscrite le faisait, mais ses horaires ne
   concordent pas avec l'affiche — trancher à sa place afficherait un site
   d'apparence masculine, ou inventerait des horaires féminins. La séparation
   des groupes reste énoncée une fois, en clair, dans COURS_INTRO. */
export const CRENEAUX = [
  {
    id: 'coran-semaine',
    poles: ['coran'],
    intitule: 'Coran — en semaine',
    public: 'Adultes',
    debut: '20:00',
    fin: '21:30',
    jours: ['Lundi', 'Mercredi', 'Vendredi'],
    auChoix: false,
    salle: null,
    formules: ['coran-intensif'],
  },
  {
    id: 'coran-weekend',
    poles: ['coran', 'alphabetisation'],
    intitule: 'Coran et alphabétisation — le week-end',
    public: 'Adultes',
    debut: '07:00',
    fin: '08:30',
    jours: ['Samedi', 'Dimanche'],
    auChoix: false,
    salle: null,
    formules: ['coran-intensif', 'coran-alphabetisation'],
  },
  {
    id: 'fiqh',
    poles: ['sciences'],
    intitule: 'Fiqh',
    public: 'Adultes',
    debut: '17:00',
    fin: '19:00',
    jours: ['Samedi', 'Dimanche'],
    auChoix: true,
    salle: null,
    formules: ['sciences'],
  },
  {
    id: 'sira',
    poles: ['sciences'],
    intitule: 'Sîra',
    detail: 'Biographie du Prophète',
    /* La ligature ﷺ (U+FDFA) est séparée du texte : Alegreya Sans ne la
       possède pas, et un caractère isolé en repli système dépareille au
       milieu d'une phrase. Rendue à part, elle peut être posée en Amiri
       (classe .lp-arabe), qui la dessine correctement. */
    salutation: 'ﷺ',
    public: 'Adultes',
    debut: '19:00',
    fin: '21:00',
    jours: ['Samedi', 'Dimanche'],
    auChoix: true,
    salle: null,
    formules: ['sciences'],
  },
]

/* ---------- EN ATTENTE D'ARBITRAGE — ne rien afficher d'ici ----------
   Horaires figurant sur la note manuscrite de l'équipe mais ABSENTS de
   l'affiche 2026-2027. Les deux documents se contredisent : l'affiche place
   l'alphabétisation le week-end de 7h à 8h30 (formule 2), la note la plaçait
   de 16h à 17h en salles 3 et 4, et la note portait un cours de Coran féminin
   dont l'affiche ne dit rien.

   Conservés pour ne rien perdre, JAMAIS rendus : afficher deux horaires
   contradictoires pour le même cours est pire que n'en afficher qu'un.
   À trancher avec la mosquée, puis basculer dans CRENEAUX ou supprimer. */
export const CRENEAUX_A_RECONCILIER = [
  { id: 'coran-f', intitule: 'Coran — groupe femmes', debut: '14:30', fin: '16:00', jours: ['Lundi', 'Mardi', 'Jeudi'], salle: null },
  { id: 'alpha-h', intitule: 'Alphabétisation — groupe hommes', debut: '16:00', fin: '17:00', jours: ['Samedi'], salle: 'Salle 3' },
  { id: 'alpha-f', intitule: 'Alphabétisation — groupe femmes', debut: '16:00', fin: '17:00', jours: ['Dimanche'], salle: 'Salle 4' },
]

export const JOURS_SEMAINE = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche',
]

export const MENTION_HORAIRES =
  "Les horaires et les salles peuvent être modifiés en cours d’année en fonction des besoins pédagogiques et des effectifs. Toute modification est communiquée aux inscrits."

/* ---------- Formules & tarifs ----------
   Transcrites de l'affiche 2026-2027. Les montants ne sont PLUS des `null` :
   ils sont publics, affichés, et engagent la mosquée. Ne les modifier que
   sur la foi d'une nouvelle affiche.

   `seances` reprend mot pour mot le calendrier de chaque formule tel que
   l'affiche le présente. C'est volontairement redondant avec CRENEAUX :
   la section Tarifs répond à « qu'est-ce que je paie », la section Planning
   à « quand je viens ». Les deux lisent des sources distinctes mais
   concordantes — si l'une change, vérifier l'autre.                        */
export const FORMULES = [
  {
    key: 'coran-intensif',
    numero: 1,
    nom: 'Coran intensif',
    rythme: '3 cours par semaine + week-end',
    prix: 300,
    prixNote: null,
    inclus: ['Lecture du Coran', 'Tajwîd', 'Mémorisation', 'Révision'],
    seances: [
      { libelle: 'En semaine', jours: ['Lundi', 'Mercredi', 'Vendredi'], debut: '20:00', fin: '21:30', auChoix: false },
      { libelle: 'Le week-end', jours: ['Samedi', 'Dimanche'], debut: '07:00', fin: '08:30', auChoix: false },
    ],
    poles: ['coran'],
  },
  {
    key: 'coran-alphabetisation',
    numero: 2,
    nom: 'Coran & alphabétisation',
    rythme: 'Tous les week-ends',
    prix: 80,
    prixNote: null,
    inclus: ['Alphabétisation arabe', 'Lecture du Coran', 'Tajwîd', 'Mémorisation'],
    seances: [
      { libelle: 'Le week-end', jours: ['Samedi', 'Dimanche'], debut: '07:00', fin: '08:30', auChoix: false },
    ],
    poles: ['coran', 'alphabetisation'],
  },
  {
    key: 'sciences',
    numero: 3,
    nom: 'Sciences musulmanes',
    sousTitre: 'Sîra & Fiqh',
    rythme: 'Le week-end',
    prix: 80,
    prixNote: null,
    inclus: ['Cours de Sîra', 'Cours de Fiqh'],
    seances: [
      { libelle: 'Cours de Sîra', detail: 'Biographie du Prophète', salutation: 'ﷺ', jours: ['Samedi', 'Dimanche'], debut: '19:00', fin: '21:00', auChoix: true },
      { libelle: 'Cours de Fiqh', jours: ['Samedi', 'Dimanche'], debut: '17:00', fin: '19:00', auChoix: true },
    ],
    poles: ['sciences'],
  },
]

/* La monnaie est affichée par Intl : pas de « € » écrit à la main dans les
   composants, et pas de décimales pour des tarifs ronds. */
export const DEVISE = { locale: 'fr-FR', monnaie: 'EUR' }

/* Règle commerciale majeure de l'affiche, mise en avant sur toute la largeur :
   elle change la façon de lire la grille (on n'y choisit pas UNE ligne). */
export const FORMULES_CUMULABLES = {
  titre: 'Les formules sont cumulables',
  texte: 'Vous pouvez choisir une seule formule ou en combiner plusieurs selon vos objectifs.',
}

/* Les trois arguments du bas de l'affiche.
   NOTE POUR LA MOSQUÉE : « Enseignement de qualité » est repris tel quel de
   votre affiche. C'est proche de la mention « professeurs qualifiés » que
   vous m'aviez demandé de retirer — dites-moi si vous préférez l'ôter ici
   aussi, elle part en une ligne. */
export const ARGUMENTS = [
  { key: 'paiement', libelle: 'Paiement en une fois ou échelonné' },
  { key: 'qualite', libelle: 'Enseignement de qualité' },
  { key: 'ambiance', libelle: 'Ambiance fraternelle et bienveillante' },
]

/* Mention de rareté portée par l'affiche. Factuelle, donc conservée —
   mais à retirer le jour où les groupes ne sont plus contraints. */
export const PLACES_LIMITEES = 'Places limitées'

/* ---------- Calendrier scolaire ----------
   Zone B (Le Havre / académie de Normandie), année 2026-2027.
   TODO — à recaler sur le calendrier officiel publié.

   `provisoire: true` porte ce TODO jusqu'à l'écran : aucune de ces dates
   n'a été confirmée par la mosquée, et une date affichée sans réserve se
   lit comme un engagement — quelqu'un pose ses congés dessus. Le drapeau
   déclenche la réserve en tête de section ; il tombe date par date, à
   mesure que le calendrier officiel les confirme.

   Les trois sessions d'examens ont été RETIRÉES d'ici : voir
   Les sessions d'examens viennent de la note manuscrite de l'équipe
   (« * Examens trimestriels »), pas de l'affiche — qui est une annonce
   d'inscription et n'a pas vocation à porter le calendrier interne. Deux
   sources qui ne se recouvrent pas ne se contredisent pas.               */
export const CALENDRIER = [
  { key: 'rentree', libelle: 'Rentrée des cours', debut: '2026-09-14', fin: null, type: 'jalon', provisoire: true },
  { key: 'toussaint', libelle: 'Vacances de la Toussaint', debut: '2026-10-17', fin: '2026-11-02', type: 'vacances', provisoire: true },
  { key: 'examen-t1', libelle: 'Examens du 1er trimestre', debut: '2026-12-12', fin: '2026-12-19', type: 'examen', provisoire: true },
  { key: 'noel', libelle: 'Vacances de Noël', debut: '2026-12-19', fin: '2027-01-04', type: 'vacances', provisoire: true },
  { key: 'hiver', libelle: 'Vacances d’hiver', debut: '2027-02-20', fin: '2027-03-08', type: 'vacances', provisoire: true },
  { key: 'examen-t2', libelle: 'Examens du 2e trimestre', debut: '2027-03-13', fin: '2027-03-20', type: 'examen', provisoire: true },
  { key: 'printemps', libelle: 'Vacances de printemps', debut: '2027-04-17', fin: '2027-05-03', type: 'vacances', provisoire: true },
  { key: 'examen-t3', libelle: 'Examens du 3e trimestre', debut: '2027-06-05', fin: '2027-06-12', type: 'examen', provisoire: true },
  { key: 'fin', libelle: 'Fin des cours', debut: '2027-06-26', fin: null, type: 'jalon', provisoire: true },
]

export const MENTION_CALENDRIER =
  'Calendrier aligné sur les vacances scolaires de la zone B. Les dates sont indicatives et confirmées à la rentrée.'

/* ---------- Inscription ----------
   Les quatre étapes décrivent ce que le site FAIT, pas une procédure
   souhaitable. Trois corrections de fond :
   — l'étape 1 annonçait un choix de pôle, de créneau et de groupe
     hommes/femmes que le formulaire ne demande pas : il demande une ou
     plusieurs FORMULES, cumulables ;
   — l'étape 3 promettait un « entretien » et une « validation
     pédagogique » que rien n'établit — c'est l'organisation par niveaux
     que la mosquée a fait retirer des descriptions de pôles ;
   — l'étape 4 renvoyait vers une campagne HelloAsso qui n'existe pas.
   À faire valider par la mosquée : c'est du contenu éditorial.       */
export const ETAPES_INSCRIPTION = [
  {
    n: 1,
    titre: 'Choisir ses formules',
    texte: "Cochez une formule, ou plusieurs : l’affiche les annonce cumulables.",
  },
  {
    n: 2,
    titre: 'Remplir le formulaire',
    texte: "Identité, coordonnées et formules souhaitées. Quelques minutes suffisent.",
  },
  {
    n: 3,
    titre: 'Réponse de l’équipe',
    texte: "L’équipe vous recontacte au sujet de votre demande.",
  },
  {
    n: 4,
    titre: 'Règlement',
    texte: "Le règlement se fait sur place, en une fois ou échelonné.",
  },
]

/* Ce que l'affiche établit, et rien d'autre : « Paiement en une fois ou
   étalonné [échelonné] ». L'entrée « HelloAsso » a été RETIRÉE — aucune
   campagne n'a été fournie, aucune URL n'existe, et le formulaire n'envoie
   rien : annoncer un paiement en ligne par carte, c'est promettre un
   parcours qui s'arrête sur un mur. À réintroduire le jour où l'URL est
   fournie, en même temps que la redirection (voir Inscription.jsx). */
/* HelloAsso vient de la note manuscrite de l'équipe (« Hello Asso, pas de
   frais »), l'échelonnement de l'affiche (« Paiement en une fois ou
   étalonné » — coquille pour échelonné). Deux sources distinctes, aucune
   contradiction entre elles.
   TODO — l'URL de la campagne HelloAsso reste à fournir : tant qu'elle est
   nulle, aucun lien n'est posé, seul le moyen est nommé.                  */
export const MOYENS_REGLEMENT = [
  { key: 'helloasso', libelle: 'En ligne — HelloAsso', detail: 'Sans frais pour la mosquée.', url: null },
  { key: 'especes', libelle: 'Sur place', detail: 'Au secrétariat de la mosquée.' },
  { key: 'echelonnement', libelle: 'En une fois ou échelonné', detail: null },
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
  /* Plus de « sessions d'examens » : le chapô annonce ce que la section
     montre, et les examens sont partis avec leurs dates non sourcées. */
  chapo:
    "Le rythme de l’année en une seule lecture : périodes de cours et vacances scolaires.",
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
      /* Le détail se borne à ce que la note manuscrite établit : il y a des
         examens, ils sont trimestriels. La version précédente ajoutait qu'ils
         « servent à confirmer le placement de chacun dans son groupe de
         niveau » — personne ne l'a jamais dit. */
      detail: 'Une session d’évaluations à la fin de chaque trimestre.',
    },
  ],
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

/* « Placement dans le groupe adapté » a été retiré des trois chapôs qui le
   portaient (ici, PIED.intro, INTRO_CONTACT.chapo) : l'affiche ne parle ni
   de niveaux, ni de groupes de niveau, ni de validation préalable, et
   « niveaux » figure dans la liste des promesses que la mosquée a fait
   retirer. Ce qui reste est le seul enchaînement vérifiable : vous
   demandez, l'équipe vous rappelle, on règle ensuite. */
export const INTRO_INSCRIPTION = {
  surtitre: 'Inscription',
  titre: 'Demander une place dans un groupe',
  chapo:
    "Vous choisissez vos formules et remplissez le formulaire ; l’équipe vous recontacte ensuite, avant tout règlement.",
}

export const INTRO_CONTACT = {
  surtitre: 'Contact',
  titre: 'Nous joindre',
  chapo: 'Une question sur une formule, un horaire ou une inscription : le secrétariat répond.',
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
    "Le secrétariat répond aux demandes d’inscription et aux questions sur les cours.",
  /* TODO — à confirmer : forme juridique exacte. « Association loi 1901 »
     était affirmé sans source, sur la ligne la plus officielle de la page,
     alors même que ORG.association reste `null` faute de connaître le nom
     derrière le sigle « AME » de l'affiche. Même règle que pour le sigle :
     on n'affiche rien tant que ce n'est pas établi. Le colophon se rend
     sans cette mention (voir Footer.jsx). */
  statut: null,
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
  /* Le surtitre et le slogan « Apprendre, s'élever. » ont été retirés à la
     demande de la mosquée. Le premier écran porte le nom du lieu, ce qu'il
     propose, et l'annonce d'inscription. */
  mission: {
    surtitre: 'Notre mission',
    /* Texte fourni par la mosquée, DEUX FOIS amendé sur sa demande :
       — « enseignés par des professeurs qualifiés » retiré (rester humble) ;
       — « accessibles à tous à partir de 6 ans » retiré : l'offre publiée est
         exclusivement adulte et la mosquée ne communique pas encore sur les
         enfants. Ne remettre NI l'un NI l'autre sans accord explicite. */
    texte:
      'La Mosquée En-Nour met à votre disposition des cours d’arabe, de Coran et de sciences musulmanes.',
  },
  /* L'affiche ouvre les inscriptions : c'est l'information la plus actionnable
     de la page, elle monte donc dans le premier écran. */
  annonce: {
    titre: 'Inscriptions ouvertes',
    detail: 'Cours adultes 2026 – 2027',
  },
  /* La séparation des groupes vient de la note manuscrite de l'équipe.
     L'affiche n'attribue aucune séance à un groupe : la phrase reste donc
     générale, sans jamais promettre un horaire précis. */
  chapo: 'Les groupes sont séparés hommes et femmes.',
  ctaPrimaire: { libelle: 'S’inscrire', href: '#inscription' },
  ctaSecondaire: { libelle: 'Voir le planning', href: '#planning' },
  descente: { libelle: 'Les cours', href: '#cours' },
  reperes: {
    poles: 'pôles d’enseignement',
    creneaux: 'séances chaque semaine',
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
  // Les tarifs sont désormais publics : plus aucune formule n'est en attente.
  montants:
    "Trois formules pour l’année 2026-2027, cumulables entre elles. Le règlement peut être fait en une fois ou échelonné.",
  reglementTitre: 'Moyens de règlement',
  /* Le bloc « tarif famille » a été RETIRÉ : il annonçait une réduction
     « à l'étude » que personne n'avait confirmée. Une offre hypothétique
     n'a pas sa place sur une page de tarifs. */
}

/* ============================================================
   AJOUT — passe de correction.
   ============================================================ */

/* PUBLICS_OUVERTS a été SUPPRIMÉ à la recouture. Cette liste, déduite de
   CRENEAUX, ne pouvait valoir qu'une chose — ['Adultes'] — et servait deux
   contrôles à option unique : un filtre au planning et un <select> au
   formulaire. Aucun des deux ne demandait quoi que ce soit ; tous deux
   laissaient croire qu'une autre réponse existait, contre la consigne de la
   mosquée (« on ne communique pas pour les enfants encore »).
   Le jour où un créneau non adulte ouvrira, c'est PUBLICS qui reprendra du
   service — et il faudra alors reposer la question du contrôle. */

/* ---------- Section « Formules & tarifs » — libellés d'interface ---------- */
export const TARIFS_TEXTES = {
  voirPole: 'Voir le pôle',
  sInscrire: 'S’inscrire',
  ctaInscription: 'Démarrer une inscription',
  annee: 'Année scolaire',
  formulesAConfirmer: 'Formules à confirmer',
  reglementAConfirmer: 'Moyens de règlement à confirmer',
  /* `familleAConfirmer` supprimé : dernier reste du bloc « tarif famille »,
     une réduction hypothétique que la mosquée avait fait retirer. */
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

/* ---------- Section « Formules & tarifs » — libellés issus de l'affiche ----------
   AJOUT. La refonte de la section sur l'affiche 2026-2027 demandait trois
   mots que le composant aurait dû écrire en dur : le mot « Formule » qui
   précède le numéro, la période du tarif, et les deux liaisons de jours.
   La liaison n'est pas un détail de rédaction : « ou » traduit `auChoix`
   (l'élève vient UN des deux jours), « et » une présence à chaque jour
   listé. Les confondre doublerait l'offre annoncée.

   Aucun chiffre ici : les montants restent dans FORMULES, la monnaie dans
   DEVISE, les horaires dans `seances`.                                    */
export const TARIFS_AFFICHE = {
  formule: 'Formule',
  /* Le tarif est ANNUEL. Afficher « 300 € » seul laisserait croire à un
     tarif mensuel — l'affiche écrit « 300 € L'ANNÉE », on garde la période. */
  parAn: 'l’année',
  programme: 'Au programme',
  seances: 'Les séances',
  ou: 'ou',
  et: 'et',
  /* Redit en clair ce que le « ou » porte déjà : c'est le contresens le
     plus probable d'une grille horaire, il coûte une ligne à écarter. */
  auChoixNote: 'Vous choisissez l’un des deux jours, pas les deux.',
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

/* ---------- Section « Les cours » — décompte du pied de carte ----------
   AJOUT. Le pied annonçait « n groupes ouverts » en comptant les entrées de
   CRENEAUX. Deux raisons de changer d'unité :
   — une entrée de CRENEAUX n'est pas un groupe mais une séance, et depuis
     que les séances ne portent plus de `genre`, le site ne sait tout
     simplement plus combien de groupes ouvrent ;
   — l'affiche, elle, compte des séances (« 3 cours par semaine + week-end »).
   COURS_INTRO.groupe / .groupes ne sont donc plus lus par la section ; ils
   restent en place et redeviendront exacts le jour où les groupes seront
   arrêtés avec l'équipe.                                                  */
export const COURS_TEXTES = {
  seance: 'séance chaque semaine',
  seances: 'séances chaque semaine',
  /* « Samedi OU Dimanche » de l'affiche : l'élève retient UN jour. Les jours
     sont injectés depuis CRENEAUX, mais la ponctuation reste ici — le
     composant n'assemble jamais une phrase française à la main. */
  auChoixGabarit: 'Au choix : {jours}',
  seancesAConfirmer: 'Séances à confirmer',
}

/* ============================================================
   AJOUT — section « Planning », passe « nouveau modèle de données ».
   Rien n'est modifié au-dessus : ces clés s'ajoutent, elles ne
   remplacent rien dans le fichier.
   ============================================================ */

/* PLANNING_INTRO.lead promet un tri « par pôle, par groupe ou par public ».
   Les deux derniers axes n'existent plus : `genre` a disparu du modèle, et
   PUBLICS ne porte qu'une seule valeur — un filtre à une option ne filtre
   rien. Ce lead-ci le remplace DANS la section ; l'ancien reste en place au
   cas où une autre section le lirait. */
export const PLANNING_TEXTES = {
  lead:
    'La semaine type de l’année scolaire. Chaque pôle a sa teinte : sélectionnez-en un pour ne garder que ses séances.',
  filtreLegende: 'Filtrer par pôle',

  /* L'affiche écrit « Samedi OU Dimanche » : l'élève choisit UN des deux
     jours. Poser le cours dans les deux colonnes de la semaine annoncerait
     deux séances au lieu d'une — d'où un bloc à part, qui enjambe les jours
     concernés et dit le choix en toutes lettres. */
  auChoixSurtitre: 'Au choix',
  auChoixLien: 'ou',
  auChoixTexte:
    'Vous choisissez l’un de ces jours à l’inscription : le cours n’a lieu qu’une fois dans la semaine, pas les deux jours.',
  auChoixCourt: 'au choix',

  /* Noms comptables employés par la section. « cours » est invariable. */
  motCours: { un: 'cours', plusieurs: 'cours' },
  motSeance: { un: 'séance', plusieurs: 'séances' },
  surTotal: 'sur',
  dansLaSemaine: 'dans la semaine',
}

/* ============================================================
   AJOUT — passe de recouture (formulaire, pied de page).
   ============================================================ */

/* ---------- Formulaire d'inscription : le choix des formules ----------
   Le formulaire proposait UNE formule dans une liste déroulante. L'affiche
   2026-2027 les déclare cumulables (FORMULES_CUMULABLES) : un choix unique
   obligeait qui veut le Coran ET les sciences musulmanes à se rabattre sur
   le champ « message », c'est-à-dire à envoyer au secrétariat une donnée
   qu'il ne peut pas traiter. Le contrôle est passé aux cases à cocher, et
   ces libellés-ci portent ce que le changement demande d'écrire. */
export const INSCRIPTION_FORMULES = {
  legende: 'Formules souhaitées',
  /* Dit la règle à l'endroit où elle s'applique : la section « Tarifs » est
     deux écrans plus haut, personne ne remonte pour vérifier. */
  aide: 'Les formules sont cumulables : cochez-en une, ou plusieurs.',
  erreur: 'Choisissez au moins une formule.',
  recap: 'Formules souhaitées',
  aConfirmer: 'Formules à confirmer',
  prixAConfirmer: 'Tarif à confirmer',
}

/* ---------- Pied de page : le chemin de secours ----------
   PIED.contactSecours annonçait « le secrétariat n'a pas encore de ligne
   dédiée » — c'était vrai tant que ORG.tel portait un marqueur d'attente.
   Le numéro de l'affiche l'a rendu FAUX : le pied affichait un téléphone
   cliquable et, deux lignes plus bas, qu'il n'y en avait pas.
   Une phrase par manque, choisie selon ce qui manque réellement. L'ancienne
   valeur reste en place et redeviendra exacte si la ligne disparaît. */
export const PIED_SECOURS = {
  tel: 'Le secrétariat n’a pas encore de ligne dédiée. En attendant, les demandes passent par le formulaire d’inscription en ligne.',
  email: 'Le secrétariat n’a pas encore d’adresse e-mail publique. En attendant, les demandes écrites passent par le formulaire d’inscription en ligne.',
  /* Les deux manquent : on ne cumule pas deux phrases, on en dit une. */
  lesDeux: 'Le secrétariat n’a pas encore de coordonnées directes. En attendant, les demandes passent par le formulaire d’inscription en ligne.',
}

/* ============================================================
   AJOUT — passe de correction sur audit.
   ============================================================ */


/* ---------- Formulaire d'inscription : les phrases qui affirment ----------
   La convention du site (voir PLANNING_INTRO) laisse les libellés de
   COMMANDE dans le composant — un bouton n'est pas du contenu éditorial.
   Mais trois phrases écrites en dur dans Inscription.jsx AFFIRMAIENT
   quelque chose, et échappaient de ce fait à la relecture de ce fichier
   par la mosquée :
   — « le secrétariat prend aussi les inscriptions par téléphone et sur
     place », que l'affiche contredit (« INSCRIPTION SUR LE SITE INTERNET
     DES COURS DE LA MOSQUÉE ») ;
   — « l'équipe pédagogique confirme le niveau à l'entretien », qui
     promettait un entretien que rien n'établit ;
   — « Après validation pédagogique, jamais avant. », qui adossait le
     règlement à la même procédure.
   Elles vivent ici, réécrites sur ce qui est vérifiable.             */
export const INSCRIPTION_TEXTES = {
  aideTitre: 'Une question avant de vous inscrire ?',
  aideTexte:
    'Le secrétariat répond au téléphone sur les formules, les horaires et les demandes en cours.',
  niveauLegende: 'Niveau estimé',
  /* Facultatif, et dit comme tel : l'affiche ne publie aucune échelle de
     niveaux. Exiger un classement sur une échelle qui n'existe pas dans
     l'offre bloquait la demande d'un débutant complet. */
  niveauAide: 'Indication facultative : elle situe votre point de départ.',
  facultatif: '(facultatif)',
  reglementNote: 'Après confirmation de votre inscription, jamais avant.',
}
