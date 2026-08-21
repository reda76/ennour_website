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
  /* Numéro CORRIGÉ par la mosquée le 07/08. Celui de l'affiche
     (07 59 55 01 40) n'était pas le bon : c'est celui-ci qui aboutit au
     pôle enseignement. L'affiche imprimée porte donc un numéro périmé. */
  tel: '06 88 95 54 20',
  telHref: 'tel:+33688955420',
  // À qui l'on parle en composant ce numéro. Précisé par la mosquée.
  telLibelle: 'AME — Pôle enseignement',
  // TODO — à confirmer : adresse e-mail officielle. L'affiche n'en porte pas.
  email: '__EMAIL_A_CONFIRMER__',
  anneeScolaire: '2026 – 2027',
  /* La mosquée nomme « AME — Pôle enseignement » le service qui tient les
     cours. Ce que le sigle AME développe reste inconnu : on l'écrit tel
     quel, on ne l'invente pas. */
  association: 'AME',
  service: 'AME — Pôle enseignement',
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
    /* « Tous les week-ends » était FAUX : le classeur place l'alphabétisation
       le dimanche de 16h à 17h, et le cours d'arabe des sœurs le mercredi.
       Rien ne se tient le samedi. */
    /* « Le dimanche » et non « le week-end » : le classeur ne place rien le
       samedi, et il n'y a pas d'alphabétisation en semaine — la mosquée l'a
       confirmé. C'est une formule à part entière, pas un complément. */
    points: [
      'Alphabétisation arabe',
      'Le dimanche',
      'Groupes hommes et femmes',
    ],
  },
  {
    key: 'sciences',
    titre: 'Sciences musulmanes',
    court: 'Sciences musulmanes',
    accroche: 'Jurisprudence (Fiqh) et biographie prophétique (Sîra).',
    illustration: 'sciences',
    /* « Le week-end, au choix » était FAUX : il n'y a aucun choix de jour.
       Le Fiqh a deux niveaux à deux jours fixes, la Sîra est le samedi. */
    points: [
      'Fiqh — niveaux 1 et 2',
      'Cours de Sîra',
      'Le week-end',
    ],
  },
]

/* Préfixe de toutes les ressources servies depuis public/.
   Vite réécrit les chemins qu'il voit à la compilation (CSS, index.html) mais
   PAS une chaîne lue à l'exécution : écrite « /logos/… », une image serait
   cherchée à la racine du domaine alors que GitHub Pages sert le site sous
   un sous-chemin. BASE_URL vaut « / » en développement, le sous-chemin en
   production, et se termine toujours par une barre. Erreur déjà commise
   une fois avec une photo : ne pas la refaire.

   La lecture est défensive : `import.meta.env` n'existe QUE sous Vite. Un
   script Node qui importerait ce fichier pour en vérifier les données —
   ce qui est utile et doit rester possible — plantait sur cette ligne.   */
const BASE = import.meta.env?.BASE_URL ?? '/'

/* ---------- Le logo de l'association ----------
   Fourni par le client en PNG sur fond BLANC OPAQUE (aucune transparence,
   vérifié). Il a été détouré : l'aplat blanc est résolu en canal alpha, puis
   « démultiplié » pour retrouver la couleur d'origine — sans quoi les bords
   anticrénelés gardaient un halo blanc dès qu'on le posait ailleurs que sur
   du blanc. Les marges du fichier d'origine ont été recadrées.

   Deux limites relevées AU RENDU, à respecter pour tout nouvel emploi :
   — en dessous d'environ 110 px de large, « AME » devient illisible ;
   — sur un aplat orange, les lettres oranges du logo disparaissent. Le poser
     sur du plâtre, du blanc ou de l'encre, jamais sur --accent.

   TODO — le sigle AME n'a pas été développé par le client. Tant qu'on ne le
   connaît pas, on n'invente pas : le texte alternatif dit « association AME »
   et rien de plus.                                                          */
export const LOGO_AME = {
  src: `${BASE}logos/ame-640.webp`,
  repli: `${BASE}logos/ame-640.png`,
  largeur: 640,
  hauteur: 503,
  alt: 'Logo de l’association AME',
  // Largeur minimale d'affichage, mesurée : en deçà le sigle se referme.
  largeurMini: 110,
}

