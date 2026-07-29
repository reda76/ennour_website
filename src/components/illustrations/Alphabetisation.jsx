/* ============================================================
   Illustration du pôle « Alphabétisation » — la planche d’écriture.

   Le lawh est la tablette de bois des écoles coraniques : on l’accroche
   par son trou, on écrit dessus, on efface, on recommence. C’est l’objet
   de celui qui apprend, pas de celui qui sait — exactement ce que dit ce
   pôle : on part de zéro.

   Les lettres sont du VRAI texte arabe rendu en Amiri, pas des tracés
   imités : ا ب ت sont les trois premières lettres de l’alphabet, et un
   lecteur arabophone verrait immédiatement un dessin approximatif.
   La seconde ligne, plus petite et plus pâle, poursuit l’alphabet
   (ث ج ح خ د ذ) : la leçon continue au-delà des trois premières.

   Construction : tout est calé sur une réglure de quatre filets
   horizontaux. Le filet orange EST la ligne d’écriture — les lettres
   posent dessus, le point du bâ passe dessous, comme sur un cahier.
   Les marges haute et basse du champ sont égales à un point près.
   ============================================================ */

/* La planche et sa poignée sont un seul tracé : le lawh est taillé dans
   une seule pièce de bois, une poignée rapportée trahirait le dessin. */
const PLANCHE =
  'M24 33A3 3 0 0 1 27 30H78V24A14 14 0 0 1 92 10H108A14 14 0 0 1 122 24V30' +
  'H173A3 3 0 0 1 176 33V139A3 3 0 0 1 173 142H27A3 3 0 0 1 24 139Z'

/* La réglure. Y_BASE porte à la fois le filet orange et la ligne de base
   du texte : une seule valeur, donc aucune dérive possible entre les deux. */
const Y_HAUT = 51
const Y_BASE = 79
const Y_PIED = 93
const Y_SUITE = 115

export default function Alphabetisation({ className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`lp-illu${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {/* Un lavis très léger suffit à donner sa matière au bois : au-delà,
          le dessin cesserait d’être un trait. */}
      <path d={PLANCHE} style={{ fill: 'var(--orange-5)' }} fillOpacity="0.5" />
      <path d={PLANCHE} stroke="currentColor" strokeWidth="2.2" />

      {/* Le trou par lequel on suspend la planche : le seul détail qui dit
          qu’il s’agit d’un objet d’usage, pas d’un cadre. */}
      <circle cx="100" cy="22" r="4" style={{ stroke: 'var(--accent)' }} strokeWidth="1.8" />

      {/* Le champ d’écriture, encadré comme une page de manuscrit. */}
      <rect x="31" y="37" width="138" height="98" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />

      {/* Filets de guidage : le haut des lettres, le bas des jambages,
          la seconde ligne. Pâles, ils ne doivent pas rivaliser avec l’encre. */}
      {[Y_HAUT, Y_PIED, Y_SUITE].map((y) => (
        <path key={y} d={`M41 ${y}H159`} stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.28" />
      ))}

      {/* La ligne d’écriture. */}
      <path d={`M41 ${Y_BASE}H159`} style={{ stroke: 'var(--accent)' }} strokeWidth="2" />

      {/* `direction: rtl` est porté par le texte lui-même : sans lui, les
          espaces qui séparent les lettres isolées ne sont pas garantis d’être
          traités dans le bon sens de lecture. */}
      <text
        x="100"
        y={Y_BASE}
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: 'var(--ff-arabe)', fontSize: '40px', direction: 'rtl', wordSpacing: '1px' }}
      >
        ا ب ت
      </text>

      {/* 20px et non 15, 0,65 et non 0,5 : à 360px de large la plaque réduit
          le dessin à ~0,745, et la seconde ligne tombait à 11px d'arabe à
          demi-opacité — une trace grise illisible, c'est-à-dire exactement
          le « dessin approximatif » que ce fichier dit vouloir éviter. Elle
          reste plus petite et plus pâle que la première : c'est la suite de
          la leçon, pas son sujet. */}
      <text
        x="100"
        y={Y_SUITE}
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.65"
        style={{ fontFamily: 'var(--ff-arabe)', fontSize: '20px', direction: 'rtl', wordSpacing: '4px' }}
      >
        ث ج ح خ د ذ
      </text>
    </svg>
  )
}
