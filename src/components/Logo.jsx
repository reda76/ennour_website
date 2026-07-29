/* ============================================================
   MOSQUÉE EN-NOUR — La marque.

   L'arc outrepassé brisé de la porte, relevé sur la photo de la
   façade. Deux éléments, pas un de plus : le contour de l'arche en
   `currentColor`, et la lumière qui passe par l'ouverture en orange.
   « An-Nour » veut dire la lumière — le mark le dit littéralement.

   Deux éléments seulement, parce que la marque doit tenir à 24px
   dans la barre : tout détail supplémentaire s'y refermerait en tache.

   La masse suit `color`, donc le logo se pose aussi bien sur le
   plâtre que sur un aplat orange.
   ============================================================ */

/**
 * @param {string} titre  Titre accessible. Chaîne vide = purement décoratif
 *                        (le nom « Mosquée En-Nour » est déjà écrit à côté).
 */
export default function Logo({ titre = 'Mosquée En-Nour', className = '', ...rest }) {
  const decoratif = titre === ''
  return (
    <svg
      viewBox="0 0 48 56"
      className={`lp-logo${className ? ` ${className}` : ''}`}
      role={decoratif ? undefined : 'img'}
      aria-hidden={decoratif ? 'true' : undefined}
      aria-label={decoratif ? undefined : titre}
      focusable="false"
      {...rest}
    >
      {/* L'ouverture : la lumière qui passe. Dessinée d'abord pour vivre
          SOUS le contour — sinon le trait orange déborderait de l'encre. */}
      <path
        d="M14.1 54V40.8c-1.7-2.8-1.7-6.1 0-8.8 1.7-3.9 6.6-5.5 9.9-7.2 3.3 1.7 8.2 3.3 9.9 7.2 1.7 2.7 1.7 6 0 8.8V54z"
        fill="var(--accent, #e46024)"
      />
      {/* Le contour de l'arche. */}
      <path
        d="M6 54V30c-3-5-3-11 0-16 3-7 12-10 18-13 6 3 15 6 18 13 3 5 3 11 0 16v24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