/* ---------- Photographies du lieu ----------
   La première photo transmise (214 × 553 px) ne l'avait été qu'à titre de
   référence de couleur : elle a servi à relever la palette puis a été
   retirée. Celle-ci est une vraie prise de vue, 1672 × 941, en paysage.

   `srcset` s'arrête à 1672 px : c'est la largeur native du fichier. Au-delà,
   on ne fabriquerait que du flou vendu comme de la définition. Conséquence
   assumée : sur un écran très large à forte densité, le bandeau est
   légèrement adouci. Une source plus grande le corrigerait.

   `focus` est le point d'ancrage vertical du recadrage, et il est CALCULÉ,
   pas estimé. Le bandeau fait 1440 × 400 sur un écran courant ; l'image
   passée en `cover` y est mise à l'échelle en 1440 × 810, donc 410 px sortent
   du cadre. L'enseigne « مسجد النور / MOSQUÉE EN-NOUR LE HAVRE » occupe la
   bande 8–35 % de la hauteur : pour qu'elle tienne entière, la fenêtre doit
   commencer au-dessus de 8 %, soit un focus ≤ 16 %. À 42 % elle démarrait à
   21 % et le haut de l'enseigne était tranché — or c'est elle qui identifie
   le lieu. 12 % laisse une marge, et un filet de ciel au-dessus.

   Sans effet sur mobile : le cadre y est plus haut que large par rapport à
   l'image, le recadrage s'y fait donc horizontalement.                    */
export const PHOTOS = {
  facade: {
    src: `${BASE}photos/facade-ennour-1672.webp`,
    srcset: `${BASE}photos/facade-ennour-1000.webp 1000w, ${BASE}photos/facade-ennour-1672.webp 1672w`,
    largeur: 1672,
    hauteur: 941,
    focus: '12%',
    alt:
      'La façade de la mosquée En-Nour au Havre : deux grands arcs outrepassés orange sur un mur clair, surmontés d’une enseigne portant « مسجد النور » et « MOSQUÉE EN-NOUR LE HAVRE ».',
    legende: 'La mosquée En-Nour, au Havre.',
  },
}

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
   Transcrites du classeur « planning des Salles Ennour.xlsx » fourni par la
   mosquée : six feuilles, une par salle, en grille hebdomadaire à la
   demi-heure. C'est la source la plus complète et la plus récente — elle
   PRIME sur l'affiche et sur la note manuscrite, qu'elle corrige toutes deux.

   Ce qu'elle a tranché :
   — L'ALPHABÉTISATION ne se tient pas de 7h à 8h30 comme le site l'affichait
     d'après la formule 2 de l'affiche, mais le DIMANCHE de 16h à 17h, en
     salle 3 pour les hommes et salle 4 pour les femmes. C'est l'erreur que
     la mosquée a signalée.
   — Le FIQH n'est pas « samedi ou dimanche » : ce sont DEUX NIVEAUX à deux
     jours différents. Niveau 1 le dimanche (classe nouvelle, inscriptions
     ouvertes), niveau 2 le samedi (anciens élèves uniquement).
   — La SÎRA adultes est le SAMEDI seulement. Le créneau du dimanche
     après-midi que l'affiche laissait supposer est la Sîra des ados.
   — Le CORAN FEMMES existe bien : lundi, mardi et jeudi de 14h30 à 16h. Il
     était resté en attente d'arbitrage faute de source ; il est confirmé.
   — Toutes les SALLES sont désormais connues.

   Ce qui en est volontairement EXCLU :
   — les cours enfants et ados (35 créneaux au classeur). La mosquée ne
     communique pas encore dessus : « pour l'instant c'est que pour les
     adultes ». Ne pas les ajouter sans son accord.
   — les NOMS DES ENSEIGNANTS, qui figurent au classeur (annotations de
     planning interne). Publier le nom de quelqu'un est une décision qui
     appartient à la mosquée, pas au site.

   `groupe` remplace l'ancien `genre`, retiré quand l'affiche ne disait rien
   des groupes. Le classeur, lui, les nomme explicitement. */
