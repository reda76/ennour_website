import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal.jsx'
import {
  CRENEAUX,
  JOURS_SEMAINE,
  MENTION_HORAIRES,
  ORG,
  PLANNING_INTRO,
  PLANNING_TEXTES,
  PLANNING_UI,
  ETATS_SEANCE,
  POLES,
} from '../data/contenu.js'

/* ============================================================
   MOSQUÉE EN-NOUR — Section « Planning & horaires ».

   Quatre séances, sept jours. La semaine reste une grille de sept
   colonnes — c'est un planning, on y cherche un jour —, mais elle a
   deux régimes, et c'est là que tout se joue :

   — une séance à jours FIXES vit dans la colonne de chacun de ses
     jours (le Coran du week-end a bien lieu samedi ET dimanche) ;
   — une séance « au choix » ne vit dans AUCUNE colonne : elle est
     rassemblée dans un bloc qui ENJAMBE les jours concernés, sous une
     accolade. « Samedi ou Dimanche » veut dire un seul des deux jours ;
     la poser dans les deux colonnes annoncerait deux cours au lieu d'un.
     Le décompte suit la même règle : une séance au choix compte pour 1.

   Le temps reste lisible par la « barre du jour » : un filet d'encre
   où la lumière s'accroche à la plage horaire. C'est la ligne
   d'horizon du site réduite à l'échelle d'une carte — et avec des
   matinées à 7 h et des soirées à 20 h, elle sépare d'un coup d'œil
   deux rythmes très différents.
   ============================================================ */

const T = PLANNING_TEXTES

const POLE_PAR_CLE = Object.fromEntries(POLES.map((p) => [p.key, p]))

/* ---------- Les axes de filtrage ----------
   `valeurs` rend TOUJOURS un tableau : un créneau peut relever de deux
   pôles (la séance du week-end sert le Coran et l'alphabétisation), et un
   axe qui lirait un champ scalaire l'en priverait.

   La règle qui suit vaut pour tous les axes, présents et à venir : un axe
   n'est proposé que s'il offre au moins DEUX valeurs. Un filtre à une seule
   option ne filtre rien — il occupe la place et suggère un tri qui n'existe
   pas. C'est ce qui retire aujourd'hui le filtre « public » (un seul public
   ouvert) ; le jour où un second existera, l'axe reparaîtra de lui-même. */
/* Les groupes réellement nommés par le classeur, dans l'ordre où ils y
   apparaissent. Déduits, jamais écrits en dur : le jour où un troisième
   existe, l'axe le proposera de lui-même. */
const GROUPES = [...new Set(CRENEAUX.map((c) => c.groupe).filter(Boolean))]

const AXES_POSSIBLES = [
  {
    cle: 'pole',
    legende: T.filtreLegende,
    valeurs: (creneau) => creneau.poles,
    options: POLES.map((p) => ({ valeur: p.key, libelle: p.court, complet: p.titre })),
  },
  {
    cle: 'groupe',
    legende: T.filtreGroupe,
    valeurs: (creneau) => (creneau.groupe ? [creneau.groupe] : []),
    /* Une séance dont le classeur ne nomme pas le groupe — le Fiqh, la Sîra —
       n'est PAS exclue par un filtre de groupe. On ignore si elle concerne
       les hommes ou les femmes : la masquer serait affirmer qu'elle ne les
       concerne pas. Elle reste donc visible quel que soit le filtre. */
    neutreSiVide: true,
    options: GROUPES.map((g) => ({ valeur: g, libelle: g, complet: `Groupe ${g}` })),
  },
]

const AXES = AXES_POSSIBLES.filter((axe) => axe.options.length >= 2)

const AXE_POLE = AXES.find((axe) => axe.cle === 'pole')

const etatVide = () => Object.fromEntries(AXES.map((axe) => [axe.cle, []]))

/* Pôle demandé par l'URL (« /?pole=coran », posé par la section « Les
   cours »). Validé contre POLES : un paramètre inconnu est ignoré. */
function etatInitial() {
  const etat = etatVide()
  if (!AXE_POLE || typeof window === 'undefined') return etat
  const cle = new URLSearchParams(window.location.search).get('pole')
  if (cle && POLE_PAR_CLE[cle]) etat.pole = [cle]
  return etat
}

