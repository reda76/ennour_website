import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Cours from '../components/Cours.jsx'
import Planning from '../components/Planning.jsx'
import Tarifs from '../components/Tarifs.jsx'
import Calendrier from '../components/Calendrier.jsx'
import Inscription from '../components/Inscription.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

/* ============================================================
   LE PHARE — la page unique.

   Trois responsabilités, et trois seulement :

   1. LES LANDMARKS. <header> (la barre) et <footer> (le pied) vivent
      HORS de <main> : ce sont des repères de page, pas du contenu de
      page. <main id="contenu"> est la cible du lien d'évitement de la
      barre — un seul <main>, un seul <h1> (dans le hero).

   2. L'ORDRE. Il suit exactement SECTIONS de contenu.js
      (accueil → cours → planning → tarifs → calendrier → inscription
      → contact), ce dont dépendent la barre de navigation, le plan du
      site du pied et surtout l'ALTERNANCE DES FONDS : les sections
      posent leur --bg / --surface en fonction de leur rang. Déplacer
      une section ici oblige à reprendre son `background`.

   3. LES LIGNES D'HORIZON. Elles sont posées ICI et nulle part
      ailleurs : leur seul intérêt est que le point lumineux se DÉPLACE
      d'une occurrence à l'autre, ce qu'aucune section ne peut décider
      seule. À l'échelle de la page, ce déplacement reconstitue le
      balayage du phare. Le raccord contact → pied de page fait
      exception : c'est la houle du pied qui le tient.
   ============================================================ */

/* Abscisses du foyer lumineux, dans l'ordre des raccords. Jamais deux
   valeurs voisines proches : le balayage doit se voir. */
const HORIZONS = ['26%', '70%', '18%', '62%', '34%', '78%']

function Horizon({ rang }) {
  return <hr className="lp-horizon" style={{ '--horizon-x': HORIZONS[rang] }} />
}

export default function Vitrine() {
  return (
    <>
      <Nav />

      {/* tabIndex={-1} : sans lui, le lien d'évitement déplace le
          défilement mais pas le focus sur Safari et sur plusieurs lecteurs
          d'écran — la tabulation suivante repartait de la barre. Le contour
          de focus est neutralisé sur ce seul élément (chrome.css) : c'est un
          point d'atterrissage, pas un contrôle. */}
      <main id="contenu" tabIndex={-1}>
        <Hero />
        <Horizon rang={0} />

        <Cours />
        <Horizon rang={1} />

        <Planning />
        <Horizon rang={2} />

        <Tarifs />
        <Horizon rang={3} />

        <Calendrier />
        <Horizon rang={4} />

        <Inscription />
        <Horizon rang={5} />

        <Contact />
      </main>

      <Footer />
    </>
  )
}
