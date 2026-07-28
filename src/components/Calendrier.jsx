import { useMemo, useState } from 'react'
import { CALENDRIER, MENTION_CALENDRIER, CALENDRIER_TEXTES, ORG } from '../data/contenu.js'
import ScrollReveal from './ScrollReveal.jsx'

/* ============================================================
   LE PHARE — Section « Calendrier de l'année ».

   Parti pris : l'année est lue comme le feu d'un phare.
   Une bande allumée court d'un bout à l'autre (les cours), les
   vacances l'éteignent (éclipses), les examens la font flamber
   (éclats). Le même vocabulaire de formes sert dans la frise
   proportionnelle (desktop) et dans le registre vertical (partout).
   ============================================================ */

const JOUR_MS = 86400000

/* Les dates de contenu.js sont des chaînes ISO « AAAA-MM-JJ ».
   new Date('2026-09-14') les lit en UTC : à l'ouest de Greenwich la
   date affichée recule d'un jour. On construit donc une date LOCALE,
   calée à midi pour qu'aucun changement d'heure ne la fasse basculer. */
function versDate(iso) {
  if (typeof iso !== 'string') return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12, 0, 0, 0)
  return Number.isNaN(d.getTime()) ? null : d
}

const fJour = new Intl.DateTimeFormat('fr-FR', { day: 'numeric' })
const fJourMois = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' })
const fComplet = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
const fMoisCourt = new Intl.DateTimeFormat('fr-FR', { month: 'short' })
const fJourSemaine = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' })

/* Intl rend les mois et les jours en minuscules : on remet la capitale
   quand la chaîne ouvre une ligne. Majuscules accentuées comprises. */
function capitale(s) {
  return typeof s === 'string' && s.length ? s.charAt(0).toLocaleUpperCase('fr-FR') + s.slice(1) : s
}

function premierDuMois(d, decalage = 0) {
  return new Date(d.getFullYear(), d.getMonth() + decalage, 1, 12, 0, 0, 0)
}

/* Nombre de jours inclus dans la plage. Les dates étant calées à midi,
   un arrondi absorbe l'heure perdue ou gagnée aux changements d'heure. */
function nbJours(debut, fin) {
  return Math.round((fin.getTime() - debut.getTime()) / JOUR_MS) + 1
}

/* Rendu d'une plage ou d'une date simple, avec les <time> attendus.
   Usage français : la borne de départ ne répète que ce qui change.
     même mois   → « Du 12 au 19 décembre 2026 »
     même année  → « Du 17 octobre au 2 novembre 2026 »
     à cheval    → « Du 19 décembre 2026 au 4 janvier 2027 »
   L'attribut dateTime porte toujours la date ISO complète, même quand
   le texte visible se réduit au quantième. */
function rendreDates(e) {
  if (!e.d) {
    return <span className="lp-attente">{CALENDRIER_TEXTES.datesAConfirmer}</span>
  }
  if (!e.f) {
    return <time dateTime={e.debut}>{capitale(fComplet.format(e.d))}</time>
  }
  const memeAnnee = e.d.getFullYear() === e.f.getFullYear()
  const memeMois = memeAnnee && e.d.getMonth() === e.f.getMonth()
  const depart = memeMois ? fJour : memeAnnee ? fJourMois : fComplet
  return (
    <>
      {'Du '}
      <time dateTime={e.debut}>{depart.format(e.d)}</time>
      {' au '}
      <time dateTime={e.fin}>{fComplet.format(e.f)}</time>
    </>
  )
}

/* ------------------------------------------------------------
   Modèle : tout le calcul de dates et de proportions au même
   endroit, pour que le JSX ne fasse que poser des pourcentages.
   ------------------------------------------------------------ */