export const CRENEAUX = [
  {
    id: 'coran-h-semaine',
    poles: ['coran'],
    intitule: 'Coran',
    groupe: 'Hommes',
    public: 'Adultes',
    debut: '20:00',
    fin: '21:30',
    /* Le vendredi a QUITTÉ ce groupe le 08/08 : il a son propre horaire,
       une heure plus tôt (voir `coran-h-vendredi`). */
    jours: ['Lundi', 'Mercredi'],
    salle: 'Salle 5',
    formules: ['coran'],
  },
  {
    /* Créé le 08/08 en remplacement de la séance du samedi matin :
       « le samedi c'est supprimé, et à la place c'est le vendredi à
       19h - 20h30 ».

       Le vendredi ne pouvait pas garder DEUX séances de Coran hommes —
       19h-20h30 et 20h-21h30 se recouvrent d'une demi-heure, dans la même
       salle et pour le même groupe. Le vendredi porte donc désormais ce
       seul horaire, et le lundi et le mercredi gardent celui du soir.
       À CONFIRMER : si le vendredi conserve aussi sa séance de 20h à
       21h30, c'est une salle ou un groupe distinct qu'il faut préciser. */
    id: 'coran-h-vendredi',
    poles: ['coran'],
    intitule: 'Coran',
    groupe: 'Hommes',
    public: 'Adultes',
    debut: '19:00',
    fin: '20:30',
    jours: ['Vendredi'],
    salle: 'Salle 5',
    formules: ['coran'],
  },
  {
    id: 'coran-h-weekend',
    poles: ['coran'],
    intitule: 'Coran',
    groupe: 'Hommes',
    public: 'Adultes',
    debut: '07:00',
    fin: '08:30',
    /* Le samedi matin a été SUPPRIMÉ le 08/08 et reporté au vendredi soir
       (voir `coran-h-vendredi`). Ne pas le réintroduire depuis le classeur
       des salles, qui le porte encore. */
    jours: ['Dimanche'],
    salle: 'Salle 5',
    formules: ['coran'],
  },
  {
    id: 'coran-f-semaine',
    poles: ['coran'],
    intitule: 'Coran',
    groupe: 'Femmes',
    public: 'Adultes',
    debut: '14:30',
    fin: '16:00',
    jours: ['Lundi', 'Mardi', 'Jeudi'],
    salle: 'Salle 5',
    /* Rattaché à la formule 1 depuis que celle-ci est « Coran » tout court :
       une formule par pôle, et ce créneau est du Coran. La question restée
       ouverte deux échanges durant se referme d'elle-même. */
    formules: ['coran'],
  },
  {
    id: 'alpha-h',
    poles: ['alphabetisation'],
    intitule: 'Alphabétisation',
    groupe: 'Hommes',
    public: 'Adultes',
    debut: '16:00',
    fin: '17:00',
    jours: ['Dimanche'],
    salle: 'Salle 3',
    formules: ['alphabetisation'],
  },
  {
    id: 'alpha-f',
    poles: ['alphabetisation'],
    intitule: 'Alphabétisation',
    groupe: 'Femmes',
    public: 'Adultes',
    debut: '16:00',
    fin: '17:00',
    jours: ['Dimanche'],
    salle: 'Salle 4',
    formules: ['alphabetisation'],
  },
  {
    id: 'fiqh-n1',
    poles: ['sciences'],
    intitule: 'Fiqh — niveau 1',
    public: 'Adultes',
    debut: '17:00',
    fin: '19:00',
    jours: ['Dimanche'],
    salle: 'Salle 5',
    formules: ['sciences'],
    /* La classe est nouvelle : c'est celle qui reçoit les inscriptions. */
    inscriptionsOuvertes: true,
  },
  {
    id: 'fiqh-n2',
    poles: ['sciences'],
    intitule: 'Fiqh — niveau 2',
    public: 'Adultes',
    debut: '17:00',
    fin: '19:00',
    jours: ['Samedi'],
    salle: 'Salle 2',
    formules: ['sciences'],
    /* Réservé aux anciens élèves : l'afficher sans le dire enverrait des
       débutants s'inscrire à un cours qui ne les accueillera pas. */
    inscriptionsOuvertes: false,
  },
  {
    id: 'sira',
    poles: ['sciences'],
    intitule: 'Sîra',
    detail: 'Biographie du Prophète',
    salutation: 'ﷺ',
    public: 'Adultes',
    debut: '19:00',
    fin: '21:00',
    jours: ['Samedi'],
    salle: 'Salle 5',
    formules: ['sciences'],
  },
  /* RETIRÉES le 07/08 sur instruction de la mosquée : « il y a un créneau
     Coran pour femme, faut le retirer, c'est à part et non officiel ».
     Elle en a joint la liste — lundi 14h-16h, mercredi 14h-16h, dimanche
     17h — soit exactement les trois séances qui se tenaient en salle 2 :
     « Fiqh et Coran », « Arabe » et « Coran et tafsîr ».

     Elles figuraient au classeur des salles et étaient affichées avec la
     mention « Nous consulter », faute de pouvoir les rattacher à une
     formule de l'affiche. C'était le bon signal : ce qui ne relevait
     d'aucune formule ne relevait pas non plus de l'offre officielle.

     Ne PAS les réintroduire depuis le classeur : il les porte toujours,
     mais le classeur décrit l'occupation des salles, pas l'offre publiée.

     Le cours de Coran femmes du lundi, mardi et jeudi de 14h30 à 16h en
     salle 5 n'est PAS concerné : il ne figure pas dans la liste transmise
     (ni le mardi, ni le jeudi n'y sont), et il reste affiché. */
]

