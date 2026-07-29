import { POLES, CRENEAUX, COURS_INTRO, COURS_TEXTES, DEVISE } from '../data/contenu.js'
import ScrollReveal from './ScrollReveal.jsx'
import Coran from './illustrations/Coran.jsx'
import Alphabetisation from './illustrations/Alphabetisation.jsx'
import Sciences from './illustrations/Sciences.jsx'

/**
 * Correspondance explicite entre la clé portée par le contenu
 * (`POLES[].illustration`) et le composant qui la dessine.
 *
 * Table et non import dynamique : le graphe des dépendances doit rester
 * lisible à la compilation — un `import()` calculé sur une chaîne de
 * données empêcherait le bundler de voir les trois fichiers. Une clé
 * inconnue ne renvoie rien : la carte se rend sans illustration plutôt
 * que de casser la page.
 */
const ILLUSTRATIONS = {
  coran: Coran,
  alphabetisation: Alphabetisation,
  sciences: Sciences,
}

/* La disjonction (« samedi ou dimanche ») est composée par Intl dans la
   langue du site : la conjonction n'est écrite nulle part à la main, et
   elle suivrait un changement de locale. DEVISE porte la seule locale que
   le contenu déclare. */
const LISTE_OU = new Intl.ListFormat(DEVISE.locale, { style: 'long', type: 'disjunction' })

/**
 * Ce qu'un pôle propose réellement dans une semaine, déduit du planning —
 * jamais recopié à la main, le chiffre suit donc toute correction apportée
 * à CRENEAUX.
 *
 * Trois précautions, qui sont les trois pièges des données :
 * — un créneau appartient au pôle si `poles` (au PLURIEL) le contient ;
 * — la séance du week-end relève de deux pôles mais reste UNE entrée :
 *   elle compte une fois de chaque côté, jamais deux fois du même ;
 * — `auChoix` vaut « Samedi OU Dimanche » : l'élève ne retient qu'un jour,
 *   compter les deux doublerait l'offre annoncée par l'affiche.
 */
function lireSeances(cle) {
  const creneaux = CRENEAUX.filter((c) => c.poles?.includes(cle))

  const nombre = creneaux.reduce((total, c) => {
    const jours = c.jours?.length ?? 0
    return total + (c.auChoix ? Math.min(jours, 1) : jours)
  }, 0)

  /* Les jours entre lesquels il faudra choisir, tous créneaux confondus :
     le Fiqh et la Sîra proposent le même couple, il n'est énoncé qu'une fois. */
  const jours = [...new Set(creneaux.filter((c) => c.auChoix).flatMap((c) => c.jours ?? []))]

  return {
    nombre,
    auChoix:
      jours.length > 1
        ? COURS_TEXTES.auChoixGabarit.replace(
            '{jours}',
            LISTE_OU.format(jours).toLocaleLowerCase(DEVISE.locale),
          )
        : null,
    // Un cours dont les jours ne sont pas arrêtés s'annonce, il ne se tait pas.
    joursIncomplets: creneaux.some((c) => !c.jours || c.jours.length === 0),
  }
}

/**
 * Le lien ancre nativement vers #planning (href réel : il fonctionne sans JS).
 * En complément on inscrit le pôle dans l'URL et on l'annonce par un événement,
 * tous deux écoutés par Planning — l'adresse partagée préfiltre le planning.
 * Le contrat n'a pas bougé : une CLÉ de pôle, celle de POLES[].key.
 */
function annoncerPole(cle) {
  const url = new URL(window.location.href)
  url.searchParams.set('pole', cle)
  window.history.replaceState(null, '', `${url.pathname}${url.search}`)
  window.dispatchEvent(new CustomEvent('lp:pole', { detail: cle }))
}

