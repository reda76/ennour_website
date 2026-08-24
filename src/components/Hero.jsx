import { ORG, POLES, CRENEAUX, HERO, estAConfirmer } from '../data/contenu.js'
import LienInscription from './LienInscription.jsx'

/* ============================================================
   MOSQUÉE EN-NOUR — Premier écran (#accueil).

   Le parti pris a changé sur demande de la mosquée : l'écran ne
   s'ouvre plus sur un slogan mais sur le LIEU : son nom, ce qu'il
   propose, et sa géométrie.

   Le <h1> est le nom de la mosquée. C'est aussi le titre le plus
   juste pour la page : un site de mosquée dont le premier titre
   serait une accroche publicitaire se présenterait mal.

   La colonne de droite portait la photo de la façade. Celle-ci
   n'avait été fournie que comme référence de couleur — elle a donc
   été retirée, et le portail dessiné prend sa place.
   ============================================================ */

/* Le repère compte des SÉANCES, pas des entrées de CRENEAUX : une entrée
   posée sur trois jours vaut trois séances dans la semaine.
   `auChoix` est l'exception qui compte pour UNE : l'affiche écrit « Samedi
   OU Dimanche », l'élève ne vient qu'un des deux jours. La compter deux fois
   annoncerait une offre deux fois plus large que celle qui existe.
   Même règle que la section « Les cours » et que le planning — les trois
   décomptes de la page doivent tomber sur le même chiffre. */
const NB_SEANCES_SEMAINE = CRENEAUX.reduce(
  (total, c) => total + (c.auChoix ? 1 : (c.jours?.length ?? 0)),
  0,
)

/* Le portail : trois arcs emboîtés, la géométrie de la porte de la mosquée
   ramenée à ses lignes. Il remplace la photo — qui n'était fournie que comme
   référence de couleur — et règle du même coup son défaut : un tracé ne peut
   pas être flou, quelle que soit la taille de l'écran.

   Les arcs intérieurs sont le MÊME tracé, réduit autour du point (140, 368) :
   le pied de l'arc reste donc calé au sol pendant que la voûte se resserre,
   ce qui est exactement le dessin d'un portail en retrait. */
const ARC = 'M20 368V208c-20-33-20-73 0-107 20-47 80-67 120-86 40 19 100 39 120 86 20 34 20 74 0 107v160'

function Portail() {
  return (
    <svg
      className="lp-hero__portail"
      viewBox="0 0 280 380"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      {[
        { echelle: 1, opacite: 0.9, epaisseur: 2 },
        { echelle: 0.78, opacite: 0.55, epaisseur: 1.6 },
        { echelle: 0.56, opacite: 0.3, epaisseur: 1.3 },
      ].map(({ echelle, opacite, epaisseur }) => (
        <path
          key={echelle}
          d={ARC}
          transform={`translate(140 368) scale(${echelle}) translate(-140 -368)`}
          stroke="currentColor"
          strokeOpacity={opacite}
          strokeWidth={epaisseur / echelle}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {/* Le seuil : sans lui les trois arcs flottent. */}
      <path d="M4 368h272" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

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
      valeur: NB_SEANCES_SEMAINE > 0 ? String(NB_SEANCES_SEMAINE) : null,
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
            {/* La réserve qui accompagnait « à partir de 6 ans » a été retirée
                en même temps que cette mention : l'offre publiée est
                exclusivement adulte, il n'y a plus rien à réserver. */}
            <p className="lp-small lp-hero__mixite">{HERO.chapo}</p>
          </div>

          {/* L'annonce d'ouverture est la seule information datée du premier
              écran, et la seule qui appelle un geste. Elle se pose donc contre
              les boutons qui la servent, et non dans un bandeau flottant.
              Volontairement PAS un titre : ouvrir un niveau de hiérarchie sous
              le <h1> pour deux lignes désorganiserait le plan de la page.
              Volontairement pas la pastille .lp-attente non plus — celle-ci
              signale ce qui n'est pas arrêté ; ici tout l'est. */}
          <p className="lp-hero__annonce lp-hero__entree" style={{ '--entree-retard': '240ms' }}>
            <span className="lp-hero__annonce-titre">{HERO.annonce.titre}</span>
            <span className="lp-hero__annonce-detail">{HERO.annonce.detail}</span>
          </p>

          <div className="lp-hero__actions lp-hero__entree" style={{ '--entree-retard': '320ms' }}>
            <LienInscription className="lp-btn lp-btn--primaire">
              {HERO.ctaPrimaire.libelle}
            </LienInscription>
            <a className="lp-btn lp-btn--secondaire" href={HERO.ctaSecondaire.href}>
              {HERO.ctaSecondaire.libelle}
            </a>
          </div>
        </div>

        {/* Purement décoratif, donc hors du flux de lecture : le portail ne
            dit rien qu'un lecteur d'écran doive entendre. */}
        <div className="lp-hero__decor-arc lp-hero__entree" style={{ '--entree-retard': '220ms' }}>
          <Portail />
        </div>
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
