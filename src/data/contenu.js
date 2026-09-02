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
  /* Confirmée par la mosquée le 21/08. Le code postal provisoire affiché
     jusque-là — 76600 — était FAUX : c'est 76620. La « partie connue » d'une
     donnée en attente peut donc être fausse elle aussi ; ne pas en pré-remplir
     à l'avenir sans source. */
  adresse: '12 Rue Léon Peulevey, 76620 Le Havre',
  /* Lien d'itinéraire. OpenStreetMap plutôt qu'un service qui piste : c'est
     un LIEN, jamais un cadre embarqué — rien n'est chargé tant que personne
     ne clique, et la page ne dépend d'aucun tiers pour s'afficher. */
  /* Google Maps depuis le 24/08, à la demande de la mosquée : c'est
     l'application que ses fidèles ont sur leur téléphone, et le lien s'y
     ouvre directement plutôt que dans un navigateur.
     Les coordonnées viennent de Nominatim, qui ne renvoyait qu'un résultat
     pour cette adresse : « Mosquée Mesjed Ennour, 12 Rue Léon Peulevey ».
     Elles plutôt que l'adresse en toutes lettres, parce qu'un géocodeur
     peut se tromper de rue ; un point, jamais. Elles sont VÉRIFIABLES : ce
     sont celles du repère au centre de la vignette ci-dessous. */
  planHref: 'https://www.google.com/maps/search/?api=1&query=49.5195894%2C0.1170548',
  /* Numéro CORRIGÉ par la mosquée le 07/08. Celui de l'affiche
     (07 59 55 01 40) n'était pas le bon : c'est celui-ci qui aboutit au
     pôle enseignement. L'affiche imprimée porte donc un numéro périmé. */
  tel: '06 88 95 54 20',
  telHref: 'tel:+33688955420',
  // À qui l'on parle en composant ce numéro. Précisé par la mosquée.
  telLibelle: 'AME — Pôle enseignement',
  /* Fournie par la mosquée le 26/08. Elle rallume d'elle-même la ligne
     e-mail de la section Contact et celle du pied de page, avec leur
     `mailto:` — les deux étaient masquées tant que l'adresse manquait, sur
     demande de la mosquée qui ne voulait pas exposer ce qui lui faisait
     défaut. Rien d'autre à retoucher. */
  email: 'enseignement@mesjedennour.fr',
  anneeScolaire: '2026 – 2027',
  /* La mosquée nomme « AME — Pôle enseignement » le service qui tient les
     cours. Ce que le sigle AME développe reste inconnu : on l'écrit tel
     quel, on ne l'invente pas. */
  /* Le sigle seul. Renommé de `association` le 21/08 : la mosquée ne veut
     pas voir ce mot sur le site, autant qu'il ne traîne pas non plus dans
     les noms de champs qu'on relit tous les jours. */
  sigle: 'AME',
  service: 'AME — Pôle enseignement',
}

const BASE = import.meta.env?.BASE_URL ?? '/'

/* ---------- Photos des cours ----------
   Fournies par la mosquée le 24/08. Ce ne sont pas des vues du lieu mais les
   SUPPORTS de chaque cours : un mushaf, une planche d'alphabet, les deux
   ouvrages de fiqh étudiés, les deux mosquées de la Sîra. Elles disent donc
   quelque chose que le texte ne disait pas, et c'est à ce titre qu'elles
   entrent — pas pour décorer.

   Les originaux (noms accentués, formats disparates) sont archivés hors du
   dépôt dans `sources-images/`. Ce qui est publié a été recadré et converti
   en WebP dans `public/photos/cours/`.

   DEUX FORMATS, volontairement :
   — les trois images de pôle sont en 3/2, TOUTES LES TROIS, pour que les
     cartes restent alignées. Le 2/1 essayé d'abord rognait le titre et la
     dernière rangée de la planche d'alphabet : un format photo plus haut
     lui rend ses quatre rangées ;
   — les deux couvertures de livre restent en PORTRAIT. Les rogner au 4/3
     aurait tranché dans le titre : une couverture ne se recadre pas.

   `photo()` ne fabrique que des chemins. Le `srcset` n'est écrit que s'il y
   a réellement deux largeurs : deux sources identiques ne servent à rien et
   trompent le navigateur. */
function photo(nom, largeurs, [largeur, hauteur], alt) {
  const url = (l) => `${BASE}photos/cours/${nom}-${l}.webp`
  return {
    src: url(largeurs[largeurs.length - 1]),
    srcset: largeurs.length > 1 ? largeurs.map((l) => `${url(l)} ${l}w`).join(', ') : undefined,
    largeur,
    hauteur,
    alt,
  }
}