export const JOURS_SEMAINE = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche',
]

export const MENTION_HORAIRES =
  "Les horaires et les salles peuvent être modifiés en cours d’année en fonction des besoins pédagogiques et des effectifs. Toute modification est communiquée aux inscrits."

/* ---------- Formules & tarifs ----------
   RECTIFIÉES par la mosquée le 08/08. La structure de l'affiche imprimée
   est caduque : il n'y a plus de « Coran intensif » à 300 €, plus de
   formule qui mélange Coran et alphabétisation, et les trois tarifs sont
   désormais identiques.

   Une formule = UN pôle, et c'est ce qui rend le reste simple : la clé de
   la formule EST celle du pôle, et les séances se lisent directement dans
   CRENEAUX. Elles ne sont donc plus écrites ici.

   C'est la correction d'un défaut réel : les séances recopiées à la main
   avaient divergé du planning — l'affiche plaçait l'alphabétisation de 7h
   à 8h30 quand le classeur la donne le dimanche de 16h à 17h, et il a
   fallu que la mosquée signale l'erreur. Une seule source, désormais.

   ATTENTION : l'affiche imprimée porte encore les anciens tarifs.        */
export const FORMULES = [
  {
    key: 'coran',
    numero: 1,
    nom: 'Coran',
    rythme: 'En semaine ou le week-end',
    prix: 80,
    prixNote: null,
    resume: 'Lecture, tajwîd et mémorisation — en soirée, tôt le week-end ou en après-midi.',
    inclus: ['Lecture du Coran', 'Tajwîd', 'Mémorisation', 'Révision'],
    poles: ['coran'],
  },
  {
    key: 'alphabetisation',
    numero: 2,
    nom: 'Alphabétisation',
    rythme: 'Le dimanche',
    prix: 80,
    prixNote: null,
    resume: 'Lire et écrire l’arabe, depuis les toutes premières lettres.',
    inclus: ['Alphabétisation arabe'],
    poles: ['alphabetisation'],
  },
  {
    key: 'sciences',
    numero: 3,
    nom: 'Sciences musulmanes',
    sousTitre: 'Sîra & Fiqh',
    rythme: 'Le week-end',
    prix: 80,
    prixNote: null,
    resume: 'La jurisprudence et la vie du Prophète, le samedi et le dimanche soir.',
    inclus: ['Cours de Sîra', 'Cours de Fiqh'],
    poles: ['sciences'],
  },
]

/** Les séances d'une formule, LUES DEPUIS LE PLANNING et non recopiées.
    C'est ce qui empêche les deux de diverger : la section Tarifs répond à
    « qu'est-ce que je paie », le Planning à « quand je viens », mais les
    horaires sont les mêmes et n'ont plus qu'une seule source. */
