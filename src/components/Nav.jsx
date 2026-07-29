import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { ORG, SECTIONS, NAV_CTA, NAV_EXCLUS } from '../data/contenu.js'
import { useScrollY } from '../hooks/useScrollY.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/* La barre de navigation du site.

   Trois idées la gouvernent :
   — elle est POSÉE SUR la page (position: fixed), jamais dans le flux : le
     hero est dessiné pour la recevoir et .lp-section porte déjà le
     scroll-margin-top qui compense sa hauteur ;
   — elle se REFERME au scroll (72 → 56px, la baseline se replie, le fond
     s'opacifie) : la page se resserre à mesure qu'on descend ;
   — son arête basse est une LIGNE D'HORIZON dont le foyer lumineux avance
     avec la lecture. La barre de progression n'est donc pas un accessoire
     rapporté : c'est le motif signature du site qui sert d'indicateur. */

/* Hauteur de la barre + une marge, en dur : rootMargin n'accepte pas de
   variable CSS. À garder cohérent avec --nav-height (72px). */
const BANDE_HAUTE = 88

/* Au-delà de ce défilement la barre passe en mode resserré. */
const SEUIL_CONDENSE = 40

const LIENS = SECTIONS.filter((s) => !NAV_EXCLUS.includes(s.id))

export default function Nav() {
  const y = useScrollY()
  const progression = useScrollProgress()
  const reduit = useReducedMotion()

  const [ouvert, setOuvert] = useState(false)
  const [courante, setCourante] = useState(SECTIONS[0]?.id ?? null)

  const refBurger = useRef(null)
  const refPanneau = useRef(null)

  const condense = y > SEUIL_CONDENSE
  const ancreContenu = SECTIONS[0]?.id ?? 'accueil'

  const fermer = useCallback(() => setOuvert(false), [])

  /* Défilement piloté en JS plutôt que laissé au navigateur : il faut fermer
     le panneau (et rendre le scroll au body) AVANT que la page ne bouge. */
  const allerVers = useCallback(
    (e, id) => {
      const cible = document.getElementById(id)
      if (!cible) return // section pas encore montée : on laisse le lien agir
      e.preventDefault()
      fermer()
      requestAnimationFrame(() => {
        cible.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'start' })
        window.history?.replaceState?.(null, '', `#${id}`)
      })
    },
    [fermer, reduit],
  )

  /* Section courante : on n'observe qu'une bande étroite sous la barre.
     La section active est la DERNIÈRE (dans l'ordre du document) à y
     figurer, c'est-à-dire celle qui vient d'atteindre le haut de l'écran. */
  useEffect(() => {
    const cibles = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (cibles.length === 0) return

    const visibles = new Set()
    const obs = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (entree.isIntersecting) visibles.add(entree.target.id)
          else visibles.delete(entree.target.id)
        }
        const presentes = SECTIONS.filter((s) => visibles.has(s.id))
        if (presentes.length > 0) setCourante(presentes[presentes.length - 1].id)
      },
      { rootMargin: `-${BANDE_HAUTE}px 0px -55% 0px`, threshold: 0 },
    )
    cibles.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  /* Panneau mobile ouvert : défilement de la page bloqué, Échap ferme, et le
     focus tourne en boucle entre le bouton burger et le contenu du panneau —
     le burger fait partie du piège puisqu'il porte la fermeture. */
  useEffect(() => {
    if (!ouvert) return

    const precedent = document.activeElement
    /* Le verrou se pose sur <html>, PAS sur <body> : site.css impose
       `html { overflow-x: hidden }`, ce qui fait de <html> l'élément qui
       défile réellement et empêche l'overflow de <body> de se propager au
       viewport. Le verrou posé sur body ne bloquait donc rien — la page
       continuait de défiler derrière le panneau. */
    const racine = document.documentElement
    const scrollBloque = racine.style.overflow

    /* Le burger ouvre la boucle : c'est lui qui porte la fermeture, il doit
       rester atteignable au clavier alors qu'il est hors du panneau. */
    const focusables = () => {
      const dedans = refPanneau.current
        ? Array.from(refPanneau.current.querySelectorAll('a[href], button:not([disabled])'))
        : []
      return [refBurger.current, ...dedans].filter(Boolean)
    }

    const onTouche = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        fermer()
        return
      }
      if (e.key !== 'Tab') return
      const liste = focusables()
      if (liste.length === 0) return
      const premier = liste[0]
      const dernier = liste[liste.length - 1]
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault()
        dernier.focus()
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault()
        premier.focus()
      }
    }

    racine.style.overflow = 'hidden'
    document.addEventListener('keydown', onTouche)

    return () => {
      document.removeEventListener('keydown', onTouche)
      racine.style.overflow = scrollBloque
      if (precedent instanceof HTMLElement) precedent.focus()
    }
  }, [ouvert, fermer])

  /* Passage au-dessus du point de bascule : le panneau n'a plus lieu d'être. */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = (e) => {
      if (e.matches) setOuvert(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      className={`lp-nav${condense ? ' is-condense' : ''}`}
      style={{ '--lp-progression': `${(progression * 100).toFixed(2)}%` }}
    >
      {/* Le lien d'évitement vise le <main> lui-même (id « contenu »), pas la
          première section : c'est le landmark que l'on veut atteindre, et il
          reste juste même si l'ordre de SECTIONS change. */}
      <a className="lp-skip" href="#contenu">
        Aller au contenu
      </a>

      <div className="lp-nav__fond" aria-hidden="true" />

      <div className="lp-wrap lp-nav__barre">
        <a
          className="lp-nav__marque"
          href={`#${ancreContenu}`}
          onClick={(e) => allerVers(e, ancreContenu)}
        >
          <Logo titre="" />
          <span className="lp-nav__marque-texte">
            <span className="lp-h3 lp-nav__nom">{ORG.nom}</span>
            <span className="lp-nav__baseline">{ORG.baseline}</span>
          </span>
        </a>

        <nav className="lp-nav__liens" aria-label="Sections du site">
          <ul className="lp-nav__liste">
            {LIENS.map((s) => (
              <li key={s.id}>
                <a
                  className={`lp-nav__lien${courante === s.id ? ' is-courant' : ''}`}
                  href={`#${s.id}`}
                  aria-current={courante === s.id ? 'location' : undefined}
                  onClick={(e) => allerVers(e, s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lp-nav__actions">
          <a
            className="lp-btn lp-btn--primaire lp-nav__cta"
            href={`#${NAV_CTA.cible}`}
            onClick={(e) => allerVers(e, NAV_CTA.cible)}
          >
            {NAV_CTA.libelle}
          </a>

          <button
            ref={refBurger}
            type="button"
            className={`lp-nav__burger${ouvert ? ' is-ouvert' : ''}`}
            aria-expanded={ouvert}
            aria-controls="lp-nav-panneau"
            onClick={() => setOuvert((v) => !v)}
          >
            <span className="lp-visually-hidden">
              {ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            </span>
            {/* Trois traits d'amplitudes différentes : la houle de la trame de
                vagues, réduite à un pictogramme. */}
            <span className="lp-nav__trait" aria-hidden="true" />
            <span className="lp-nav__trait" aria-hidden="true" />
            <span className="lp-nav__trait" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* L'arête basse : filet d'encre pâle + foyer orange qui avance avec la
          lecture. Purement visuel, la position de lecture n'est pas une
          information à annoncer. */}
      <div className="lp-nav__horizon" aria-hidden="true" />

      {ouvert && (
        /* Ni role="dialog" ni aria-modal : la SEULE commande de fermeture est
           le burger, et il vit hors du panneau (barre en z-index 2, panneau
           en 0). aria-modal="true" retirait tout ce qui est hors du panneau
           de l'arbre d'accessibilité — le bouton « Fermer le menu », pourtant
           visible et cliquable, devenait introuvable au lecteur d'écran.
           Le panneau est donc traité pour ce qu'il est : un révélateur piloté
           par aria-expanded / aria-controls sur le burger, qui le précède
           dans le DOM. Échap ferme, et le focus reste piégé entre les deux. */
        /* (aria-label retiré avec le rôle : sur un <div> sans rôle il n'est
           annoncé nulle part. C'est le <nav> intérieur qui porte le nom.) */
        <div id="lp-nav-panneau" ref={refPanneau} className="lp-nav__panneau">
          <nav className="lp-wrap lp-nav__panneau-corps" aria-label="Toutes les sections">
            <ul className="lp-nav__panneau-liste">
              {SECTIONS.map((s, i) => (
                <li key={s.id} style={{ '--lp-rang': reduit ? 0 : i }}>
                  <a
                    className={`lp-nav__panneau-lien${courante === s.id ? ' is-courant' : ''}`}
                    href={`#${s.id}`}
                    aria-current={courante === s.id ? 'location' : undefined}
                    onClick={(e) => allerVers(e, s.id)}
                  >
                    <span className="lp-nav__panneau-marque" aria-hidden="true" />
                    <span className="lp-h3">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              className="lp-btn lp-btn--primaire lp-nav__panneau-cta"
              href={`#${NAV_CTA.cible}`}
              onClick={(e) => allerVers(e, NAV_CTA.cible)}
            >
              {NAV_CTA.libelle}
            </a>

            {/* L'année scolaire n'est pas reprise ici : elle est déjà annoncée
                par le surtitre de la section Inscription, à un lien d'ici. */}
            <p className="lp-small lp-nav__panneau-pied">{ORG.baseline}</p>
          </nav>
        </div>
      )}
    </header>
  )
}
