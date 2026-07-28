import { useId } from 'react'

/* Géométrie issue de src/assets/logo-lephare.svg (viewBox 64×64).
   Le fichier .svg reste la référence : toute retouche s'y fait d'abord,
   puis se recopie ici. Le composant existe pour deux raisons que le
   fichier seul ne peut pas remplir :
   — la masse suit `currentColor`, ce qui exige un SVG en ligne (une
     balise <img> résoudrait currentColor sur du noir) ;
   — les dégradés portent des id uniques par instance, sinon deux logos
     sur la même page (en-tête + pied de page) se voleraient leurs defs. */

const MASSE =
  'M21.50 58.00 L21.50 50.40 L20.50 50.40 L20.50 48.60 L22.50 48.60 ' +
  'Q25.50 37.10 25.50 25.60 L22.10 23.40 L22.10 21.20 L25.40 21.20 ' +
  'L25.40 12.90 L23.20 12.90 L23.20 11.50 L30.10 7.40 L31.10 7.40 ' +
  'L31.10 6.40 L32.90 6.40 L32.90 7.40 L33.90 7.40 L40.80 11.50 ' +
  'L40.80 12.90 L38.60 12.90 L38.60 21.20 L41.90 21.20 L41.90 23.40 ' +
  'L38.50 25.60 Q38.50 37.10 41.50 48.60 L43.50 48.60 L43.50 50.40 ' +
  'L42.50 50.40 L42.50 58.00 Z ' +
  'M30.05 58.00 L30.05 53.90 A1.95 1.95 0 0 1 33.95 53.90 L33.95 58.00 Z'

const PANNEAUX = [
  'M27.30 14.60 h2.50 v5.40 h-2.50 Z',
  'M30.75 14.60 h2.50 v5.40 h-2.50 Z',
  'M34.20 14.60 h2.50 v5.40 h-2.50 Z',
]

const FAISCEAUX = [
  { d: 'M32.00 17.30 L-1.87 20.26 L-0.51 7.36 Z', x2: -1.81 },
  { d: 'M32.00 17.30 L64.51 7.36 L65.87 20.26 Z', x2: 65.81 },
]

/**
 * Le logo « Le Phare ».
 *
 * @param {boolean} faisceaux — dessine les deux cônes de lumière (défaut : oui).
 *                              Les éteindre sous ~28px, où ils ne sont plus
 *                              qu'un voile sale autour de la tour.
 * @param {string}  titre     — libellé accessible. Passer titre="" rend le
 *                              logo décoratif (aria-hidden) : à faire quand
 *                              le nom « Le Phare » est déjà écrit à côté.
 */
export default function LogoPhare({ faisceaux = true, titre = 'Le Phare', className = '', ...rest }) {
  const uid = useId()
  const idFeu = `${uid}-feu`
  const decoratif = titre === ''

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={`lp-logo${faisceaux ? '' : ' lp-logo--nu'}${className ? ` ${className}` : ''}`}
      role={decoratif ? undefined : 'img'}
      aria-hidden={decoratif ? 'true' : undefined}
      aria-label={decoratif ? undefined : titre}
      {...rest}
    >
      <defs>
        {faisceaux && FAISCEAUX.map((f, i) => (
          <linearGradient
            key={i}
            id={`${uid}-b${i}`}
            gradientUnits="userSpaceOnUse"
            x1="32" y1="17.3" x2={f.x2} y2="13.75"
          >
            <stop offset="0" stopColor="#f0d878" stopOpacity=".72" />
            <stop offset=".28" stopColor="#c9a227" stopOpacity=".3" />
            <stop offset="1" stopColor="#c9a227" stopOpacity="0" />
          </linearGradient>
        ))}
        <linearGradient id={idFeu} gradientUnits="userSpaceOnUse" x1="32" y1="14.6" x2="32" y2="20">
          <stop offset="0" stopColor="#f0d878" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
      </defs>

      {faisceaux && (
        <g className="lp-logo__faisceau">
          {FAISCEAUX.map((f, i) => <path key={i} d={f.d} fill={`url(#${uid}-b${i})`} />)}
        </g>
      )}

      <g className="lp-logo__masse" fill="currentColor">
        <circle cx="32" cy="5" r="1.65" />
        <path fillRule="evenodd" d={MASSE} />
      </g>

      <g className="lp-logo__feu" fill={`url(#${idFeu})`}>
        {PANNEAUX.map((d, i) => <path key={i} d={d} />)}
      </g>
    </svg>
  )
}