export function seancesDeFormule(cle) {
  return CRENEAUX.filter((c) => c.formules?.includes(cle))
}

/* ---------- Le dégressif ----------
   Chiffré par la mosquée le 08/08 : « 3 formules à 220 au lieu de 240,
   rien à partir de deux formules ».

   La remise porte sur le TOTAL et non sur une formule en particulier —
   d'où un FORFAIT par nombre de formules, et non un barème par clé comme
   dans la version précédente. Prendre les trois coûte 220 € ; en prendre
   deux coûte la somme des deux, sans remise.

   Le forfait est indexé sur le NOMBRE de formules. C'est exact tant que
   les trois sont au même tarif, ce qui est le cas. Si un jour elles
   divergent, il faudra indexer sur la combinaison et non sur le compte. */
export const DEGRESSIF = {
  // Le rang à partir duquel une remise existe.
  aPartirDe: 3,
  // Prix forfaitaire, par nombre de formules prises ensemble.
  forfaits: { 3: 220 },
  // Libellés des combinaisons remisées. Aucun pour deux : sans remise, la
  // ligne n'apprendrait rien que les cartes ne disent déjà.
  libelles: { 3: 'Les trois formules' },
  titre: 'Dégressif à partir de la troisième formule',
  texte: 'Un tarif dégressif s’applique à partir de la troisième formule.',
  auLieuDe: 'au lieu de',
  montantAConfirmer: 'Montant du dégressif à confirmer',
}

/** Total d'un panier de formules.
    Un forfait déclaré pour ce nombre de formules l'emporte sur la somme :
    c'est lui le prix. Sinon, on additionne. Les clés inconnues et les
    formules sans prix sont ignorées plutôt que de produire un NaN. */
export function totalFormules(cles) {
  const panier = new Set(cles)
  const forfait = DEGRESSIF.forfaits?.[panier.size]
  if (typeof forfait === 'number') return forfait
  let total = 0
  for (const cle of panier) {
    const formule = FORMULES.find((f) => f.key === cle)
    if (typeof formule?.prix === 'number') total += formule.prix
  }
  return total
}

/** La somme brute des tarifs, sans forfait : c'est le prix barré. */
export function totalPlein(cles) {
  let total = 0
  for (const cle of new Set(cles)) {
    const formule = FORMULES.find((f) => f.key === cle)
    if (typeof formule?.prix === 'number') total += formule.prix
  }
  return total
}

/** Le total est-il SÛR pour ce nombre de formules ? Faux si une remise
    s'applique sans qu'un forfait soit connu : on n'affiche alors aucun
    prix plutôt qu'une somme qui n'est pas celle qu'on paiera. */
export function totalFiable(nombre) {
  if (nombre < (DEGRESSIF.aPartirDe ?? Infinity)) return true
  return typeof DEGRESSIF.forfaits?.[nombre] === 'number'
}

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
  /* DEUX rentrées, confirmées par la mosquée le 07/08 — ce sont les seules
     dates de ce calendrier qui ne soient plus provisoires. Les cours de
     Coran ouvrent trois semaines avant les autres formules. */
  /* `court` n'existe QUE pour la frise : « Rentrée des autres formules »
     y ferait une étiquette de 180px pour un mât de 1px. Le registre, lui,
     garde le libellé entier. */
  { key: 'rentree-coran', libelle: 'Rentrée des cours de Coran', court: 'Rentrée Coran', debut: '2026-09-14', fin: null, type: 'jalon', provisoire: false },
  { key: 'rentree-autres', libelle: 'Rentrée des autres formules', court: 'Rentrée formules 2 et 3', debut: '2026-10-03', fin: null, type: 'jalon', provisoire: false },
  { key: 'toussaint', libelle: 'Vacances de la Toussaint', debut: '2026-10-17', fin: '2026-11-02', type: 'vacances', provisoire: true },
  { key: 'examen-t1', libelle: 'Examens du 1er trimestre', debut: '2026-12-12', fin: '2026-12-19', type: 'examen', provisoire: true },
  { key: 'noel', libelle: 'Vacances de Noël', debut: '2026-12-19', fin: '2027-01-04', type: 'vacances', provisoire: true },
  { key: 'hiver', libelle: 'Vacances d’hiver', debut: '2027-02-20', fin: '2027-03-08', type: 'vacances', provisoire: true },
  { key: 'examen-t2', libelle: 'Examens du 2e trimestre', debut: '2027-03-13', fin: '2027-03-20', type: 'examen', provisoire: true },
  { key: 'printemps', libelle: 'Vacances de printemps', debut: '2027-04-17', fin: '2027-05-03', type: 'vacances', provisoire: true },
  { key: 'examen-t3', libelle: 'Examens du 3e trimestre', debut: '2027-06-05', fin: '2027-06-12', type: 'examen', provisoire: true },
  { key: 'fin', libelle: 'Fin des cours', court: 'Fin des cours', debut: '2027-06-26', fin: null, type: 'jalon', provisoire: true },
]

