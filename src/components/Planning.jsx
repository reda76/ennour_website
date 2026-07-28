import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal.jsx'
import {
  CRENEAUX,
  JOURS_SEMAINE,
  MENTION_HORAIRES,
  ORG,
  PLANNING_INTRO,
  PLANNING_UI,
  POLES,
  PUBLICS_OUVERTS,
} from '../data/contenu.js'

/* ============================================================
   LE PHARE — Section « Planning & horaires ».

   Parti pris de lecture : avec six créneaux seulement, une grille
   horaire proportionnelle de 7 h à 22 h serait vide à 90 %. On
   empile donc les séances par jour, triées par heure, et on rend
   le temps lisible autrement : chaque carte porte une « barre du
   jour » — un filet de brume où la lumière s'accroche à la plage
   horaire de la séance. C'est la ligne d'horizon du site, appliquée
   à la donnée : d'un coup d'œil on voit les soirées de semaine et
   les matinées de week-end.
   ============================================================ */

/* Les trois axes de filtrage. La clé sert à la fois d'état et de
   champ du créneau — les deux portent volontairement le même nom. */
const AXES = [
  { cle: 'pole', legende: 'Pôle' },
  { cle: 'genre', legende: 'Groupe' },
  { cle: 'public', legende: 'Public' },
]

const POLE_PAR_CLE = Object.fromEntries(POLES.map((p) => [p.key, p]))

/* Les genres sont déduits des créneaux : on n'affiche jamais un
   filtre pour une valeur qui n'existe pas dans le planning. Les publics
   suivent la même règle (PUBLICS_OUVERTS), pour la même raison : deux des
   trois entrées de PUBLICS n'ont aucun créneau et ouvraient le panneau
   avec un tiers de ses options mortes. */
const GENRES = [...new Set(CRENEAUX.map((c) => c.genre))]

/* Pôle demandé par l'URL (« /?pole=coran », posé par la section « Les
   cours »). Validé contre POLES : un paramètre inconnu est ignoré. */
function poleDeLURL() {
  if (typeof window === 'undefined') return []
  const cle = new URLSearchParams(window.location.search).get('pole')
  return cle && POLE_PAR_CLE[cle] ? [cle] : []
}

const enMinutes = (heure) => {
  const [h, m] = String(heure).split(':').map(Number)
  return h * 60 + (m || 0)
}

/* Amplitude de la journée déduite des données, pas décrétée :
   arrondie à l'heure pleine au-dessous et au-dessus. */
const AMPLITUDE = (() => {
  const debuts = CRENEAUX.map((c) => enMinutes(c.debut))
  const fins = CRENEAUX.map((c) => enMinutes(c.fin))
  const min = Math.floor(Math.min(...debuts) / 60) * 60
  const max = Math.ceil(Math.max(...fins) / 60) * 60
  return { min, max, etendue: Math.max(max - min, 1) }
})()

// Espace insécable avant l'unité : « 7 h » ne doit jamais se couper.
const heureRonde = (minutes) => `${Math.floor(minutes / 60)}\u00A0h`

/* Un créneau passe le filtre si, sur chaque axe, aucune valeur n'est
   sélectionnée ou la sienne l'est. `axeIgnore` sert au comptage à
   facettes : le compteur d'un axe ne doit pas dépendre de lui-même. */
function correspond(creneau, filtres, axeIgnore) {
  return AXES.every(
    ({ cle }) =>
      cle === axeIgnore ||
      filtres[cle].length === 0 ||
      filtres[cle].includes(creneau[cle]),
  )
}