const enMinutes = (heure) => {
  const [h, m] = String(heure).split(':').map(Number)
  return h * 60 + (m || 0)
}

const parHeure = (a, b) => enMinutes(a.debut) - enMinutes(b.debut)

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

/* Une séance « au choix » compte pour UNE, quel que soit le nombre de jours
   entre lesquels elle laisse le choix. Sommer ses jours doublerait l'offre. */
const occurrences = (creneau) => (creneau.auChoix ? 1 : creneau.jours.length)

/* Toute la barre de commande compte en SÉANCES, jamais en entrées de
   CRENEAUX. Une entrée n'est pas une unité que le lecteur connaisse : le
   Coran en pèse deux mais tient cinq séances dans la semaine, et l'affiche
   compte des séances (« 3 cours par semaine + week-end »), comme la carte
   du pôle et le premier écran. Compter les entrées affichait « Coran 2 »
   sous « 5 séances chaque semaine » — le chiffre mis en avant sur le filtre
   était le plus bas des trois, et il sous-annonçait l'offre payante. */
const TOTAL_SEANCES = CRENEAUX.reduce((n, c) => n + occurrences(c), 0)

const motAccorde = (n, mot) => (n > 1 ? mot.plusieurs : mot.un)

/* Un créneau passe le filtre si, sur chaque axe, aucune valeur n'est
   sélectionnée ou l'une des siennes l'est. `axeIgnore` sert au comptage à
   facettes : le compteur d'un axe ne doit pas dépendre de lui-même. */
function correspond(creneau, filtres, axeIgnore) {
  return AXES.every((axe) => {
    if (axe.cle === axeIgnore) return true
    const choisies = filtres[axe.cle] ?? []
    if (choisies.length === 0) return true
    return porte(axe, creneau, choisies)
  })
}

/* Le créneau relève-t-il de l'une des valeurs demandées sur cet axe ?
   Sur un axe `neutreSiVide`, un créneau qui ne porte pas l'axe répond oui :
   voir le commentaire de l'axe « groupe ». */
function porte(axe, creneau, valeurs) {
  const siennes = axe.valeurs(creneau)
  if (axe.neutreSiVide && siennes.length === 0) return true
  return siennes.some((v) => valeurs.includes(v))
}

/* Identifiant d'ancrage lisible, accents retirés : les jours n'en portent
   pas aujourd'hui, mais un `id` HTML ne se répare pas après coup. */
const slug = (texte) =>
  texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/* Position du bloc groupé dans la grille des sept jours. Rendue seulement
   si les jours concernés sont CONTIGUS — une accolade qui enjamberait
   « Lundi et Jeudi » couvrirait deux jours qu'elle ne concerne pas. Sinon
   le bloc prend toute la largeur, sous la semaine. */
function empanDe(jours) {
  const index = jours
    .map((j) => JOURS_SEMAINE.indexOf(j))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)
  if (index.length === 0) return null
  const contigu = index.every((v, i) => i === 0 || v === index[i - 1] + 1)
  if (!contigu) return null
  return { debut: index[0] + 1, fin: index[index.length - 1] + 2, nb: index.length }
}

/* Les séances qui ne tiennent pas dans une colonne de jour, réunies par
   ensemble de jours identique :
   — « au choix » : un bloc par combinaison de jours proposée ;
   — sans jours arrêtés : un bloc d'attente. Il n'y en a aucun aujourd'hui,
     mais le cas reste traité — un `jours: []` peut revenir dans les données. */