/* La réserve ne vaut PLUS pour tout : les deux rentrées sont confirmées par
   la mosquée, les huit autres entrées restent calées sur la zone B sans
   avoir été vérifiées. Dire « les dates sont indicatives » sans distinguer
   ferait douter des seules qui soient sûres — et ce sont précisément
   celles sur lesquelles on s'inscrit. */
export const MENTION_CALENDRIER =
  'Les deux dates de rentrée sont confirmées. Les vacances et les examens sont calés sur la zone B et restent à confirmer.'

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
  { key: 'echelonnement', libelle: 'En une fois ou échelonné', detail: 'Par prélèvements automatiques ou par chèques remis à l’inscription.' },
]

/* ---------- Navigation ---------- */
export const SECTIONS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'cours', label: 'Les cours' },
  { id: 'planning', label: 'Planning' },
  { id: 'tarifs', label: 'Formules & tarifs' },
  { id: 'calendrier', label: 'Calendrier' },
  { id: 'faq', label: 'Questions fréquentes' },
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
    "Le rythme de l’année en une seule lecture : rentrées, périodes de cours, vacances et sessions d’examens.",
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
    "Trois formules pour l’année 2026-2027, à 80 € chacune et cumulables entre elles. Le règlement peut être fait en une fois ou échelonné.",
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
  /* Le tarif est ANNUEL. Afficher « 80 € » seul laisserait croire à un
     tarif mensuel ou par séance. La mosquée dit « 80 € l'année » : on
     garde la période, elle fait partie du prix. */
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
/* Libellés des deux états introduits par le classeur : une classe fermée aux
   nouvelles inscriptions, et une séance rattachée à aucune formule. */
export const ETATS_SEANCE = {
  anciensEleves: 'Anciens élèves uniquement',
  anciensElevesDetail:
    'Cette classe poursuit le programme de l’an dernier : elle ne reçoit pas de nouvelle inscription cette année.',
  nouvelleClasse: 'Nouvelle classe — inscriptions ouvertes',
  horsFormule: 'Nous consulter',
  horsFormuleDetail:
    'Cette séance ne figure sur aucune des trois formules de l’affiche. Contactez le secrétariat pour connaître les conditions.',
}

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
    'La semaine type de l’année scolaire. Filtrez par pôle ou par groupe pour ne garder que les séances qui vous concernent.',
  filtreLegende: 'Filtrer par pôle',
  /* Le tri par GROUPE est revenu avec le classeur des salles, qui nomme
     explicitement les groupes hommes et femmes — l'affiche n'en disait rien,
     l'axe avait donc été retiré. Le tri par public, lui, reste absent : une
     seule valeur ouverte, et un filtre à une option ne filtre rien. */
  filtreGroupe: 'Groupe',
  /* Dit pourquoi un filtre de groupe laisse passer des séances qui n'en
     portent pas : sans cette phrase, l'écart entre la puce et la grille
     passerait pour un défaut d'affichage. */
  groupeNote:
    'Les séances dont le groupe n’est pas précisé restent affichées quel que soit le filtre.',

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

