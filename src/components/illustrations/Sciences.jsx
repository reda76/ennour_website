/* ============================================================
   Illustration du pôle « Sciences musulmanes » (Fiqh & Sîra).

   Un mihrab au centre d’une arcade aveugle : la niche du mur de
   qibla, encadrée de son alfiz — le cadre rectangulaire andalou —
   et flanquée de deux arcs plus petits. Le tympan porte une étoile
   à huit branches ; le dado, sous la naissance de l’arc, porte le
   réseau d’étoiles et de croix dont cette étoile est un nœud.

   Le sujet n’est pas décoratif : une science se reconnaît à son
   ordonnancement. D’où le parti le plus architectural des trois
   illustrations — un tracé régulier, une hiérarchie d’échelles,
   rien qui soit posé « à main levée ».
   ============================================================ */

/* L’arc est celui du premier écran (Hero.jsx, constante ARC) : le dessin
   de la vraie porte de la mosquée. Le reprendre mot pour mot garantit que
   les deux pages parlent du même bâtiment. */
const ARC =
  'M20 368V208c-20-33-20-73 0-107 20-47 80-67 120-86 40 19 100 39 120 86 20 34 20 74 0 107v160'

const SOL = 130 /* le sol commun des trois arcs */

/* Trois poses du MÊME tracé. La réduction se fait autour du point de base :
   les piédroits restent au sol pendant que la voûte se resserre — c’est ce
   qui distingue une arcade hiérarchisée d’une simple homothétie flottante.
   Les petits arcs culminent exactement à la naissance du grand : c’est ce
   calage qui fait tenir l’élévation. */
const ARCS = {
  mihrab: { cx: 100, echelle: 0.29178 },
  gauche: { cx: 28, echelle: 0.13598 },
  droite: { cx: 172, echelle: 0.13598 },
}

const poser = (a) => `translate(${a.cx} ${SOL}) scale(${a.echelle}) translate(-140 -368)`

/* L’épaisseur est divisée par l’échelle : le trait doit être identique à
   l’œil d’un arc à l’autre, alors qu’il est tracé dans le repère d’origine. */
const trait = (a, epaisseur) => epaisseur / a.echelle

/* Réseau girih dit « d’étoiles et de croix » : étoiles à huit branches à
   pointes de 45°, sur une trame carrée de 26 unités, dont les pointes
   axiales se touchent d’une maille à l’autre — les croix naissent alors
   du vide, sans être dessinées. Le tracé est clipé sur le profil de l’arc,
   comme un carrelage coupé au droit de la niche. */
const RESEAU =
  'M74 84.6L76.7 91.1L83.2 88.4L80.5 94.9L87 97.6L80.5 100.3L83.2 106.8L76.7 104.1L74 110.6' +
  'L71.3 104.1L66.8 106M66.8 89.2L71.3 91.1L74 84.6M74 110.6L76.7 117.1L83.2 114.4L80.5 120.9' +
  'L87 123.6L80.5 126.3L81.7 129.1M66.8 115.2L71.3 117.1L74 110.6M100 84.6L102.7 91.1L109.2 88.4' +
  'L106.5 94.9L113 97.6L106.5 100.3L109.2 106.8L102.7 104.1L100 110.6L97.3 104.1L90.8 106.8' +
  'L93.5 100.3L87 97.6L93.5 94.9L90.8 88.4L97.3 91.1L100 84.6M100 110.6L102.7 117.1L109.2 114.4' +
  'L106.5 120.9L113 123.6L106.5 126.3L107.7 129.1M92.3 129.1L93.5 126.3L87 123.6L93.5 120.9' +
  'L90.8 114.4L97.3 117.1L100 110.6M126 84.6L128.7 91.1L133.2 89.2M133.2 106L128.7 104.1L126 110.6' +
  'L123.3 104.1L116.8 106.8L119.5 100.3L113 97.6L119.5 94.9L116.8 88.4L123.3 91.1L126 84.6' +
  'M126 110.6L128.7 117.1L133.2 115.2M118.3 129.1L119.5 126.3L113 123.6L119.5 120.9L116.8 114.4' +
  'L123.3 117.1L126 110.6'

/* L’étoile maîtresse du tympan : même construction que celles du réseau,
   au double de l’échelle. Le rayon (22) est le plus grand qui laisse plus
   de trois unités de dégagement avec le profil de l’arc, tous azimuts. */
const ETOILE =
  'M100 33L104.6 44L115.6 39.4L111 50.4L122 55L111 59.6L115.6 70.6L104.6 66L100 77L95.4 66' +
  'L84.4 70.6L89 59.6L78 55L89 50.4L84.4 39.4L95.4 44Z'

export default function Sciences({ className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`lp-illu${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {/* Le lavis de la niche — le seul aplat du dessin. Il ne colore pas :
          il creuse, en détachant le vide de l’arc du plan du mur. */}
      <path d={ARC} transform={poser(ARCS.mihrab)} fill="var(--orange-5)" />

      <path d={RESEAU} stroke="currentColor" strokeOpacity="0.32" strokeWidth="1.3" />

      {/* L’imposte : la ligne d’où l’arc prend naissance. Elle sépare le
          tympan du dado, et explique pourquoi le réseau s’arrête là. */}
      <path d="M65 83.3H135" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.3" />

      <path d="M52 130V13H148V130" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.6" />

      {/* Les deux arcs aveugles, plus pâles : ils situent le mihrab dans une
          arcade sans jamais lui disputer le regard. */}
      {[ARCS.gauche, ARCS.droite].map((a) => (
        <path
          key={a.cx}
          d={ARC}
          transform={poser(a)}
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth={trait(a, 1.7)}
        />
      ))}

      <path
        d={ARC}
        transform={poser(ARCS.mihrab)}
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth={trait(ARCS.mihrab, 2.1)}
      />

      {/* Seul élément en accent : le nœud du tracé. --accent est ici un
          trait, jamais un fond de texte — l’emploi pour lequel il est prévu. */}
      <path d={ETOILE} stroke="var(--accent)" strokeWidth="2" />

      {/* Stylobate : le sol, puis la plinthe à arêtes rabattues. Sans elle
          l’arcade flotterait au bas du cadre. */}
      <path d="M14 130h172" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.8" />
      <path d="M14 130L8 138H192L186 130" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  )
}
