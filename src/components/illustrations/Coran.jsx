/* ============================================================
   MOSQUÉE EN-NOUR — Illustration du pôle « Apprentissage du
   Noble Coran ».

   Un mushaf ouvert posé sur un rehal, le porte-livre à deux
   planches croisées. L’objet est choisi parce qu’il n’appartient
   qu’à ce contexte : un livre seul aurait pu être n’importe quel
   livre, le rehal dit lequel.

   Le dessin ne contient aucun être vivant, conformément à ce que
   la mosquée attend d’une image sur son site.

   Toute la géométrie est construite : les planches sont deux
   rectangles de même largeur inclinés en miroir, les pages deux
   quadrilatères symétriques, les lignes de texte l’interpolation
   régulière du quadrilatère de la page. Rien n’est tracé « à
   main levée ».
   ============================================================ */

/* La planche de derrière est tracée en segments interrompus : le
   jour laissé au croisement est ce qui donne le dessus à l’autre.
   Un aplat de fond aurait fait le même office, mais il aurait
   supposé connaître la couleur sur laquelle l’illustration est
   posée — ici elle peut l’être sur n’importe laquelle. */
const REHAL_DERRIERE = [
  'M180.5 58.5L101 98.3',
  'M91.6 103L41.6 128',
  'M183.5 64.5L108.4 102',
  'M99 106.7L56.4 128',
  'M180.5 58.5L183.5 64.5',
  'M56.4 128L41.6 128',
]

/* Les lignes du texte sont des traits, et rien d’autre. Simuler
   de l’arabe illisible reviendrait à contrefaire le texte du
   Coran : le trait, lui, ne prétend rien. */
const LIGNES = [
  'M83.5 58.2Q60.3 51.3 37.1 42.7',
  'M83.3 63.3Q59.9 56.3 36.5 47.7',
  'M83.2 68.3Q59.5 61.2 35.9 52.6',
  'M83 73.3Q59.2 66.2 35.3 57.6',
  'M82.9 78.3Q58.8 71.2 34.8 62.5',
  'M116.5 58.2Q139.7 51.3 162.9 42.7',
  'M116.7 63.3Q140.1 56.3 163.5 47.7',
  'M116.8 68.3Q140.5 61.2 164.1 52.6',
  'M117 73.3Q140.8 66.2 164.7 57.6',
  'M117.1 78.3Q141.2 71.2 165.2 62.5',
]

export default function Coran({ className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`lp-illu${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {/* Le tracé était sensiblement plus court que ceux des deux autres
          cartes (102 unités de haut contre 125 et 132), avec des marges
          haute et basse deux fois plus larges : dans une grille de trois
          cartes, il flottait au milieu d’une plaque à moitié vide.

          D’où cette homothétie, calée pour que la ligne de sol du rehal
          tombe sur SOL = 130, l’horizon des Sciences musulmanes. Le facteur
          s’arrête à 1,1 et non aux ~1,22 qu’il faudrait pour égaler leur
          hauteur : le mushaf ouvert est déjà large de 174 unités sur 200 —
          au-delà, ses tranches sortent du viewBox et sont coupées net —
          l’objet est plus étalé que ses voisins, pas plus petit. Les
          épaisseurs de trait suivent l’échelle, ce qui les amène de
          1,3–1,7 à 1,4–1,9, soit la plage des deux autres dessins. */}
      <g transform="translate(-10 -10.8) scale(1.1)">
        {/* Le rehal d’abord : le livre, opaque, le recouvrira, et c’est
            ce recouvrement qui le pose DEVANT les montants. */}
        {REHAL_DERRIERE.map((d) => (
          <path key={d} d={d} stroke="currentColor" strokeWidth="1.6" />
        ))}
        <path
          d="M19.5 58.5L16.5 64.5L143.6 128L158.4 128Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        {/* Le sol : sans ce filet, les deux pieds flottent. */}
        <path d="M38.6 128H161.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.28" />

        {/* Le bloc de pages vu par la tranche, dos compris : une seule
            bande dont le bord intérieur est le contour des pages et le
            bord extérieur ce même contour décalé de l’épaisseur. Le dos
            est arrondi par une quadratique tangente aux deux tranches —
            sans elle le livre finirait en pointe, ce qu’aucune reliure
            ne fait. */}
        <path
          d="M23 26L19 28L13 69Q57.3 85.9 91.4 93.9Q100 96.1 108.6 93.9Q142.7 85.9 187 69L181 28L177 26L183 67Q141.5 83.9 100 94Q58.5 83.9 17 67Z"
          fill="var(--orange-5)"
          stroke="currentColor"
          strokeWidth="1.4"
        />

        {/* Les deux pages. Le voile clair leur donne une surface : c’est
            lui qui masque les bras du rehal passés dessous. */}
        <path
          d="M100 52Q61.5 42.2 23 26L17 67Q58.5 83.9 100 94Z"
          fill="var(--orange-5)"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M100 52Q138.5 42.2 177 26L183 67Q141.5 83.9 100 94Z"
          fill="var(--orange-5)"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        {/* Le jadwal : le filet qui encadre le texte dans un mushaf.
            C’est le seul endroit où l’orange de la façade intervient —
            il est ici purement décoratif, jamais porteur de sens. */}
        <path
          d="M89.9 54.9L31.4 35.3L27.5 65.7L89.3 85.9Z"
          stroke="var(--accent)"
          strokeWidth="1.1"
        />
        <path
          d="M110.1 54.9L168.6 35.3L172.5 65.7L110.7 85.9Z"
          stroke="var(--accent)"
          strokeWidth="1.1"
        />

        {LIGNES.map((d) => (
          <path key={d} d={d} stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.5" />
        ))}
      </g>
    </svg>
  )
}
