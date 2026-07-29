import { ORG, POLES, CRENEAUX, HERO, PHOTOS, estAConfirmer } from '../data/contenu.js'

/* ============================================================
   MOSQUÉE EN-NOUR — Premier écran (#accueil).

   Le parti pris a changé sur demande de la mosquée : l'écran ne
   s'ouvre plus sur un slogan mais sur le LIEU. Le nom, la photo de
   la porte, et ce que la mosquée propose — rien d'autre.

   Le <h1> est le nom de la mosquée. C'est aussi le titre le plus
   juste pour la page : un site de mosquée dont le premier titre
   serait une accroche publicitaire se présenterait mal.

   La photo est cadrée par le masque en arche (.lp-arche) : la
   porte du bâtiment sert de cadre à sa propre image. Elle ne fait
   que 214 px de large — on la borne donc en largeur plutôt que de
   l'étirer, quitte à ce qu'elle reste modeste.
   ============================================================ */

/* Créneaux réellement programmés chaque semaine. Compter CRENEAUX.length
   annoncerait 6 alors que « Fiqh — niveau 1 » n'a aucun jour arrêté et se
   range, plus bas, sous « En attente de programmation ». */
const NB_CRENEAUX_PROGRAMMES = CRENEAUX.filter((c) => c.jours?.length > 0).length

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
  /* Les repères sont rendus à leur valeur dès le premier passage : aucun
     compte à rebours animé, qui les afficherait à « 0 » pour un robot
     d'indexation ou un onglet en arrière-plan.
     `valeur: null` déclenche l'état d'attente. */
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

  const photo = PHOTOS.entree

  return (
    <section id="accueil" className="lp-section lp-hero" aria-labelledby="lp-hero-titre">
      {/* Le décor porte l'overflow, pas la section : sinon un contour de
          focus posé sur un bouton en bord de cadre serait rogné. */}
      <div className="lp-hero__decor" aria-hidden="true">
        <div className="lp-nour lp-hero__nour" />
        <div className="lp-grain lp-hero__grain" />
        <div className="lp-arcade lp-arcade--fondu lp-hero__arcade" />
      </div>

      <div className="lp-wrap lp-hero__corps">
        <div className="lp-hero__intro">
          <h1 id="lp-hero-titre" className="lp-h1 lp-hero__titre lp-hero__entree">
            <span className="lp-hero__nom">{ORG.nom}</span>
            {/* lang + dir portés par l'élément lui-même : sans eux, un
                lecteur d'écran francophone épelle l'arabe caractère par
                caractère. `.lp-arabe` isole aussi la direction, pour que le
                RTL ne déborde pas sur le nom latin. */}
            <span className="lp-arabe lp-hero__arabe" lang="ar" dir="rtl">
              {ORG.nomArabe}
            </span>
          </h1>

          <p className="lp-caption lp-hero__lieu lp-hero__entree" style={{ '--entree-retard': '70ms' }}>
            {ORG.baseline}
          </p>

          <div className="lp-hero__mission lp-hero__entree" style={{ '--entree-retard': '160ms' }}>
            <p className="lp-eyebrow">{HERO.mission.surtitre}</p>
            <hr className="lp-filet lp-hero__filet" />
            <p className="lp-lead lp-hero__mission-texte">{HERO.mission.texte}</p>
            {/* La réserve suit immédiatement la mention « à partir de 6 ans » :
                elle n'a de sens qu'accolée à elle. */}
            <p className="lp-hero__reserve">
              <span className="lp-attente">{HERO.mission.reserve}</span>
            </p>
            <p className="lp-small lp-hero__mixite">{HERO.chapo}</p>
          </div>

          <div className="lp-hero__actions lp-hero__entree" style={{ '--entree-retard': '300ms' }}>
            <a className="lp-btn lp-btn--primaire" href={HERO.ctaPrimaire.href}>
              {HERO.ctaPrimaire.libelle}
            </a>
            <a className="lp-btn lp-btn--secondaire" href={HERO.ctaSecondaire.href}>
              {HERO.ctaSecondaire.libelle}
            </a>
          </div>
        </div>

        {/* La photo n'est pas décorative : elle montre le lieu où l'on se
            rend. Elle porte donc un vrai texte alternatif et une légende. */}
        {/* Cadre rectangulaire, et non le masque en arche du système : la
            photo montre DÉJÀ un arc outrepassé. La découper en arche
            produisait une arche dans une arche — illisible — et rognait
            l'enseigne. L'arche reste le motif directeur ailleurs (la marque,
            la bande d'arcade) ; ici c'est le bâtiment qui la porte. */}
        <figure className="lp-hero__figure lp-hero__entree" style={{ '--entree-retard': '220ms' }}>
          <div className="lp-hero__cadre">
            <img
              className="lp-hero__photo"
              src={photo.src}
              width={photo.largeur}
              height={photo.hauteur}
              alt={photo.alt}
              loading="eager"
              decoding="async"
            />
          </div>
        </figure>
      </div>

      <div className="lp-wrap lp-hero__pied lp-hero__entree" style={{ '--entree-retard': '420ms' }}>
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

          <a className="lp-hero__descente" href={HERO.descente.href}>
            <span>{HERO.descente.libelle}</span>
            <FlecheBas />
          </a>
        </div>
      </div>
    </section>
  )
}