function construireGroupes(creneaux) {
  const parCle = new Map()
  for (const creneau of creneaux) {
    const sansJours = creneau.jours.length === 0
    if (!sansJours && !creneau.auChoix) continue
    const cle = sansJours ? '' : creneau.jours.join('|')
    if (!parCle.has(cle)) {
      parCle.set(cle, {
        id: sansJours ? 'jours-a-confirmer' : slug(creneau.jours.join('-')),
        jours: creneau.jours,
        auChoix: !sansJours,
        empan: sansJours ? null : empanDe(creneau.jours),
        creneaux: [],
      })
    }
    parCle.get(cle).creneaux.push(creneau)
  }
  // Les blocs suivent l'ordre de la semaine ; l'attente ferme la marche.
  return [...parCle.values()]
    .map((groupe) => ({ ...groupe, creneaux: [...groupe.creneaux].sort(parHeure) }))
    .sort((a, b) => (a.empan?.debut ?? 99) - (b.empan?.debut ?? 99))
}

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
function Creneau({ creneau }) {
  const noms = creneau.poles.map((cle) => POLE_PAR_CLE[cle]?.court ?? cle)
  const intitule = creneau.intitule.toLocaleLowerCase('fr')
  /* L'arête colorée dit le ou les pôles ; le libellé qui la double n'est
     utile que pour ceux que l'intitulé ne nomme pas déjà — « CORAN »
     au-dessus de « Coran — en semaine » ne serait qu'un doublon, alors que
     « Fiqh » a besoin d'annoncer « Sciences musulmanes ». La couleur ne
     porte donc jamais l'information seule : elle est toujours doublée d'un
     nom, ici ou dans l'intitulé. */
  const aNommer = noms.filter((nom) => !intitule.includes(nom.toLocaleLowerCase('fr')))

  return (
    <article
      className="lp-card lp-planning__creneau"
      data-pole={creneau.poles[0]}
      data-pole-2={creneau.poles[1]}
    >
      {aNommer.length > 0 && (
        <p className="lp-planning__pole">{aNommer.join(' · ')}</p>
      )}

      <p className="lp-planning__heure lp-num">
        <time dateTime={creneau.debut}>{creneau.debut}</time>
        <span aria-hidden="true"> – </span>
        {/* Le tiret est décoratif ; c'est ce mot-ci que le lecteur d'écran
            entend entre les deux heures. Il vient de PLANNING_UI, comme
            celui de la clé de lecture au-dessus de la grille. */}
        <span className="lp-visually-hidden">{PLANNING_UI.cleEntre}</span>
        <time dateTime={creneau.fin}>{creneau.fin}</time>
      </p>

      <BarreJour debut={creneau.debut} fin={creneau.fin} />

      <h4 className="lp-planning__intitule">{creneau.intitule}</h4>

      {/* `groupe-nom` et non `groupe` : cette dernière classe est déjà prise
          par le panneau « Au choix », dont la carte héritait ici du padding
          et du fond. Un nom de classe repris, c'est un style hérité par
          accident. */}
      {creneau.groupe && (
        <p className="lp-planning__groupe-nom">{creneau.groupe}</p>
      )}

      {creneau.detail && (
        <p className="lp-planning__detail">
          {creneau.detail}
          {creneau.salutation && (
            <>
              {' '}
              <span className="lp-arabe" lang="ar">
                {creneau.salutation}
              </span>
            </>
          )}
        </p>
      )}

      {creneau.salle ? (
        <p className="lp-planning__salle">{creneau.salle}</p>
      ) : (
        <p className="lp-planning__salle lp-planning__salle--attente">
          {PLANNING_INTRO.salleCourt}
        </p>
      )}

      {/* Deux états que le classeur a rendus nécessaires. Ils ne se cumulent
          pas : une classe fermée n'a pas à discuter de sa formule. */}
      {creneau.inscriptionsOuvertes === false ? (
        <p className="lp-planning__etat-seance">
          <span className="lp-attente">{ETATS_SEANCE.anciensEleves}</span>
        </p>
      ) : creneau.inscriptionsOuvertes === true ? (
        /* Le pendant POSITIF, et il n'est pas décoratif : le Fiqh a deux
           niveaux au même horaire, dont un fermé. Sans cette mention, le
           lecteur devrait déduire de l'absence d'étiquette sur l'autre
           carte qu'il s'agit de celle qui l'accueille. */
        <p className="lp-planning__etat-seance">
          <span className="lp-planning__ouvert">{ETATS_SEANCE.nouvelleClasse}</span>
        </p>
      ) : creneau.formules?.length === 0 ? (
        <p className="lp-planning__etat-seance">
          <span className="lp-attente">{ETATS_SEANCE.horsFormule}</span>
        </p>
      ) : null}
    </article>
  )
}