/* ============================================================
   FAQ — texte fourni par la mosquée le 03/08, 19 questions.

   Il remplace intégralement les huit questions que j'avais
   proposées : celles-ci venaient de moi, celles-là viennent d'elle.

   Trois écarts avec le reste du site ont dû être arbitrés. Ils sont
   signalés ici pour que la mosquée tranche :

   1. NUMÉROTATION DES FORMULES — TRANCHÉE le 08/08. L'affiche disait
      1 = Coran intensif (300 €), la FAQ 1 = Sciences islamiques ; la
      rectification de la mosquée donne une troisième réponse, qui fait
      désormais foi : 1 = Coran, 2 = Alphabétisation, 3 = Sciences
      musulmanes, à 80 € chacune. La réponse ci-dessous et les cartes de
      tarifs disent la même chose. L'AFFICHE IMPRIMÉE est caduque.
   2. « Formulaire de contact » (question 7) : le site n'en a pas de
      distinct. La réponse renvoie au formulaire d'inscription, qui
      porte un champ de message libre, et au téléphone.
   3. Orthographe : « Mosquée En-Nour », comme sur l'enseigne du
      bâtiment, et non « Ennour ».

   Les questions sont regroupées en trois familles. L'ordre d'origine
   mêlait inscription, déroulement et contact ; le texte n'a pas
   changé, seul son rangement. Deux paires font doublon dans la source
   (1/8 sur le cumul, 2/6/11 sur le présentiel) : elles sont conservées
   telles quelles — on cherche une FAQ par sa question exacte.        */
