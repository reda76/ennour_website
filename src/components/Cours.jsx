import { POLES, CRENEAUX, COURS_INTRO } from '../data/contenu.js'
import ScrollReveal from './ScrollReveal.jsx'

/**
 * Ce qu'un pôle ouvre réellement, déduit du planning.
 * Chaque entrée de CRENEAUX est un groupe (public + genre + horaire) : le
 * compte n'est donc jamais recopié à la main, il suit toute correction
 * apportée au planning.
 */
function lireGroupes(cle) {
  const creneaux = CRENEAUX.filter((c) => c.pole === cle)
  const genres = [...new Set(creneaux.map((c) => c.genre).filter(Boolean))]
  return {
    nombre: creneaux.length,
    // Le genre se lit en toutes lettres — jamais par une couleur seule.
    genres: genres.map((g) => g.toLocaleLowerCase('fr-FR')).join(' et '),
    // Le Fiqh n'a pas encore de jours arrêtés : on l'annonce au lieu de le taire.
    joursIncomplets: creneaux.some((c) => !c.jours || c.jours.length === 0),
  }
}

/**
 * Le lien ancre nativement vers #planning (href réel : il fonctionne sans JS).
 * En complément on inscrit le pôle dans l'URL et on l'annonce par un événement.
 * Les DEUX sont désormais écoutés par Planning (lecture de `?pole=` au montage
 * et écoute de « lp:pole ») : l'URL partagée préfiltre réellement le planning.
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
            const groupes = lireGroupes(pole.key)
            const points = Array.isArray(pole.points) ? pole.points : []

            return (
              <ScrollReveal
                as="li"
                key={pole.key}
                className="lp-cours__item"
                delay={80 * i}
              >
                {/* Un seul liséré de lumière par grille : il perd son sens s'il
                    est posé sur les trois cartes. */}
                <article
                  className={`lp-card lp-cours__carte${i === 0 ? ' lp-card--phare' : ''}`}
                  aria-labelledby={`cours-pole-${pole.key}`}
                >
                  <div className="lp-cours__tete">
                    <h3 id={`cours-pole-${pole.key}`} className="lp-h3">
                      {pole.titre}
                    </h3>
                    {pole.accroche && (
                      <p className="lp-cours__accroche">{pole.accroche}</p>
                    )}
                  </div>

                  <div className="lp-cours__corps">
                    {pole.description && (
                      <p className="lp-p">{pole.description}</p>
                    )}

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
                      {groupes.nombre === 0 ? (
                        <p className="lp-cours__compte">
                          <span className="lp-attente">{COURS_INTRO.groupesAConfirmer}</span>
                        </p>
                      ) : (
                        <p className="lp-small lp-cours__compte">
                          <span className="lp-num lp-cours__compte-n">{groupes.nombre}</span>{' '}
                          {groupes.nombre > 1 ? COURS_INTRO.groupes : COURS_INTRO.groupe}
                          {groupes.genres && (
                            <span className="lp-cours__compte-g">{groupes.genres}</span>
                          )}
                        </p>
                      )}

                      {groupes.nombre > 0 && groupes.joursIncomplets && (
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