/* Le plan d'accès. Une image FIXE, fabriquée à partir des tuiles
   OpenStreetMap et rangée dans public/ : la page n'appelle donc aucun
   service extérieur pour s'afficher. Un cadre Google Maps embarqué aurait
   chargé Google à chaque visite et déposé des cookies — soit une bannière
   de consentement sur un site qui n'en a aujourd'hui aucun besoin.
   Le CLIC, lui, ouvre bien Google Maps : c'est là qu'on veut l'itinéraire.
   Refabriquer la vignette si l'adresse change — elle est figée, elle ne se
   corrigera pas toute seule. */
export const PLAN_ACCES = {
  src: `${BASE}photos/plan-acces-720.webp`,
  srcset: `${BASE}photos/plan-acces-480.webp 480w, ${BASE}photos/plan-acces-720.webp 720w`,
  largeur: 720,
  /* 3/1 depuis le 24/08 : hauteur réduite de moitié pour équilibrer les
     deux colonnes de la section, qui n'en compte plus que deux lignes à
     gauche depuis le retrait de l'e-mail et des horaires.
     Le ZOOM est resté à 17 malgré le cadre plus bas. Essayé à 16, qui
     montrait plus de quartier : « Rue Léon Peulevey » n'y était plus
     nommée. Sur un plan d'accès, le nom de la rue passe avant l'étendue. */
  hauteur: 240,
  alt: 'Plan du quartier : la mosquée est signalée rue Léon Peulevey, près du carrefour de la Mare Rouge.',
  /* OpenStreetMap impose de créditer ses contributeurs partout où ses
     tuiles sont reprises. Ce n'est pas une politesse, c'est sa licence. */
  credit: 'Fond de plan © OpenStreetMap',
}