function construireModele() {
  const source = Array.isArray(CALENDRIER) ? CALENDRIER : []

  const entrees = source.map((e, i) => {
    const d = versDate(e.debut)
    const brutFin = versDate(e.fin)
    return {
      ...e,
      key: e.key ?? `calendrier-${i}`,
      d,
      // Une fin antérieure au début est une saisie douteuse : on la ignore
      // plutôt que de dessiner un segment de largeur négative.
      f: d && brutFin && brutFin.getTime() >= d.getTime() ? brutFin : null,
    }
  })

  // Les entrées sans date lisible restent listées, en fin de registre,
  // avec une mention « à confirmer » — jamais supprimées silencieusement.
  const datees = entrees.filter((e) => e.d).sort((a, b) => a.d - b.d)
  const sansDate = entrees.filter((e) => !e.d)
  const ordonnees = [...datees, ...sansDate]

  if (!datees.length) {
    return { vide: true, entrees: ordonnees, examens: [], mois: [], segments: [], statut: null }
  }

  // L'axe court de bord de mois à bord de mois : les graduations
  // tombent juste, et septembre comme juin sont entiers.
  const dernierT = Math.max(...datees.map((e) => (e.f ?? e.d).getTime()))
  const axeDebut = premierDuMois(datees[0].d)
  const axeFin = premierDuMois(new Date(dernierT), 1)
  const etendue = axeFin.getTime() - axeDebut.getTime()
  const pct = (date) => ((date.getTime() - axeDebut.getTime()) / etendue) * 100

  const mois = []
  for (let c = axeDebut; c < axeFin; c = premierDuMois(c, 1)) {
    const suivant = premierDuMois(c, 1)
    mois.push({
      cle: `${c.getFullYear()}-${c.getMonth()}`,
      lib: fMoisCourt.format(c),
      x: pct(c),
      l: pct(suivant) - pct(c),
    })
  }

  const segments = datees.map((e) => {
    const x = pct(e.d)
    // La fin est inclusive dans les données : on borne au lendemain
    // pour que le dernier jour de vacances occupe bien sa largeur.
    const l = e.f ? pct(new Date(e.f.getTime() + JOUR_MS)) - x : 0
    return { key: e.key, type: e.type, libelle: e.libelle, x, l }
  })

  // Les deux bornes de l'année : les jalons s'ils existent, sinon
  // le premier et le dernier événement daté.
  const jalons = datees.filter((e) => e.type === 'jalon')
  const bornes = jalons.length ? jalons : datees
  const borneDebut = bornes[0].d
  const bornier = bornes[bornes.length - 1]
  const bornefin = bornier.f ?? bornier.d
  const bande = { x: pct(borneDebut), l: pct(bornefin) - pct(borneDebut) }

  // Aujourd'hui, ramené à midi local comme les dates du calendrier.
  const maintenant = new Date()
  const auj = new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate(), 12, 0, 0, 0)

  const periode = datees.find((e) => e.f && auj >= e.d && auj <= e.f) ?? null
  const dansAnnee = auj >= borneDebut && auj <= bornefin
  const T = CALENDRIER_TEXTES

  let statut = null
  if (periode) {
    statut = { lib: T.statutPendant, val: periode.libelle }
  } else if (dansAnnee) {
    statut = { lib: T.statutPendant, val: T.periodeCours }
  } else if (auj < borneDebut) {
    // Hors année et avant la rentrée : on annonce la date d'ouverture
    // plutôt que de laisser un bloc vide.
    const rentree = bornes[0]
    statut = {
      lib: T.statutAvant,
      val: `${capitale(fJourSemaine.format(rentree.d))} ${fComplet.format(rentree.d)}`,
      iso: rentree.debut,
    }
  }
  // Après la fin des cours : aucune mise en évidence, aucun repère.

  return {
    vide: false,
    entrees: ordonnees.map((e) => ({ ...e, encours: periode ? e.key === periode.key : false })),
    examens: datees.filter((e) => e.type === 'examen'),
    mois,
    segments,
    bande,
    statut,
    // Repère « aujourd'hui » sur la frise : null hors de l'axe.
    aujourdHuiX: auj >= axeDebut && auj < axeFin ? pct(auj) : null,
  }
}

