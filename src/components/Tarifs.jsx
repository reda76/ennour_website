import {
  FORMULES,
  MOYENS_REGLEMENT,
  ORG,
  SECTIONS,
  TARIFS_MENTION,
  TARIFS_TEXTES,
} from '../data/contenu.js'
import ScrollReveal from './ScrollReveal.jsx'

/* Le surtitre est repris de la navigation : un seul libellé à maintenir,
   et la section ne peut pas se désynchroniser du menu. */
const LIBELLE = SECTIONS.find((s) => s.id === 'tarifs')?.label ?? 'Formules & tarifs'

/* Deux formateurs figés au chargement du module : instancier un
   Intl.NumberFormat à chaque rendu coûte cher, et le cas décimal est
   trop rare pour mériter un calcul d'options à la volée. */
const EUR_ENTIER = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const EUR_DECIMAL = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/**
 * Formate un montant en euros, ou renvoie `null` si la donnée n'est pas
 * arrêtée (prix à null, marqueur « __A_CONFIRMER__ », NaN…).
 *
 * C'est l'UNIQUE point de bascule de la section : le jour où le bureau
 * renseigne un nombre dans FORMULES[].prix, la carte affiche le montant
 * formaté sans aucune autre retouche de code ni de style.
 */
function formaterPrix(prix) {
  if (typeof prix !== 'number' || !Number.isFinite(prix)) return null
  return Number.isInteger(prix) ? EUR_ENTIER.format(prix) : EUR_DECIMAL.format(prix)
}

/**
 * L'étagère du prix. Deux états, une seule et même place dans la carte :
 * une valeur en attente est une lumière, pas un trou.
 */
function Prix({ prix, prixNote }) {
  const montant = formaterPrix(prix)

  if (montant === null) {
    /* Aucun repli codé en dur : la phrase d'attente appartient à la formule
       (FORMULES[].prixNote). Sans note, on n'invente pas de texte — le bloc
       ne s'affiche simplement pas, et la mise au point sur les montants,
       en tête de section, reste la seule parole du site sur les tarifs. */
    return prixNote ? (
      <p className="lp-tarifs__attente">
        <span className="lp-attente">{prixNote}</span>
      </p>
    ) : null
  }

  return (
    <>
      <p className="lp-chiffre lp-num lp-tarifs__montant">{montant}</p>
      {prixNote ? <p className="lp-caption">{prixNote}</p> : null}
    </>
  )
}

function CarteFormule({ formule, delai }) {
  const { nom, rythme, prix, prixNote, inclus } = formule

  return (
    <ScrollReveal as="article" className="lp-card lp-tarifs__carte" delay={delai}>
      <header className="lp-tarifs__tete">
        <h3 className="lp-h3 lp-tarifs__nom">{nom}</h3>
        {rythme ? <p className="lp-caption lp-num lp-tarifs__rythme">{rythme}</p> : null}
      </header>

      <div className="lp-tarifs__prix">
        <Prix prix={prix} prixNote={prixNote} />
      </div>

      {inclus?.length ? (
        <ul className="lp-tarifs__inclus">
          {inclus.map((ligne) => (
            <li key={ligne}>{ligne}</li>
          ))}
        </ul>
      ) : null}

      <p className="lp-tarifs__liens">
        <a className="lp-lien" href="#cours">
          {TARIFS_TEXTES.voirPole}
          <span className="lp-visually-hidden"> — {nom}</span>
        </a>
        <a className="lp-lien" href="#inscription">
          {TARIFS_TEXTES.sInscrire}
          <span className="lp-visually-hidden"> — {nom}</span>
        </a>
      </p>
    </ScrollReveal>
  )
}

export default function Tarifs() {
  const formules = FORMULES ?? []
  const moyens = MOYENS_REGLEMENT ?? []
  const famille = TARIFS_MENTION?.famille
  const familleEnAttente = famille?.statut === 'a-confirmer'

  return (
    <section id="tarifs" className="lp-section lp-tarifs" aria-labelledby="tarifs-titre">
      <div className="lp-wrap">
        {/* En-tête sur deux colonnes : le titre tient sa colonne, la mise au
            point sur les montants tient l'autre — elle est trop importante
            pour être reléguée sous le titre. */}
        <ScrollReveal className="lp-tarifs__entete">
          <div className="lp-tarifs__titre">
            <p className="lp-eyebrow">{LIBELLE}</p>
            <hr className="lp-filet" />
            <h2 className="lp-h2" id="tarifs-titre">
              {TARIFS_MENTION.titre}
            </h2>
          </div>
          <div className="lp-tarifs__intro">
            <p className="lp-lead">{TARIFS_MENTION.montants}</p>
            <p className="lp-caption lp-tarifs__annee">
              {TARIFS_TEXTES.annee} <span className="lp-num">{ORG.anneeScolaire}</span>
            </p>
          </div>
        </ScrollReveal>

        {formules.length ? (
          <div className="lp-tarifs__grille">
            {formules.map((formule, i) => (
              <CarteFormule key={formule.key} formule={formule} delai={i * 90} />
            ))}
          </div>
        ) : (
          <p className="lp-tarifs__attente">
            <span className="lp-attente">{TARIFS_TEXTES.formulesAConfirmer}</span>
          </p>
        )}

        <hr className="lp-horizon lp-horizon--sourd lp-tarifs__coupure" />

        <ScrollReveal className="lp-tarifs__pied">
          <div className="lp-tarifs__reglement">
            <h3 className="lp-h4">{TARIFS_MENTION.reglementTitre}</h3>
            {moyens.length ? (
              <ul className="lp-tarifs__moyens">
                {moyens.map((moyen) => (
                  <li key={moyen.key}>
                    <p className="lp-tarifs__moyen">{moyen.libelle}</p>
                    {moyen.detail ? <p className="lp-small">{moyen.detail}</p> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="lp-tarifs__attente">
                <span className="lp-attente">{TARIFS_TEXTES.reglementAConfirmer}</span>
              </p>
            )}
          </div>

          {/* La colonne d'action : c'est elle qui porte la carte et l'unique
              bouton primaire de la section. */}
          <div className="lp-card lp-tarifs__action">
            {famille ? (
              <>
                <h3 className="lp-h4">{famille.libelle}</h3>
                <p className="lp-p">{famille.detail}</p>
                {familleEnAttente ? (
                  <p className="lp-tarifs__attente">
                    <span className="lp-attente">{TARIFS_TEXTES.familleAConfirmer}</span>
                  </p>
                ) : null}
                <hr className="lp-rule" />
              </>
            ) : null}
            <a className="lp-btn lp-btn--primaire lp-tarifs__cta" href="#inscription">
              {TARIFS_TEXTES.ctaInscription}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