export const PHOTOS_COURS = {
  coran: photo('coran', [480], [480, 320],
    'Un exemplaire du Coran, sa page ornée d’un médaillon doré.'),
  alphabet: photo('alphabet', [480, 720], [720, 480],
    'Une planche présentant les lettres de l’alphabet arabe.'),
  sira: photo('sira', [480, 720], [720, 480],
    'La Kaaba à La Mecque, et la mosquée du Prophète à Médine avec son dôme vert.'),
  /* Les deux tomes du livre de lecture, fournis le 26/08 pour la formule
     d'alphabétisation. Ils remplacent la planche d'alphabet dans la carte de
     FORMULE seulement : la carte de pôle, dans « Les cours », garde la
     planche — elle y illustre la matière, pas le support.
     Photographiés différemment (0,813 contre 0,788), ils ont été ramenés au
     même format en rognant au centre : ce sont des aplats de papier à titre
     centré, il n'y a rien à perdre sur les bords, et côte à côte l'écart se
     serait vu. */
  lecture1: photo('lecture-1', [240, 400], [400, 500],
    'Couverture du livre de lecture, tome 1.'),
  lecture2: photo('lecture-2', [240, 400], [400, 500],
    'Couverture du livre de lecture, tome 2.'),
  fiqhNiveau1: photo('fiqh-niveau-1', [240, 400], [400, 520],
    'Couverture du Mukhtasar Al-Akhdarî, la prière selon le rite malikite.'),
  fiqhNiveau2: photo('fiqh-niveau-2', [240, 400], [400, 476],
    'Couverture du Matn al-‘Ashmâwiyya, fiqh malikite.'),
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
    /* Clé du DESSIN de repli — voir src/components/illustrations/. Il n'est
       tracé que si `photo` manque : le dessin reste le filet de sécurité. */
    illustration: 'coran',
    photo: PHOTOS_COURS.coran,
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
    photo: PHOTOS_COURS.alphabet,
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
    /* RÉDUIT à une seule entrée le 25/08. « Le dimanche » et « Groupes
       hommes et femmes » disaient QUAND et POUR QUI, pas ce qu'on apprend —
       c'est le rôle du planning, qui l'affiche séance par séance. Le jour
       était de surcroît contesté par la mosquée le 24/08 (« je crois que
       c'est le samedi »), et une carte n'a pas à porter une information
       en litige quand elle peut ne rien en dire. */
    points: ['Alphabétisation arabe'],
  },
  {
    key: 'sciences',
    titre: 'Sciences musulmanes',
    court: 'Sciences musulmanes',
    accroche: 'Jurisprudence (Fiqh) et biographie prophétique (Sîra).',
    illustration: 'sciences',
    /* La Sîra plutôt qu'un des deux ouvrages de fiqh : c'est la seule des
       trois images du pôle qui soit en paysage, et le pôle en compte trois.
       Les deux couvertures sont posées sur leurs créneaux au planning, là
       où l'on choisit entre le niveau 1 et le niveau 2. */
    photo: PHOTOS_COURS.sira,
    /* La mention du JOUR a été retirée le 02/09, avec l'arrivée de la Sîra
       femmes le jeudi : « Le week-end » n'était plus vrai, et énumérer
       quatre jours dans une puce de carte revient à recopier le planning,
       qui les donne séance par séance. Une carte de pôle dit ce qu'on y
       apprend ; le quand a sa section. */
    points: [
      'Fiqh — niveaux 1 et 2',
      'Cours de Sîra',
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

/* ---------- Le logo AME ----------
   Fourni par le client en PNG sur fond BLANC OPAQUE (aucune transparence,
   vérifié). Il a été détouré : l'aplat blanc est résolu en canal alpha, puis
   « démultiplié » pour retrouver la couleur d'origine — sans quoi les bords
   anticrénelés gardaient un halo blanc dès qu'on le posait ailleurs que sur
   du blanc. Les marges du fichier d'origine ont été recadrées.

   Deux limites relevées AU RENDU, à respecter pour tout nouvel emploi :
   — en dessous d'environ 110 px de large, « AME » devient illisible ;
   — sur un aplat orange, les lettres oranges du logo disparaissent. Le poser
     sur du plâtre, du blanc ou de l'encre, jamais sur --accent.

   Le sigle AME a été développé par la mosquée le 21/08 — et sa réponse
   s'est accompagnée d'une consigne : « on préfère pas que le terme
   association apparaisse ». Le développement n'est donc PAS publié, ni ici
   ni ailleurs, et le mot « association » ne figure dans aucune chaîne
   affichée. Le texte alternatif se réduit au sigle, qui est aussi ce que
   le logo montre.
   NE PAS « compléter » cet alt en développant le sigle.                     */
export const LOGO_AME = {
  src: `${BASE}logos/ame-640.webp`,
  repli: `${BASE}logos/ame-640.png`,
  largeur: 640,
  hauteur: 503,
  alt: 'AME',
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
   — Le CORAN FEMMES a été ANNULÉ le 21/08, en même temps que les séances
     hommes du lundi et du mercredi : « les cours en semaine, y'en aura pas,
     c'est annulé ». Le pôle Coran ne tient donc plus que deux séances, le
     vendredi soir et le dimanche matin, et elles sont réservées aux hommes.
     Le classeur des salles porte encore les créneaux supprimés : ne pas les
     réintroduire depuis lui.
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
/* Les créneaux ont porté un champ `support` — l'image de leur matière —
   du 24 au 26/08. Retiré : sept images dans une grille horaire tiraient
   l'œil vers elles alors qu'on y vient chercher une heure et une salle.
   Les images vivent dans PHOTOS_COURS et servent aux cartes de pôle et de
   formule ; les remettre ici ne demande qu'une ligne par créneau. */
export const CRENEAUX = [
  {
    /* Créé le 08/08 en remplacement de la séance du samedi matin :
       « le samedi c'est supprimé, et à la place c'est le vendredi à
       19h - 20h30 ».

       Le chevauchement relevé alors — 19h-20h30 contre 20h-21h30, même
       salle et même groupe — est tranché depuis le 21/08 : les séances en
       semaine sont annulées, celle-ci reste seule. */
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
    /* RÉOUVERT le 26/08. Le Coran femmes avait été annulé le 21/08 avec les
       séances de semaine ; la mosquée le remet, mais « pour l'instant pas le
       jour et l'horaire ».
       `jours: []` et `debut/fin: null` ne sont donc PAS des oublis : ils
       disent qu'aucun des deux n'est arrêté, et le planning sait déjà les
       traiter — la séance forme un bloc à part, rangé en fin de semaine,
       plutôt que d'occuper une colonne au hasard.
       Ne pas y mettre d'horaire « provisoire » : quelqu'un viendrait. */
    id: 'coran-f',
    poles: ['coran'],
    intitule: 'Coran',
    groupe: 'Femmes',
    public: 'Adultes',
    /* PROGRAMMÉ le 01/09 : « mardi et jeudi de 14h à 15h30 ». Le créneau
       était en attente depuis le 26/08, sans jour ni horaire ; il quitte
       donc le bloc « En attente de programmation » et rejoint la semaine.
       C'est aussi le retour de deux jours de SEMAINE au planning, qui
       n'affichait plus que vendredi, samedi et dimanche depuis le 21/08 :
       les colonnes suivent les jours réellement tenus, elles se rouvrent
       d'elles-mêmes.
       Salle précisée le 02/09. */
    debut: '14:00',
    fin: '15:30',
    jours: ['Mardi', 'Jeudi'],
    salle: 'Salle 5',
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
    /* PAS de `groupe`, et c'est VOULU : « sauf le Fiqh où là ne pas préciser
       car c'est homme et femme » (02/09). Les deux niveaux accueillent tout
       le monde. Ne pas « compléter » ce champ en croyant réparer un oubli :
       depuis cette date, une séance sans groupe est une séance ouverte à
       tous, et c'est ce que les textes du site annoncent. */
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
    /* Précisé le 02/09 : « toutes les horaires où c'est pas femme il faut
       mettre homme, sauf le Fiqh ». C'était la dernière séance dont le
       groupe restait indéterminé. */
    groupe: 'Hommes',
    public: 'Adultes',
    debut: '19:00',
    fin: '21:00',
    jours: ['Samedi'],
    salle: 'Salle 5',
    formules: ['sciences'],
  },
  {
    /* AJOUTÉE le 02/09 : « le jeudi à 17h30 à 19h30, Sîra femmes ».
       La séance du samedi ne porte AUCUN groupe et n'en reçoit pas ici :
       la mosquée n'a pas dit qu'elle devenait réservée aux hommes, et le
       déduire de l'existence d'une séance femmes serait une invention.
       À lui faire préciser. La salle, elle, l'a été le 02/09. */
    id: 'sira-f',
    poles: ['sciences'],
    intitule: 'Sîra',
    detail: 'Biographie du Prophète',
    salutation: 'ﷺ',
    groupe: 'Femmes',
    public: 'Adultes',
    debut: '17:30',
    fin: '19:30',
    jours: ['Jeudi'],
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
     salle 5 avait survécu à ce tri : il ne figurait pas dans la liste
     transmise. Il a été annulé séparément le 21/08, avec toutes les
     séances de semaine. Le pôle Coran ne tient plus que le vendredi soir
     et le dimanche matin. */
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
    /* CORRIGÉS le 24/08. Ces deux lignes étaient restées à l'ancienne offre :
       « En semaine ou le week-end » et « en après-midi » décrivaient les
       séances du lundi, du mercredi et celles des femmes, toutes annulées
       le 21/08. La carte se contredisait elle-même — son propre planning,
       deux blocs plus bas, n'annonce que le vendredi et le dimanche. */
    /* Quatre jours depuis le 01/09 : les séances femmes du mardi et du
       jeudi s'ajoutent à celles des hommes. « Le vendredi et le dimanche »
       ne décrivait plus que la moitié de la formule. */
    rythme: 'En semaine et le week-end',
    prix: 80,
    prixNote: null,
    resume: 'Lecture, tajwîd et mémorisation — le mardi et le jeudi en après-midi, le vendredi en soirée, tôt le dimanche matin.',
    inclus: ['Lecture du Coran', 'Tajwîd', 'Mémorisation', 'Révision'],
    /* Les supports montrés dans la carte, à la demande de la mosquée le
       24/08 : « dans la formule, là où il y a le prix, que le livre il
       apparaisse ». Ce sont les mêmes images que dans la section « Les
       cours » — le rappel est voulu : on choisit sa formule ici, pas là. */
    supports: [PHOTOS_COURS.coran],
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
    /* Les deux tomes du livre de lecture depuis le 26/08, à la place de la
       planche d'alphabet : la carte de formule montre ce sur quoi on
       travaille, pas une illustration de la matière. */
    supports: [PHOTOS_COURS.lecture1, PHOTOS_COURS.lecture2],
    poles: ['alphabetisation'],
  },
  {
    key: 'sciences',
    numero: 3,
    nom: 'Sciences musulmanes',
    sousTitre: 'Sîra & Fiqh',
    /* Quatre jours depuis le 02/09 : la Sîra femmes du jeudi s'ajoute au
       samedi et au dimanche. « Le week-end » ne décrivait plus la formule. */
    rythme: 'En semaine et le week-end',
    prix: 80,
    prixNote: null,
    resume: 'La jurisprudence et la vie du Prophète, du jeudi au dimanche soir.',
    inclus: ['Cours de Sîra', 'Cours de Fiqh'],
    /* LES DEUX OUVRAGES, demandés le 25/08 : « il faut mettre les livres
       dans la card correspondante ». La photo de la Sîra les avait
       remplacés un temps parce que les deux couvertures n'avaient pas la
       même hauteur — réglé autrement depuis, en imposant la HAUTEUR des
       images plutôt que leur largeur (voir tarifs.css). Elles font donc la
       même hauteur, et c'est leur largeur qui diffère.
       La Sîra n'a pas d'ouvrage transmis ; « Cours de Sîra » reste annoncé
       au programme juste au-dessus. */
    supports: [PHOTOS_COURS.fiqhNiveau1, PHOTOS_COURS.fiqhNiveau2],
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

/* SUPPRIMÉS le 02/09 à la demande de la mosquée. C'étaient les trois
   arguments du bas de l'affiche : « Paiement en une fois ou échelonné »,
   « Enseignement de qualité », « Ambiance fraternelle et bienveillante ».

   Les deux derniers étaient des promesses invérifiables, de la même famille
   que les « professeurs qualifiés » retirés le 08/08 — la note laissée ici
   le signalait déjà. Le premier était un doublon : le règlement échelonné
   est annoncé dans l'introduction de la section ET dans les moyens de
   paiement de l'inscription, avec son détail.

   Le tableau `ARGUMENTS` est retiré plutôt que vidé : un tableau vide se
   remplit un jour sans qu'on se souvienne de pourquoi il l'était. */

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
  /* UNE SEULE RENTRÉE depuis le 26/08. Il y en avait deux, confirmées le
     07/08 : le Coran ouvrait trois semaines avant les autres, le 14
     septembre. La mosquée l'a décalé — « la rentrée Coran, on a décalé à
     octobre comme tout le monde » — et les deux jalons n'en font plus
     qu'un.
     Ne pas réintroduire la date du 14 septembre : elle est périmée, pas
     oubliée. */
  { key: 'rentree', libelle: 'Rentrée des cours', court: 'Rentrée', debut: '2026-10-03', fin: null, type: 'jalon', provisoire: false },

  /* VACANCES — confirmées le 21/08. La mosquée ne fixe pas son propre
     calendrier : « on se cale sur les vacances scolaires ». La règle vaut
     donc source, et les dates ci-dessous ont été relevées sur le calendrier
     officiel 2026-2027 pour la ZONE B — Le Havre relève de l'académie de
     Normandie, qui en fait partie. Elles ne sont plus provisoires.
     Si une année la zone change, c'est ici qu'on recale, pas au jugé. */
  { key: 'toussaint', libelle: 'Vacances de la Toussaint', debut: '2026-10-17', fin: '2026-11-02', type: 'vacances', provisoire: false },
  /* EXAMENS — la mosquée donne une RÈGLE, pas des dates : « dernière
     semaine à chaque trimestre ». Trois trimestres d'octobre à juin, quatre
     coupures scolaires : la répartition ci-dessous place chaque session sur
     la dernière semaine de cours avant Noël, avant les vacances de
     printemps et avant l'été. C'est la lecture la plus naturelle de la
     règle, ce n'est pas une confirmation — d'où `provisoire` maintenu.
     « Dernière semaine de décembre » au sens littéral tomberait pendant les
     vacances de Noël : il s'agit de la dernière semaine de COURS. */
  { key: 'examen-t1', libelle: 'Examens du 1er trimestre', debut: '2026-12-14', fin: '2026-12-18', type: 'examen', provisoire: true },
  { key: 'noel', libelle: 'Vacances de Noël', debut: '2026-12-19', fin: '2027-01-04', type: 'vacances', provisoire: false },
  { key: 'hiver', libelle: 'Vacances d’hiver', debut: '2027-02-20', fin: '2027-03-08', type: 'vacances', provisoire: false },
  { key: 'examen-t2', libelle: 'Examens du 2e trimestre', debut: '2027-04-12', fin: '2027-04-16', type: 'examen', provisoire: true },
  { key: 'printemps', libelle: 'Vacances de printemps', debut: '2027-04-17', fin: '2027-05-03', type: 'vacances', provisoire: false },
  { key: 'examen-t3', libelle: 'Examens du 3e trimestre', debut: '2027-06-28', fin: '2027-07-02', type: 'examen', provisoire: true },
  /* Les vacances d'été de la zone B s'ouvrent le 3 juillet 2027. Se caler
     sur elles place la fin des cours la veille. Reste provisoire : la règle
     porte sur les VACANCES, et rien ne dit que la mosquée enseigne jusqu'au
     dernier jour scolaire. L'ancienne date, le 26 juin, était inventée. */
  { key: 'fin', libelle: 'Fin des cours', court: 'Fin des cours', debut: '2027-07-02', fin: null, type: 'jalon', provisoire: true },
]

/* La réserve ne porte plus que sur ce qui reste incertain. Depuis le 21/08,
   la rentrée ET les vacances sont établies : la première par la mosquée,
   les secondes par la règle qu'elle a donnée (« on se cale sur les vacances
   scolaires ») appliquée au calendrier officiel de la zone B. Ne restent
   provisoires que les trois sessions d'examens et la fin des cours.
   Distinguer importe : douter de tout ferait douter de la date de rentrée,
   qui est précisément celle sur laquelle on s'inscrit. */
export const MENTION_CALENDRIER =
  'La rentrée est confirmée et les vacances suivent le calendrier scolaire de la zone B. Les sessions d’examens restent à confirmer.'

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
    /* « en ligne ou sur place » depuis le 24/08 : la campagne HelloAsso
       existe, l'étape ne peut plus annoncer le seul règlement sur place.
       L'ordre n'est pas neutre — en ligne d'abord, parce que c'est le seul
       des deux qui se fait depuis cette page. */
    texte: "Le règlement se fait en ligne ou sur place, en une fois ou échelonné.",
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
  /* Campagne d'adhésion fournie le 24/08. Elle est portée par « Le Phare /
     Al Manara », qui gère l'enseignement — et non par la mosquée elle-même :
     l'identifiant de l'URL le dit, et cette différence a été confirmée.
     Le nom de cette structure n'est PAS écrit sur le site : aucune source
     publique ne donne sa dénomination exacte (absente du répertoire SIRENE),
     et la mosquée a par ailleurs demandé que le mot « association »
     n'apparaisse pas. Le visiteur le lira sur la page HelloAsso elle-même.
     Si la mosquée veut une phrase d'explication ici, c'est à elle de la
     formuler. */
  {
    key: 'helloasso',
    libelle: 'En ligne — HelloAsso',
    detail: 'Sans frais pour la mosquée.',
    /* URL remplacée le 26/08 — l'ancienne pointait sur « le-phare-al-manara ».
       Une seule ligne à changer : NAV_CTA et INSCRIPTION_EN_LIGNE la
       reprennent d'ici, et les six boutons « S'inscrire » de la page en
       découlent. Ne pas la recopier ailleurs. */
    url: 'https://www.helloasso.com/associations/association-le-phare-76/adhesions/cours',
  },
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
  /* « Inscription » RETIRÉE le 24/08 : la section n'est plus rendue (voir
     Vitrine.jsx). Cette liste alimente la barre, le plan du site du pied et
     l'espion de défilement — y laisser une entrée sans cible produirait un
     lien mort et un onglet actif impossible à atteindre. */
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
    "Le rythme de l’année en une seule lecture : rentrée, périodes de cours, vacances et sessions d’examens.",
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
  /* Repli quand `jours` est vide. RÉÉCRIT le 26/08 : le texte affirmait que
     « l'horaire de ce cours est arrêté », ce qui était vrai du cas d'alors et
     faux du seul cas actuel — le Coran femmes n'a ni jour ni horaire. */
  attenteTitre: 'En attente de programmation',
  attenteTexte:
    'Le jour et l’horaire de ce cours restent à fixer par l’équipe pédagogique. Ils seront annoncés ici dès qu’ils le seront.',
  attenteJours: 'Jour et horaire à venir',
  // Tient la place de l'heure sur la carte, au planning comme aux tarifs.
  attenteHoraire: 'Horaire à venir',
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

/* L'adresse est connue : la phrase d'attente n'a plus d'objet. Elle ne dit
   pour autant rien de plus que ce qui est établi — pas de nom de quartier,
   que personne n'a communiqué. */
/* La phrase d'attente n'a plus d'objet : le plan est là. Elle dit désormais
   ce que le clic FAIT, puisque l'image seule ne l'annonce pas. */
export const MENTION_CARTE = 'La mosquée est signalée au centre du plan.'

/* SUPPRIMÉ le 21/08. La ligne « Secrétariat » attendait des horaires
   d'ouverture ; la mosquée répond qu'elle n'en a pas : « on n'a pas
   d'horaires fixes, donc ne le mets pas ». Une pastille d'attente ne se
   justifie que si la donnée doit arriver. Ici elle n'arrivera jamais :
   la ligne entière disparaît de la section Contact.
   Ne pas la réintroduire « en attendant les horaires ». */

/* ---------- Section « Les cours » ----------
   Libellés éditoriaux du bloc des trois pôles. Regroupés ici pour
   qu'aucun texte ne vive en dur dans le composant. */
export const COURS_INTRO = {
  surtitre: 'Les trois pôles',
  titre: 'Ce que l’on apprend ici',
  chapeau:
    "Trois enseignements, du tout premier alphabet jusqu’aux longues sourates.",
  /* RETOURNÉE le 02/09. Elle disait « sauf mention contraire, les groupes
     sont séparés » — ce qui supposait qu'une séance mixte porte une étiquette.
     La mosquée demande l'inverse : le Fiqh accueille tout le monde et ne
     porte AUCUNE étiquette. C'est donc l'absence de mention qui signifie
     « ouvert à tous », et la phrase doit le dire dans ce sens-là. */
  mentionMixite:
    'Les séances marquées « Hommes » ou « Femmes » sont réservées à ce groupe ; les autres sont ouvertes à tous.',
  groupe: 'groupe ouvert',
  groupes: 'groupes ouverts',
  groupesAConfirmer: 'Groupes à confirmer',
  /* Même formulation qu'au planning et aux tarifs — la mosquée a demandé
     « horaire et jour à venir ». Trois endroits disent la même chose du même
     créneau ; qu'ils le disent avec les mêmes mots. */
  joursAConfirmer: 'Jour et horaire à venir',
  lienCreneaux: 'Voir les créneaux',
}

/* ---------- Chrome : barre de navigation et pied de page ---------- */

/* Le bouton d'action de la barre. */
/* ---------- Où mène « S'inscrire » ----------
   DÉPLACÉ HORS DU SITE le 24/08. L'inscription se fait désormais sur la
   campagne HelloAsso, qui recueille l'identité, le niveau et le règlement
   en une seule fois. La section « Inscription » de ce site faisait double
   emploi avec elle — et son formulaire n'envoyait rien à personne.

   Une seule constante porte l'adresse, et elle la reprend de
   MOYENS_REGLEMENT : deux endroits où écrire la même URL, c'est un endroit
   de trop, et c'est celui qu'on oublie de mettre à jour.

   `externe: true` n'est pas décoratif — il commande l'ouverture dans un
   nouvel onglet, le `rel` et la mention lue par les lecteurs d'écran. */
export const INSCRIPTION_EN_LIGNE = {
  href: MOYENS_REGLEMENT.find((m) => m.key === 'helloasso')?.url ?? null,
  libelle: 'S’inscrire',
  /* Annoncé aux lecteurs d'écran, jamais affiché : un lien qui change de
     site sans prévenir désoriente, et l'icône seule ne se lit pas. */
  mentionNouvelOnglet: 'nouvelle fenêtre',
}

export const NAV_CTA = {
  href: INSCRIPTION_EN_LIGNE.href,
  libelle: INSCRIPTION_EN_LIGNE.libelle,
  externe: true,
}

/* Deux entrées de SECTIONS ne sont pas reprises dans les liens de la barre :
   le logo mène déjà à l'accueil et le bouton mène déjà à l'inscription.
   Les répéter allongerait la barre sans rien apprendre au lecteur.
   Le menu mobile et le plan du site du pied de page, eux, listent TOUT. */
/* « inscription » n'y figure plus : elle a quitté SECTIONS. */
export const NAV_EXCLUS = ['accueil']

export const PIED = {
  /* `titre` et `intro` SUPPRIMÉS le 24/08. Le bloc « La mosquée, en bref »
     répétait la section Contact qui le précède immédiatement : même
     surtitre, même promesse de réponse du secrétariat. Un pied de page
     récapitule des coordonnées, il n'ouvre pas un second contact. */
  /* Reste `null`, et ce n'est plus un TODO : la mosquée demande le 21/08
     que le terme « association » n'apparaisse pas sur le site. Une mention
     de forme juridique le ferait revenir par la fenêtre, sur la ligne la
     plus officielle de la page. « Association loi 1901 » y avait d'ailleurs
     été affirmé sans source. Le colophon se rend sans cette mention. */
  statut: null,
  // TODO — à confirmer : ligne téléphonique et adresse e-mail du secrétariat.
  contactSecours:
    "Le secrétariat n’a pas encore de ligne dédiée. En attendant, les demandes passent par le formulaire d’inscription en ligne.",
  /* TODO — à rédiger puis publier. Tant que `url` est nulle, le colophon
     n'affiche RIEN : la pastille « à publier » a été retirée le 24/08 sur
     demande — elle signalait un chantier interne à des visiteurs que ça ne
     regarde pas. Renseigner l'URL fait réapparaître le lien tout seul.
     À faire AVANT de brancher l'envoi du formulaire d'inscription : dès
     qu'il transmettra des données personnelles, la page devient exigible. */
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
  /* RÉÉCRIT le 02/09 : « les groupes sont séparés hommes et femmes » est
     devenu faux pour le Fiqh, qui accueille tout le monde. Le premier écran
     renvoie donc au planning plutôt que d'énoncer une règle générale que
     l'une des matières dément. */
  chapo: 'Le planning indique, séance par séance, le groupe concerné.',
  /* Pointe hors du site depuis le 24/08 — voir INSCRIPTION_EN_LIGNE. */
  ctaPrimaire: { libelle: 'S’inscrire', href: null, externe: true },
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
  /* Même mot qu'au planning : « support » et non « ouvrage étudié ». La
     mosquée a transmis ces images comme celles de ces cours, elle n'a pas
     écrit qu'ils suivent ces livres page à page. */
  supports: 'Supports du cours',
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
  adresseAConfirmer: 'Rue et numéro à confirmer',
  telAConfirmer: 'Numéro à confirmer',
  /* « Adresse à confirmer » se lisait ici sous l'étiquette E-mail, deux
     lignes sous l'adresse POSTALE : depuis que celle-ci est connue, la
     pastille donnait l'impression contraire. On nomme la donnée manquante. */
  emailAConfirmer: 'E-mail à confirmer',
  planTitre: 'Plan d’accès',
  itineraire: 'Ouvrir dans Google Maps',
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
  /* `emailAConfirmer` du pied de page SUPPRIMÉ le 24/08 : la ligne e-mail
     ne s'affiche plus tant que l'adresse manque, il n'y a donc plus rien à
     libeller. Celui de CONTACT_LIBELLES reste — il sert encore à la section
     Inscription, conservée mais non rendue. */
  annee: 'Année scolaire',
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
/* RÉÉCRITES le 24/08. Les trois phrases renvoyaient au « formulaire
   d'inscription en ligne » de ce site — qui n'est plus rendu. Une phrase de
   secours qui désigne un chemin fermé est pire que pas de phrase du tout :
   elle envoie quelqu'un contre une porte.
   Chacune renvoie désormais vers le canal qui EXISTE dans son cas. */
export const PIED_SECOURS = {
  /* Le téléphone manque : reste la campagne d'inscription, qui recueille
     les coordonnées de qui la remplit. */
  tel: 'Le secrétariat n’a pas encore de ligne dédiée. En attendant, les demandes passent par la campagne d’inscription en ligne.',
  /* La variante « e-mail seul manquant » a été SUPPRIMÉE le 24/08 : elle
     annonçait aux visiteurs une lacune que la mosquée préfère taire, et le
     téléphone suffit à la joindre. Le bloc entier ne se rend plus que si le
     NUMÉRO manque. */
  /* Les deux manquent : on ne cumule pas deux phrases, on en dit une. */
  lesDeux: 'Le secrétariat n’a pas encore de coordonnées directes. En attendant, les demandes passent par la campagne d’inscription en ligne.',
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
          /* Réponse de la mosquée, conservée mot pour mot. Une phrase lui a
             été AJOUTÉE le 21/08, sans rien retrancher : depuis l'annulation
             des séances de semaine, le pôle Coran ne tient plus que deux
             créneaux, tous deux hommes. Un « oui » seul enverrait une femme
             s'inscrire à une formule qui n'a pas de séance pour elle. Le
             renvoi au planning dit le vrai sans contredire la mosquée.
             À REVOIR avec elle si un créneau Coran femmes rouvre. */
          r: 'Oui. Les cours sont ouverts aux hommes et aux femmes, dans le respect de l’organisation mise en place par la mosquée. Le planning indique, séance par séance, le groupe concerné.',
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
          /* « pendant les horaires d'ouverture » retiré le 21/08 : la
             mosquée n'a pas d'horaires fixes de secrétariat, la phrase
             renvoyait donc à une information inexistante. */
          r: 'Par le formulaire d’inscription de ce site, qui comporte un champ de message libre, par téléphone, ou directement sur place à la Mosquée En-Nour.',
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