export default function Calendrier() {
  const [actif, setActif] = useState(null)
  // Le modèle ne dépend que de données de module et de la date du jour :
  // un seul calcul par montage suffit.
  const m = useMemo(() => construireModele(), [])
  const T = CALENDRIER_TEXTES

  const survol = (key) => ({
    onMouseEnter: () => setActif(key),
    onMouseLeave: () => setActif((k) => (k === key ? null : k)),
  })

  return (
    <>
      <section id="calendrier" className="lp-section lp-calendrier" aria-labelledby="lp-calendrier-titre">
        <div className="lp-wrap lp-calendrier__inner">

          <ScrollReveal as="header" className="lp-calendrier__entete">
            <div className="lp-calendrier__intro">
              <p className="lp-eyebrow">
                {T.surtitre} <span className="lp-num">{ORG.anneeScolaire}</span>
              </p>
              <hr className="lp-filet" />
              <h2 className="lp-h2" id="lp-calendrier-titre">{T.titre}</h2>
              <p className="lp-lead">{T.chapo}</p>
            </div>

            {m.statut && (
              <p className="lp-calendrier__statut">
                {/* Rôle partagé : ce micro-libellé en capitales laiton est
                    exactement .lp-eyebrow, il n'a plus à être redessiné. */}
                <span className="lp-eyebrow">{m.statut.lib}</span>
                {m.statut.iso ? (
                  <time className="lp-calendrier__statut-val lp-num" dateTime={m.statut.iso}>
                    {m.statut.val}
                  </time>
                ) : (
                  <span className="lp-calendrier__statut-val">{m.statut.val}</span>
                )}
              </p>
            )}
          </ScrollReveal>

          {m.vide ? (
            <p className="lp-calendrier__vide">
              <span className="lp-attente">{T.vide}</span>
            </p>
          ) : (
            <>
              {/* La frise est un doublon graphique du registre : tout ce
                  qu'elle montre y est écrit. D'où aria-hidden, et l'absence
                  de tout élément focalisable à l'intérieur. */}
              <ScrollReveal className="lp-calendrier__frise" aria-hidden="true" delay={80}>
                <div className="lp-calendrier__mois">
                  {m.mois.map((x) => (
                    <span
                      key={x.cle}
                      className="lp-calendrier__mois-item"
                      style={{ left: `${x.x}%`, width: `${x.l}%` }}
                    >
                      {x.lib}
                    </span>
                  ))}
                </div>

                <div className="lp-calendrier__piste">
                  <div
                    className="lp-calendrier__bande"
                    style={{ left: `${m.bande.x}%`, width: `${m.bande.l}%` }}
                  />

                  {m.segments.filter((s) => s.type === 'vacances').map((s) => (
                    <div
                      key={s.key}
                      className={`lp-calendrier__eclipse${actif === s.key ? ' is-actif' : ''}`}
                      style={{ left: `${s.x}%`, width: `${s.l}%` }}
                      {...survol(s.key)}
                    />
                  ))}

                  {m.segments.filter((s) => s.type === 'examen').map((s) => (
                    <div
                      key={s.key}
                      className={`lp-calendrier__eclat${actif === s.key ? ' is-actif' : ''}`}
                      style={{ left: `${s.x}%`, width: `${s.l}%` }}
                      {...survol(s.key)}
                    />
                  ))}

                  {m.segments.filter((s) => s.type === 'jalon').map((s) => (
                    <div
                      key={s.key}
                      /* Passé la moitié de l'axe, l'étiquette se range à
                         gauche de son mât pour ne pas sortir de la frise. */
                      className={`lp-calendrier__amer${s.x > 50 ? ' lp-calendrier__amer--fin' : ''}${actif === s.key ? ' is-actif' : ''}`}
                      style={{ left: `${s.x}%` }}
                      {...survol(s.key)}
                    >
                      <span className="lp-calendrier__amer-pt" />
                      <span className="lp-calendrier__amer-lib">{s.libelle}</span>
                    </div>
                  ))}

                  {m.aujourdHuiX !== null && (
                    <div className="lp-calendrier__jour" style={{ left: `${m.aujourdHuiX}%` }}>
                      <span className="lp-calendrier__jour-lib">{T.statutPendant}</span>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <h3 className="lp-visually-hidden">{T.legendeTitre}</h3>
                <ul className="lp-calendrier__legende">
                  {T.legende.map((l) => (
                    <li key={l.key} className="lp-calendrier__legende-item">
                      <span className={`lp-calendrier__puce lp-calendrier__puce--${l.key}`} aria-hidden="true" />
                      <span className="lp-calendrier__legende-txt">
                        <span className="lp-calendrier__legende-lib">{l.libelle}</span>
                        <span className="lp-caption">{l.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <div className="lp-calendrier__corps">
                <ScrollReveal delay={160}>
                  <h3 className="lp-visually-hidden">{T.registreTitre}</h3>
                  {/* <ol> assumé : le calendrier est une vraie séquence,
                      l'ordre y porte de l'information. */}
                  <ol className="lp-calendrier__registre">
                    {m.entrees.map((e) => (
                      <li
                        key={e.key}
                        className={[
                          'lp-calendrier__entree',
                          actif === e.key ? 'is-actif' : '',
                          e.encours ? 'is-encours' : '',
                        ].filter(Boolean).join(' ')}
                        {...survol(e.key)}
                      >
                        <span
                          className={`lp-calendrier__marque lp-calendrier__marque--${e.type}`}
                          aria-hidden="true"
                        />
                        <h4 className="lp-h4 lp-calendrier__titre">
                          {e.libelle}
                          {e.encours && <span className="lp-calendrier__badge">{T.badgeEnCours}</span>}
                        </h4>
                        <p className="lp-calendrier__dates lp-num">{rendreDates(e)}</p>
                        {e.d && (
                          <p className="lp-caption lp-num lp-calendrier__meta">
                            {e.f
                              ? `${nbJours(e.d, e.f)} jours`
                              : capitale(fJourSemaine.format(e.d))}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                </ScrollReveal>

                {m.examens.length > 0 && (
                  <ScrollReveal delay={200}>
                    <div className="lp-card lp-card--phare lp-calendrier__examens">
                      <h3 className="lp-h3">{T.examensTitre}</h3>
                      <p className="lp-p">{T.examensTexte}</p>
                      <hr className="lp-rule" />
                      <ul className="lp-calendrier__sessions">
                        {m.examens.map((e) => (
                          <li
                            key={e.key}
                            className={`lp-calendrier__session${actif === e.key ? ' is-actif' : ''}`}
                            {...survol(e.key)}
                          >
                            <span className="lp-calendrier__session-lib">{e.libelle}</span>
                            <span className="lp-calendrier__session-date lp-num">{rendreDates(e)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </>
          )}

          <div className="lp-calendrier__pied">
            <hr className="lp-rule" />
            <p className="lp-small lp-calendrier__mention">{MENTION_CALENDRIER}</p>
          </div>

        </div>
      </section>
    </>
  )
}