export const FAQ = {
  surtitre: 'Questions fréquentes',
  titre: 'Ce qu’on nous demande le plus',
  chapeau:
    'Une réponse rapide aux questions qui reviennent. Si la vôtre n’y est pas, le secrétariat répond au téléphone.',
  groupes: [
    {
      id: 'formules',
      titre: 'Les formules et l’inscription',
      questions: [
        {
          id: 'formules-proposees',
          q: 'Quelles sont les formules proposées ?',
          r: 'Trois formules, pour répondre aux besoins et aux objectifs de chacun : la formule 1, Coran — lecture, tajwîd et mémorisation ; la formule 2, alphabétisation ; la formule 3, sciences musulmanes. Chacune est à 80 € l’année. Il est possible de s’inscrire à plusieurs formules, sous réserve de la compatibilité des horaires, et un tarif dégressif s’applique à partir de la troisième.',
        },
        {
          id: 'plusieurs-formules',
          q: 'Puis-je m’inscrire à plusieurs formules en même temps ?',
          r: 'Oui. Il est tout à fait possible de suivre plusieurs formules simultanément, sous réserve de la compatibilité des horaires.',
        },
        {
          id: 'reduction',
          q: 'Bénéficie-t-on d’une réduction en cas d’inscription à plusieurs formules ?',
          r: 'Les modalités concernant les réductions éventuelles sont précisées lors de l’inscription. N’hésitez pas à contacter le secrétariat pour plus d’informations.',
        },
        {
          id: 'reglement',
          q: 'En combien de fois puis-je régler ma formation ?',
          r: 'Le règlement peut être effectué en une seule fois ou échelonné sur l’année. L’inscription doit toutefois être finalisée en début d’année. En cas de paiement échelonné, celui-ci s’effectue par prélèvements automatiques ou par chèques remis lors de l’inscription, qui seront encaissés selon l’échéancier prévu.',
        },
        {
          id: 'places',
          q: 'Le nombre de places est-il limité ?',
          r: 'Oui. Afin de garantir un enseignement de qualité, le nombre de places est limité. Nous vous conseillons de vous inscrire dès l’ouverture des inscriptions.',
        },
        {
          id: 'en-cours-annee',
          q: 'Puis-je rejoindre une session en cours d’année ?',
          r: 'Oui, cela est possible, sous réserve de l’accord du professeur. Vous pourrez rejoindre la session en cours d’année après validation de celui-ci.',
        },
        {
          id: 'niveau',
          q: 'Quel est le niveau requis ?',
          r: 'Nos formations sont accessibles à différents niveaux, du débutant à l’élève plus avancé. Si nécessaire, nous vous orienterons vers la formule la plus adaptée à votre niveau.',
        },
        {
          id: 'abandon',
          q: 'Que se passe-t-il en cas d’abandon en cours d’année ?',
          r: 'En cas d’abandon en cours d’année, l’année de formation reste due dans son intégralité. L’inscription étant un engagement pour l’année complète, aucun remboursement ne pourra être effectué en cas d’arrêt en cours de formation.',
          /* Le seul engagement financier de la page. Signalé pour que la
             section Tarifs puisse y renvoyer : personne ne doit payer sans
             l'avoir lu. */
          cle: true,
        },
      ],
    },
    {
      id: 'deroulement',
      titre: 'Le déroulement des cours',
      questions: [
        {
          id: 'deroulement-cours',
          q: 'Comment se déroulent les cours ?',
          r: 'Les cours se déroulent en présentiel à la Mosquée En-Nour. Selon la formule choisie, ils ont lieu en semaine ou le week-end, conformément au planning communiqué lors de l’inscription.',
        },
        {
          id: 'presentiel',
          q: 'Les cours sont-ils dispensés en présentiel, en ligne ou dans les deux formats ?',
          r: 'Les cours sont dispensés uniquement en présentiel, à la Mosquée En-Nour.',
        },
        {
          id: 'materiel',
          q: 'De quoi ai-je besoin pour suivre les cours ?',
          r: 'Il vous suffit de prévoir le nécessaire pour prendre des notes : cahier, stylo. Selon la matière enseignée, le professeur pourra également vous demander d’apporter du matériel ou des ouvrages spécifiques.',
        },
        {
          id: 'supports',
          q: 'Les supports de cours sont-ils fournis ?',
          r: 'Oui. Les supports pédagogiques nécessaires au bon déroulement des cours sont mis à disposition des élèves. Certains ouvrages pourront toutefois être demandés selon la formule choisie.',
        },
        {
          id: 'devoirs',
          q: 'Y a-t-il des devoirs et des évaluations ?',
          r: 'Oui. Des évaluations trimestrielles sont organisées afin de suivre votre progression. Les devoirs sont laissés à l’appréciation de chaque professeur et peuvent varier selon la matière.',
        },
        {
          id: 'mixite',
          q: 'Les cours sont-ils ouverts aux hommes et aux femmes ?',
          r: 'Oui. Les cours sont ouverts aux hommes et aux femmes, dans le respect de l’organisation mise en place par la mosquée.',
        },
        {
          id: 'absence',
          q: 'Que se passe-t-il si je ne peux pas assister à un cours ?',
          r: 'En cas d’absence, nous vous demandons de prévenir votre professeur dès que possible.',
        },
        {
          id: 'enregistrement',
          q: 'Les cours sont-ils enregistrés ?',
          r: 'Non. Les cours ne sont pas enregistrés : ils sont dispensés uniquement en présentiel.',
        },
        {
          id: 'conferences',
          q: 'Que se passe-t-il lorsqu’une conférence est organisée ?',
          r: 'Dans le cadre de notre projet pédagogique, certains cours peuvent exceptionnellement être remplacés par une conférence organisée par la Mosquée En-Nour. Ces conférences font pleinement partie de la formation : elles sont une occasion d’approfondir ses connaissances, de bénéficier des enseignements de conférenciers invités et de profiter d’un rappel bénéfique. La participation des élèves y est vivement encouragée.',
        },
      ],
    },
    {
      id: 'contact',
      titre: 'Rester en contact',
      questions: [
        {
          id: 'secretariat',
          q: 'Comment puis-je contacter le secrétariat ?',
          /* La source disait « le formulaire de contact disponible sur le
             site » : il n'en existe pas de distinct. On nomme ce qui existe
             — le formulaire d'inscription porte un champ de message libre. */
          r: 'Par le formulaire d’inscription de ce site, qui comporte un champ de message libre, par téléphone, ou directement à la Mosquée En-Nour pendant les horaires d’ouverture.',
        },
        {
          id: 'annonces',
          q: 'Comment serai-je informé des changements d’horaires ou des annonces importantes ?',
          r: 'Les informations importantes concernant les cours, les éventuels changements d’horaires et les annonces sont communiquées via ce site internet et les groupes WhatsApp dédiés.',
        },
      ],
    },
  ],
  reste: 'Votre question n’y est pas ?',
}