/* ---------- Un bloc groupé ----------
   Il enjambe les colonnes de ses jours quand elles sont contiguës, et
   porte l'accolade qui les rassemble. Sinon il passe pleine largeur. */
function Groupe({ groupe }) {
  const titreId = `planning-groupe-${groupe.id}`
  const style = groupe.empan
    ? {
        '--lp-col-debut': groupe.empan.debut,
        '--lp-col-fin': groupe.empan.fin,
        '--lp-empan': groupe.empan.nb,
      }
    : undefined

  return (
    <section
      className="lp-planning__groupe"
      data-attente={groupe.auChoix ? undefined : 'oui'}
      style={style}
      aria-labelledby={titreId}
    >
      {groupe.empan && <span className="lp-planning__accolade" aria-hidden="true" />}

      <div className="lp-planning__groupe-tete">
        {groupe.auChoix ? (
          <>
            <p className="lp-eyebrow lp-eyebrow--sourd">{T.auChoixSurtitre}</p>
            <h3 className="lp-h4" id={titreId}>
              {groupe.jours.join(` ${T.auChoixLien} `)}
            </h3>
            <p className="lp-small">{T.auChoixTexte}</p>
          </>
        ) : (
          <>
            <p className="lp-attente">{PLANNING_INTRO.attenteJours}</p>
            <h3 className="lp-h4" id={titreId}>
              {PLANNING_INTRO.attenteTitre}
            </h3>
            <p className="lp-small">{PLANNING_INTRO.attenteTexte}</p>
          </>
        )}
      </div>

      <ol className="lp-planning__pile">
        {groupe.creneaux.map((creneau) => (
          <li key={creneau.id}>
            <Creneau creneau={creneau} />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function Planning() {
  /* L'état initial lit l'URL : « Voir les créneaux » depuis un pôle mène ici
     avec « ?pole=… », et l'adresse partagée doit rendre le même écran. */
  const [filtres, setFiltres] = useState(etatInitial)

  /* Même préfiltre, sans rechargement : la section « Les cours » émet
     « lp:pole » au clic, on l'écoute plutôt que de laisser l'URL mentir. */
  useEffect(() => {
    if (!AXE_POLE) return undefined
    const surPole = (e) => {
      const cle = e.detail
      if (!POLE_PAR_CLE[cle]) return
      setFiltres((f) => ({ ...f, pole: [cle] }))
    }
    window.addEventListener('lp:pole', surPole)
    return () => window.removeEventListener('lp:pole', surPole)
  }, [])

  const nbFiltres = AXES.reduce((n, axe) => n + (filtres[axe.cle]?.length ?? 0), 0)

  const bascule = useCallback((axe, valeur) => {
    setFiltres((f) => {
      const liste = f[axe] ?? []
      return {
        ...f,
        [axe]: liste.includes(valeur)
          ? liste.filter((v) => v !== valeur)
          : [...liste, valeur],
      }
    })
  }, [])

  const reinitialiser = useCallback(() => setFiltres(etatVide()), [])

  const visibles = useMemo(() => CRENEAUX.filter((c) => correspond(c, filtres)), [filtres])

  /* Comptage à facettes : le nombre affiché sur une option tient compte des
     autres axes, jamais du sien. Une option à 0 est rendue inerte
     (aria-disabled) — on ne propose pas un cul-de-sac, mais on ne retire
     pas non plus le bouton du parcours au clavier. */
  /* Le compteur emploie le MÊME prédicat que le filtre (`porte`), et non
     une inclusion stricte : sans cela, une puce « Femmes 7 » aurait affiché
     10 séances une fois cliquée, les trois séances sans groupe déclaré
     restant visibles. Conséquence assumée : la somme des puces d'un axe
     neutre dépasse le total, ces séances comptant dans les deux. Chaque
     nombre répond juste à « combien restera-t-il si je clique ici ». */
  const compter = (axe, valeur) =>
    CRENEAUX.filter(
      (c) => porte(axe, c, [valeur]) && correspond(c, filtres, axe.cle),
    ).reduce((n, c) => n + occurrences(c), 0)

  // Séances posées sur des jours fermes : elles vivent dans leurs colonnes.
  const fixes = useMemo(
    () => visibles.filter((c) => !c.auChoix && c.jours.length > 0),
    [visibles],
  )

  // Séances « au choix », et le cas échéant celles sans jours arrêtés.
  const groupes = useMemo(() => construireGroupes(visibles), [visibles])

  const semaine = useMemo(
    () =>
      JOURS_SEMAINE.map((jour) => ({
        jour,
        creneaux: fixes.filter((c) => c.jours.includes(jour)).sort(parHeure),
        // Ce que le jour porte « au choix » : annoncé dans l'en-tête de la
        // colonne, sans quoi un samedi paraîtrait vide de ses deux cours.
        auChoix: groupes
          .filter((g) => g.auChoix && g.jours.includes(jour))
          .reduce((n, g) => n + g.creneaux.length, 0),
      })),
    [fixes, groupes],
  )

  const nbSeances = visibles.reduce((n, c) => n + occurrences(c), 0)

  /* Le cadre de la semaine n'est un arrêt de tabulation QUE s'il défile
     vraiment : sous 1100px la grille s'empile et son overflow repasse à
     `visible`. On mesure au lieu de le supposer — un conteneur annoncé
     « région » où aucune touche n'a d'effet est un piège au clavier. */
  const refCadre = useRef(null)
  const [cadreDefile, setCadreDefile] = useState(false)
  useEffect(() => {
    const el = refCadre.current
    if (!el || typeof ResizeObserver === 'undefined') return undefined
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
            <p className="lp-lead">{T.lead}</p>
          </div>
          {/* Un seul traitement pour l'année scolaire sur toute la page :
              libellé en .lp-caption, valeur en .lp-num. */}
          <p className="lp-caption lp-planning__annee">
            {PLANNING_UI.annee}{' '}
            <span className="lp-num lp-planning__annee-valeur">{ORG.anneeScolaire}</span>
          </p>
        </ScrollReveal>

        {/* ---------- Barre de commande ----------
            Quatre séances et un seul axe de tri : le panneau de filtres
            d'origine — trois groupes encadrés, compteurs, réinitialisation —
            pesait plus lourd que les données qu'il triait. Il ne reste
            qu'une LÉGENDE, celle du codage par teinte, dont chaque entrée
            est cliquable. Un seul objet, deux services : elle explique les
            couleurs de la grille et elle la filtre. */}
        {AXES.length > 0 && (
          <div className="lp-planning__barre-cmd">
            {AXES.map((axe) => (
              <fieldset key={axe.cle} className="lp-planning__axe">
                <legend className="lp-eyebrow lp-eyebrow--sourd lp-planning__legende">
                  {axe.legende}
                </legend>
                <div className="lp-planning__choix">
                  {axe.options.map(({ valeur, libelle, complet }) => {
                    const actif = (filtres[axe.cle] ?? []).includes(valeur)
                    const n = compter(axe, valeur)
                    /* aria-disabled et non disabled : un bouton qui se
                       désactive alors qu'il a le focus le rend au <body>, et
                       l'on perd sa place dans la barre. Il reste donc
                       focalisable, annoncé, et sans effet au clic. */
                    const inerte = n === 0 && !actif
                    return (
                      <button
                        key={valeur}
                        type="button"
                        className="lp-planning__chip"
                        data-pole={axe.cle === 'pole' ? valeur : undefined}
                        aria-pressed={actif}
                        aria-label={`${complet} — ${n} ${motAccorde(n, T.motSeance)}`}
                        aria-disabled={inerte || undefined}
                        onClick={() => {
                          if (!inerte) bascule(axe.cle, valeur)
                        }}
                      >
                        {axe.cle === 'pole' && (
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

            <div className="lp-planning__etat">
              {/* Une seule unité dans toute la barre. Le résumé écrivait
                  « 2 cours sur 4 » et « 7 séances dans la semaine » à deux
                  mots d'intervalle : deux comptes incompatibles pour la même
                  chose. Il ne reste qu'une phrase, en séances, que le total
                  vienne compléter ou non selon qu'un filtre est posé. */}
              <p className="lp-planning__resume" role="status">
                <span className="lp-num">{nbSeances}</span>{' '}
                {motAccorde(nbSeances, T.motSeance)}{' '}
                {nbFiltres > 0 && (
                  <>
                    {T.surTotal} <span className="lp-num">{TOTAL_SEANCES}</span>{' '}
                  </>
                )}
                {T.dansLaSemaine}
              </p>
              {/* Même raison qu'au-dessus : « Tout afficher » remet le compteur
                  de filtres à zéro, ce qui aurait désactivé le bouton sous le
                  doigt — et rendu le focus au <body>. */}
              <button
                type="button"
                className="lp-planning__reset"
                onClick={() => {
                  if (nbFiltres > 0) reinitialiser()
                }}
                aria-disabled={nbFiltres === 0 || undefined}
              >
                {PLANNING_UI.toutAfficher}
              </button>
            </div>
          </div>
        )}

        {/* ---------- La semaine ----------
            Inatteignable avec les données du jour — une option sans créneau
            est inerte, on ne peut donc pas vider la grille. Le garde-fou
            reste : il suffirait d'un pôle déclaré sans séance. */}
        {visibles.length === 0 ? (
          <div className="lp-planning__vide">
            <p className="lp-h4">{PLANNING_UI.aucunResultat}</p>
            <p className="lp-small">{PLANNING_UI.aucunResultatAide}</p>
            <button
              type="button"
              className="lp-btn lp-btn--secondaire"
              onClick={reinitialiser}
            >
              {PLANNING_UI.toutAfficher}
            </button>
          </div>
        ) : (
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
              aria-label={cadreDefile ? PLANNING_INTRO.titre : undefined}
              tabIndex={cadreDefile ? 0 : undefined}
            >
              <div className="lp-planning__semaine">
                {semaine.map(({ jour, creneaux, auChoix }) => (
                  <section
                    key={jour}
                    className="lp-planning__jour"
                    data-vide={creneaux.length + auChoix === 0 ? 'oui' : undefined}
                    aria-labelledby={`planning-jour-${slug(jour)}`}
                  >
                    <div className="lp-planning__jour-tete">
                      {/* Rôle partagé, taille dérogatoire dans le partial :
                          un nom de jour se lit dans une colonne de 160px. */}
                      <h3
                        className="lp-eyebrow lp-planning__jour-nom"
                        id={`planning-jour-${slug(jour)}`}
                      >
                        {jour}
                      </h3>
                      <p className="lp-planning__jour-compte">
                        {creneaux.length > 0 && (
                          <>
                            {creneaux.length} {motAccorde(creneaux.length, T.motSeance)}
                          </>
                        )}
                        {/* Un samedi n'a qu'une séance à heure fixe, mais deux
                            cours au choix : le dire ici évite une colonne qui
                            paraît vide de ce que le bloc du dessous porte. */}
                        {auChoix > 0 && (
                          <span className="lp-planning__jour-choix">
                            {creneaux.length > 0 && (
                              <span aria-hidden="true"> · </span>
                            )}
                            {auChoix} {T.auChoixCourt}
                          </span>
                        )}
                        {creneaux.length + auChoix === 0 && PLANNING_UI.aucunCours}
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
                  </section>
                ))}

                {groupes.map((groupe) => (
                  <Groupe key={groupe.id} groupe={groupe} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- Mentions ---------- */}
        <aside className="lp-card lp-planning__mention" aria-labelledby="planning-a-noter">
          {/* Variante sourde : « À noter » n'est pas un surtitre de section.
              Le orange de .lp-eyebrow doit rester lisible comme tel.
              Le bloc est nommé PAR cette ligne, et non par un aria-label qui
              la répéterait mot pour mot au lecteur d'écran. */}
          <p className="lp-eyebrow lp-eyebrow--sourd" id="planning-a-noter">
            {PLANNING_UI.aNoter}
          </p>
          <p className="lp-small">{MENTION_HORAIRES}</p>
          <p className="lp-small">{PLANNING_INTRO.salleNote}</p>
        </aside>
      </div>
    </section>
  )
}
