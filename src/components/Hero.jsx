import { ORG, POLES, CRENEAUX, HERO, estAConfirmer } from '../data/contenu.js'

/* ============================================================
   LE PHARE — Premier écran (#accueil).

   Parti pris : la nuit occupe le haut de l'écran, le texte se pose
   en bas. C'est le contraste entre la masse sombre et le seul point
   de lumière chaude qui porte la section — pas un empilement centré.
   Le faisceau (unique sur toute la page) balaie depuis un foyer haut
   à droite ; à l'arrêt il tombe en diagonale sur le titre.
   ============================================================ */

/* Le prédicat « donnée en attente » est celui de contenu.js, importé et non
   recopié : trois versions divergentes cohabitaient sur le site. */

/* Créneaux réellement programmés chaque semaine. Compter CRENEAUX.length
   annoncerait 6 alors que « Fiqh — niveau 1 » n'a aucun jour arrêté et se
   range, 500px plus bas, sous « En attente de programmation ». */
const NB_CRENEAUX_PROGRAMMES = CRENEAUX.filter((c) => c.jours?.length > 0).length

/* Flèche de descente. Dessinée en SVG plutôt qu'en bordure CSS : la
   direction visuelle n'est pas un filet, et le système n'autorise que
   .lp-filet, .lp-rule et .lp-horizon. */
function FlecheBas() {
  return (
    <svg
      className="lp-hero__fleche"
      width="13"
      height="18"
      viewBox="0 0 13 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6.5 1v14M1.75 11.5 6.5 16.5l4.75-5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  /* Les repères sont RENDUS À LEUR VALEUR dès le premier passage. Un
     compte à rebours animé les affichait à « 0 » tant que
     requestAnimationFrame n'avait pas tourné : onglet en arrière-plan,
     robot d'indexation, capture d'aperçu social, le premier écran
     annonçait « 0 pôles d'enseignement ». La direction demande d'ailleurs
     que l'énergie ne vienne pas du mouvement.
     `valeur: null` déclenche l'état d'attente : listes vides ou année
     scolaire non renseignée. */
  const reperes = [
    {
      cle: 'poles',
      valeur: POLES.length > 0 ? String(POLES.length) : null,
      libelle: HERO.reperes.poles,
    },
    {
      cle: 'creneaux',
      valeur: NB_CRENEAUX_PROGRAMMES > 0 ? String(NB_CRENEAUX_PROGRAMMES) : null,
      libelle: HERO.reperes.creneaux,
    },
    {
      cle: 'annee',
      valeur: estAConfirmer(ORG.anneeScolaire) ? null : ORG.anneeScolaire,
      libelle: HERO.reperes.annee,
      long: true,
    },
  ]

  return (
    <section
      id="accueil"
      className="lp-section lp-hero"
      aria-labelledby="lp-hero-titre"
    >
      {/* Le décor porte l'overflow, pas la section : sinon un contour de
          focus posé sur un bouton en bord de cadre serait rogné. */}
      <div className="lp-hero__decor" aria-hidden="true">
        <div
          className="lp-faisceau lp-faisceau--tourne lp-hero__faisceau"
          style={{ '--faisceau-x': '76%', '--faisceau-y': '9%', '--faisceau-depart': '186deg' }}
        />
        <div className="lp-grain lp-hero__grain" />
        <div className="lp-vagues lp-vagues--fondu lp-hero__vagues" />
      </div>

      <div className="lp-wrap lp-hero__corps">
        <div className="lp-hero__intro">
          <p className="lp-eyebrow lp-hero__entree">{ORG.baseline}</p>
          <hr
            className="lp-filet lp-hero__filet lp-hero__entree"
            style={{ '--entree-retard': '70ms' }}
          />

          <h1
            id="lp-hero-titre"
            className="lp-display lp-hero__titre lp-hero__entree"
            style={{ '--entree-retard': '140ms' }}
          >
            {HERO.titre.lignes.map((ligne) => (
              <span className="lp-hero__ligne" key={ligne}>
                {ligne}
              </span>
            ))}
            <span className="lp-hero__ligne lp-hero__ligne--lumiere">
              {HERO.titre.lumiere}
            </span>
          </h1>

          <p
            className="lp-lead lp-hero__lead lp-hero__entree"
            style={{ '--entree-retard': '260ms' }}
          >
            {HERO.chapo}
          </p>

          <div
            className="lp-hero__actions lp-hero__entree"
            style={{ '--entree-retard': '360ms' }}
          >
            <a className="lp-btn lp-btn--primaire" href={HERO.ctaPrimaire.href}>
              {HERO.ctaPrimaire.libelle}
            </a>
            <a className="lp-btn lp-btn--secondaire" href={HERO.ctaSecondaire.href}>
              {HERO.ctaSecondaire.libelle}
            </a>
          </div>
        </div>

        <div className="lp-hero__pied lp-hero__entree" style={{ '--entree-retard': '500ms' }}>
          <hr className="lp-rule lp-hero__rule" />

          <div className="lp-hero__barre">
            <dl className="lp-hero__reperes">
              {reperes.map((repere) => (
                <div className="lp-hero__repere" key={repere.cle}>
                  {/* <dt> avant <dd> dans le DOM (ordre attendu d'une liste de
                      définitions) ; l'inversion visuelle est faite en CSS. */}
                  <dt className="lp-caption lp-hero__repere-libelle">{repere.libelle}</dt>
                  <dd
                    className={
                      'lp-chiffre lp-num lp-hero__repere-valeur' +
                      (repere.long ? ' lp-hero__repere-valeur--long' : '')
                    }
                  >
                    {repere.valeur === null ? (
                      <span className="lp-attente">{HERO.attente}</span>
                    ) : (
                      repere.valeur
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Indication de descente : un vrai lien vers la section suivante,
                pas un ornement. Elle ferme la barre de repères par la droite —
                aucune animation en boucle, le survol suffit. */}
            <a className="lp-hero__descente" href={HERO.descente.href}>
              <span>{HERO.descente.libelle}</span>
              <FlecheBas />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