const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`
const nbCreneaux = (n) => `${n} ${n > 1 ? 'créneaux' : 'créneau'}`

/* ---------- La barre du jour ----------
   Purement graphique : l'horaire est déjà écrit en toutes lettres
   juste au-dessus. D'où aria-hidden. */
function BarreJour({ debut, fin }) {
  const d = enMinutes(debut)
  const f = enMinutes(fin)
  const depart = ((d - AMPLITUDE.min) / AMPLITUDE.etendue) * 100
  // Plancher de 4 % : une séance d'une heure resterait sinon invisible.
  const largeur = Math.max(((f - d) / AMPLITUDE.etendue) * 100, 4)
  return (
    <span
      className="lp-planning__barre"
      aria-hidden="true"
      style={{
        '--lp-seg-x': `${Math.max(0, Math.min(depart, 100 - largeur))}%`,
        '--lp-seg-l': `${largeur}%`,
      }}
    />
  )
}

/* ---------- Une séance ---------- */
function Creneau({ creneau, avecJours = false }) {
  const pole = POLE_PAR_CLE[creneau.pole]
  const nomPole = pole ? pole.court : creneau.pole
  /* L'arête colorée dit le pôle ; le libellé qui la double n'est utile
     que si l'intitulé ne le porte pas déjà — « CORAN » au-dessus de
     « Coran » ne serait qu'un doublon. Seul « Fiqh — niveau 1 » a donc
     besoin d'annoncer « Sciences musulmanes ». */
  const poleDitAilleurs = creneau.intitule
    .toLocaleLowerCase('fr')
    .startsWith(nomPole.toLocaleLowerCase('fr'))

  return (
    <article className="lp-card lp-planning__creneau" data-pole={creneau.pole}>
      {poleDitAilleurs ? (
        <span className="lp-visually-hidden">{nomPole}</span>
      ) : (
        <p className="lp-planning__pole">{nomPole}</p>
      )}

      <p className="lp-planning__heure lp-num">
        <time dateTime={creneau.debut}>{creneau.debut}</time>
        <span aria-hidden="true"> – </span>
        <span className="lp-visually-hidden">à</span>
        <time dateTime={creneau.fin}>{creneau.fin}</time>
      </p>

      <BarreJour debut={creneau.debut} fin={creneau.fin} />

      <h4 className="lp-planning__intitule">{creneau.intitule}</h4>

      <p className="lp-planning__meta">
        {creneau.genre}
        <span aria-hidden="true"> · </span>
        <span className="lp-visually-hidden">, </span>
        {creneau.public}
      </p>

      {/* Les jours ne sont rappelés que hors grille : dans la semaine,
          la colonne les porte déjà. */}
      {avecJours &&
        (creneau.jours.length > 0 ? (
          <p className="lp-planning__meta">{creneau.jours.join(', ')}</p>
        ) : (
          <p className="lp-planning__jours-attente">
            <span className="lp-attente">{PLANNING_INTRO.attenteJours}</span>
          </p>
        ))}

      {creneau.salle ? (
        <p className="lp-planning__salle">{creneau.salle}</p>
      ) : (
        <p className="lp-planning__salle lp-planning__salle--attente">
          {PLANNING_INTRO.salleCourt}
        </p>
      )}
    </article>
  )
}

export default function Planning() {
  /* L'état initial lit l'URL : « Voir les créneaux » depuis un pôle mène ici
     avec « ?pole=… », et l'adresse partagée doit rendre le même écran. */
  const [filtres, setFiltres] = useState(() => ({
    pole: poleDeLURL(),
    genre: [],
    public: [],
  }))

  /* Même préfiltre, sans rechargement : la section « Les cours » émet
     « lp:pole » au clic, on l'écoute plutôt que de laisser l'URL mentir. */
  useEffect(() => {
    const surPole = (e) => {
      const cle = e.detail
      if (!POLE_PAR_CLE[cle]) return
      setFiltres((f) => ({ ...f, pole: [cle] }))
    }
    window.addEventListener('lp:pole', surPole)
    return () => window.removeEventListener('lp:pole', surPole)
  }, [])

  const nbFiltres = filtres.pole.length + filtres.genre.length + filtres.public.length

  const bascule = useCallback((axe, valeur) => {
    setFiltres((f) => {
      const liste = f[axe]
      return {
        ...f,
        [axe]: liste.includes(valeur)
          ? liste.filter((v) => v !== valeur)
          : [...liste, valeur],
      }
    })
  }, [])

  const reinitialiser = useCallback(
    () => setFiltres({ pole: [], genre: [], public: [] }),
    [],
  )

  const visibles = useMemo(
    () => CRENEAUX.filter((c) => correspond(c, filtres)),
    [filtres],
  )

  /* Comptage à facettes : le nombre affiché sur une option tient
     compte des autres axes, jamais du sien. Une option à 0 est rendue
     inerte (aria-disabled) — on ne propose pas un cul-de-sac, mais on ne
     retire pas non plus le bouton du parcours au clavier. */
  const compter = (axe, valeur) =>
    CRENEAUX.filter((c) => c[axe] === valeur && correspond(c, filtres, axe)).length

  const semaine = useMemo(
    () =>
      JOURS_SEMAINE.map((jour) => ({
        jour,
        creneaux: visibles
          .filter((c) => c.jours.includes(jour))
          .sort((a, b) => enMinutes(a.debut) - enMinutes(b.debut)),
      })),
    [visibles],
  )

  // Créneaux confirmés mais dont les jours ne sont pas encore arrêtés.
  const sansJours = useMemo(() => visibles.filter((c) => c.jours.length === 0), [visibles])

  const nbSeances = visibles.reduce((n, c) => n + c.jours.length, 0)

  const options = {
    pole: POLES.map((p) => ({ valeur: p.key, libelle: p.court, complet: p.titre })),
    genre: GENRES.map((g) => ({ valeur: g, libelle: g, complet: `Groupe ${g}` })),
    public: PUBLICS_OUVERTS.map((p) => ({ valeur: p, libelle: p, complet: `Public ${p}` })),
  }

  /* Le cadre de la semaine n'est un arrêt de tabulation QUE s'il défile
     vraiment : sous 1100px la grille s'empile et son overflow repasse à
     `visible`. On mesure au lieu de le supposer — un conteneur annoncé
     « région » où aucune touche n'a d'effet est un piège au clavier. */
  const refCadre = useRef(null)
  const [cadreDefile, setCadreDefile] = useState(false)
  useEffect(() => {
    const el = refCadre.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const mesurer = () => setCadreDefile(el.scrollWidth > el.clientWidth + 1)
    mesurer()
    const ro = new ResizeObserver(mesurer)
    ro.observe(el)
    return () => ro.disconnect()
  }, [visibles])

  return (
    <section
      id="planning"
      className="lp-section lp-planning"
      aria-labelledby="planning-titre"
    >
      <div className="lp-wrap lp-planning__wrap">
        <ScrollReveal as="header" className="lp-planning__entete">
          <div className="lp-planning__intro">
            <p className="lp-eyebrow">{PLANNING_INTRO.eyebrow}</p>
            <hr className="lp-filet" />
            <h2 className="lp-h2" id="planning-titre">
              {PLANNING_INTRO.titre}
            </h2>
            <p className="lp-lead">{PLANNING_INTRO.lead}</p>
          </div>
          {/* Un seul traitement pour l'année scolaire sur toute la page :
              libellé en .lp-caption, valeur en .lp-num. .lp-chiffre est
              réservé au repère du hero, où l'année est un chiffre
              remarquable — ici elle cadre la section, elle ne la domine pas. */}
          <p className="lp-caption lp-planning__annee">
            {PLANNING_UI.annee}{' '}
            <span className="lp-num lp-planning__annee-valeur">{ORG.anneeScolaire}</span>
          </p>
        </ScrollReveal>

        {/* ---------- Filtres ---------- */}
        <div className="lp-card lp-planning__panneau">
          <div className="lp-planning__filtres">
            {AXES.map(({ cle, legende }) => (
              <fieldset key={cle} className="lp-planning__groupe">
                {/* Variante sourde du surtitre : même dessin que .lp-eyebrow,
                    en brume. Le laiton reste aux en-têtes de section. */}
                <legend className="lp-eyebrow lp-eyebrow--sourd lp-planning__legende">
                  {legende}
                </legend>
                <div className="lp-planning__choix">
                  {options[cle].map(({ valeur, libelle, complet }) => {
                    const actif = filtres[cle].includes(valeur)
                    const n = compter(cle, valeur)
                    /* aria-disabled et non disabled : un bouton qui se
                       désactive alors qu'il a le focus le rend au <body>, et
                       l'on perd sa place dans le panneau. Il reste donc
                       focalisable, annoncé, et sans effet au clic. */
                    const inerte = n === 0 && !actif
                    return (
                      <button
                        key={valeur}
                        type="button"
                        className="lp-planning__chip"
                        data-pole={cle === 'pole' ? valeur : undefined}
                        aria-pressed={actif}
                        aria-label={`${complet} — ${nbCreneaux(n)}`}
                        aria-disabled={inerte || undefined}
                        onClick={() => { if (!inerte) bascule(cle, valeur) }}
                      >
                        {cle === 'pole' && (
                          <span className="lp-planning__jeton" aria-hidden="true" />
                        )}
                        <span>{libelle}</span>
                        <span className="lp-planning__chip-n lp-num" aria-hidden="true">
                          {n}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="lp-planning__etat">
            <p className="lp-planning__resume" role="status">
              <span className="lp-num">{visibles.length}</span>
              {visibles.length > 1 ? ' créneaux affichés' : ' créneau affiché'} sur{' '}
              <span className="lp-num">{CRENEAUX.length}</span>
              <span className="lp-planning__sep" aria-hidden="true"> · </span>
              <span className="lp-planning__seances">
                {pluriel(nbSeances, 'séance')} dans la semaine
              </span>
            </p>
            {/* Même raison qu'au-dessus : cliquer « Tout afficher » remet le
                compteur de filtres à zéro, ce qui aurait désactivé le bouton
                sous le doigt — et rendu le focus au <body>. */}
            <button
              type="button"
              className="lp-planning__reset"
              onClick={() => { if (nbFiltres > 0) reinitialiser() }}
              aria-disabled={nbFiltres === 0 || undefined}
            >
              {PLANNING_UI.toutAfficher}
            </button>
          </div>
        </div>

        {visibles.length === 0 ? (
          <div className="lp-planning__vide">
            <p className="lp-h4">{PLANNING_UI.aucunResultat}</p>
            <p className="lp-small">{PLANNING_UI.aucunResultatAide}</p>
            <button type="button" className="lp-btn lp-btn--secondaire" onClick={reinitialiser}>
              {PLANNING_UI.toutAfficher}
            </button>
          </div>
        ) : (
          <>
            {/* ---------- La semaine ----------
                Si la sélection ne retient que des créneaux sans jours
                arrêtés, la grille n'aurait que sept colonnes vides à
                montrer : on ne l'affiche pas. */}
            {nbSeances > 0 && (
              <div className="lp-planning__bloc">
                <p className="lp-planning__cle lp-caption">
                  {PLANNING_UI.cleAvant}{' '}
                  <span className="lp-num">{heureRonde(AMPLITUDE.min)}</span>{' '}
                  {PLANNING_UI.cleEntre}{' '}
                  <span className="lp-num">{heureRonde(AMPLITUDE.max)}</span>.
                </p>
                <div
                  className="lp-planning__cadre"
                  ref={refCadre}
                  role={cadreDefile ? 'region' : undefined}
                  aria-label={cadreDefile ? 'Semaine des cours' : undefined}
                  tabIndex={cadreDefile ? 0 : undefined}
                >
                  <ol className="lp-planning__semaine">
                    {semaine.map(({ jour, creneaux }) => (
                      <li
                        key={jour}
                        className="lp-planning__jour"
                        data-vide={creneaux.length === 0 ? 'oui' : undefined}
                      >
                        <div className="lp-planning__jour-tete">
                          {/* Rôle partagé, taille dérogatoire dans le partial :
                              un nom de jour se lit dans une colonne de 160px. */}
                          <h3 className="lp-eyebrow lp-planning__jour-nom">{jour}</h3>
                          <p className="lp-planning__jour-compte">
                            {creneaux.length > 0
                              ? pluriel(creneaux.length, 'séance')
                              : PLANNING_UI.aucunCours}
                          </p>
                        </div>
                        <hr className="lp-rule" />
                        {creneaux.length > 0 && (
                          <ol className="lp-planning__pile">
                            {creneaux.map((c) => (
                              <li key={c.id}>
                                <Creneau creneau={c} />
                              </li>
                            ))}
                          </ol>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* ---------- Créneaux dont les jours ne sont pas arrêtés ---------- */}
            {sansJours.length > 0 && (
              <section
                className="lp-card lp-planning__bloc lp-planning__attente"
                aria-labelledby="planning-attente"
              >
                <div className="lp-planning__attente-tete">
                  <h3 className="lp-h4" id="planning-attente">
                    {PLANNING_INTRO.attenteTitre}
                  </h3>
                  <p className="lp-small">{PLANNING_INTRO.attenteTexte}</p>
                </div>
                <ul className="lp-planning__attente-liste">
                  {sansJours.map((c) => (
                    <li key={c.id}>
                      <Creneau creneau={c} avecJours />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {/* ---------- Mentions ---------- */}
        <aside className="lp-card lp-planning__mention" aria-label="Précisions sur les horaires">
          {/* Variante sourde : « À noter » n'est pas un surtitre de section.
              Le laiton de .lp-eyebrow doit rester lisible comme tel. */}
          <p className="lp-eyebrow lp-eyebrow--sourd">{PLANNING_UI.aNoter}</p>
          <p className="lp-small">{MENTION_HORAIRES}</p>
          <p className="lp-small">{PLANNING_INTRO.salleNote}</p>
        </aside>
      </div>
    </section>
  )
}