export default function Cours() {
  return (
    <section id="cours" className="lp-section lp-cours" aria-labelledby="cours-titre">
      {/* Le halo est le seul motif de la section : le faisceau reste au hero. */}
      <div className="lp-lueur lp-cours__lueur" aria-hidden="true" />

      <div className="lp-wrap lp-cours__wrap">
        <ScrollReveal as="header" className="lp-cours__entete">
          <div className="lp-cours__titraille">
            <p className="lp-eyebrow">{COURS_INTRO.surtitre}</p>
            <hr className="lp-filet" />
            <h2 id="cours-titre" className="lp-h2">{COURS_INTRO.titre}</h2>
          </div>

          <div className="lp-cours__intro">
            <p className="lp-lead">{COURS_INTRO.chapeau}</p>
            <hr className="lp-rule" />
            <p className="lp-small lp-cours__mention">{COURS_INTRO.mentionMixite}</p>
          </div>
        </ScrollReveal>

        <ul className="lp-cours__grille">
          {POLES.map((pole, i) => {
            const seances = lireSeances(pole.key)
            const points = Array.isArray(pole.points) ? pole.points : []
            /* Repli : une clé d'illustration inconnue ne dessine rien. */
            const Illustration = ILLUSTRATIONS[pole.illustration]

            return (
              <ScrollReveal
                as="li"
                key={pole.key}
                className="lp-cours__item"
                delay={80 * i}
              >
                <article
                  className="lp-card lp-cours__carte"
                  aria-labelledby={`cours-pole-${pole.key}`}
                >
                  <div className="lp-cours__tete">
                    {/* La plaque est le seul aplat clair de la carte : elle
                        détache le dessin du corps de texte et fixe la hauteur,
                        pour que les trois illustrations s'alignent d'une
                        colonne à l'autre. Le trait suit la couleur héritée. */}
                    {Illustration && (
                      <div className="lp-cours__plaque">
                        <Illustration className="lp-cours__illu" />
                      </div>
                    )}

                    <h3 id={`cours-pole-${pole.key}`} className="lp-h3">
                      {pole.titre}
                    </h3>
                    {pole.accroche && (
                      <p className="lp-cours__accroche">{pole.accroche}</p>
                    )}
                  </div>

                  {/* Le paragraphe de description a été retiré à la demande de
                      la mosquée : il décrivait une organisation qui n'est pas
                      arrêtée. La carte s'en tient à l'accroche et aux points
                      vérifiables. Ne pas le réintroduire sans validation. */}
                  <div className="lp-cours__corps">
                    {points.length > 0 && (
                      <>
                        <hr className="lp-rule" />
                        <ul className="lp-cours__points">
                          {points.map((point) => (
                            <li className="lp-cours__point" key={point}>{point}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="lp-cours__pied">
                      {seances.nombre === 0 ? (
                        <p className="lp-cours__compte">
                          <span className="lp-attente">{COURS_TEXTES.seancesAConfirmer}</span>
                        </p>
                      ) : (
                        <p className="lp-small lp-cours__compte">
                          <span className="lp-num lp-cours__compte-n">{seances.nombre}</span>{' '}
                          {seances.nombre > 1 ? COURS_TEXTES.seances : COURS_TEXTES.seance}
                        </p>
                      )}

                      {/* Sans cette ligne, « 2 séances » se lirait comme deux
                          jours de présence là où l'affiche en propose un. */}
                      {seances.auChoix && (
                        <p className="lp-caption lp-cours__choix">{seances.auChoix}</p>
                      )}

                      {seances.nombre > 0 && seances.joursIncomplets && (
                        <p className="lp-cours__compte">
                          <span className="lp-attente">{COURS_INTRO.joursAConfirmer}</span>
                        </p>
                      )}

                      <a
                        className="lp-cours__lien"
                        href="#planning"
                        data-pole={pole.key}
                        aria-label={`${COURS_INTRO.lienCreneaux} — ${pole.titre}`}
                        onClick={() => annoncerPole(pole.key)}
                      >
                        <span className="lp-cours__lien-t">{COURS_INTRO.lienCreneaux}</span>
                        <span className="lp-cours__fleche" aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
