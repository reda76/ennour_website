import { PHOTOS } from '../data/contenu.js'

/* ============================================================
   MOSQUÉE EN-NOUR — Le bandeau de façade.

   Il occupe le raccord entre le premier écran et « Les cours »,
   à la place du filet d'horizon qui s'y trouvait : une image pleine
   largeur sépare deux sections bien plus franchement qu'un trait,
   en poser les deux ferait doublon.

   Ce n'est PAS un décor : la photo montre le bâtiment où l'on se
   rend, elle porte donc un vrai texte alternatif et une légende
   visible. C'est aussi la seule respiration purement visuelle de la
   page — le reste est du texte et des données.

   Pleine largeur mais pas pleine hauteur : le rapport est bridé pour
   que l'enseigne et les arcs tiennent dans le cadre sans qu'il faille
   défiler pour voir le haut du bâtiment.
   ============================================================ */

export default function Facade() {
  const photo = PHOTOS?.facade
  /* Repli silencieux : sans photo déclarée, le bandeau disparaît et la page
     reste correcte. Elle a déjà été retirée une fois. */
  if (!photo?.src) return null

  return (
    <figure className="lp-facade">
      <img
        className="lp-facade__image"
        src={photo.src}
        srcSet={photo.srcset}
        /* Le bandeau est pleine largeur : la fenêtre EST la largeur d'affichage.
           Sans ce `sizes`, le navigateur retiendrait la variante 1000 px par
           défaut et le bandeau serait adouci sur un grand écran. */
        sizes="100vw"
        width={photo.largeur}
        height={photo.hauteur}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: `center ${photo.focus}` }}
      />
      {photo.legende ? (
        <figcaption className="lp-facade__legende">
          <span className="lp-caption">{photo.legende}</span>
        </figcaption>
      ) : null}
    </figure>
  )
}
