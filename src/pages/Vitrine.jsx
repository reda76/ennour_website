import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Facade from '../components/Facade.jsx'
import Cours from '../components/Cours.jsx'
import Planning from '../components/Planning.jsx'
import Tarifs from '../components/Tarifs.jsx'
import Calendrier from '../components/Calendrier.jsx'
import Faq from '../components/Faq.jsx'
import Inscription from '../components/Inscription.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

/* ============================================================
   MOSQUÉE EN-NOUR — la page unique.

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
      déplacement du foyer. Le raccord contact → pied de page fait
      exception : c'est la houle du pied qui le tient.
   ============================================================ */

/* Abscisses du foyer lumineux, dans l'ordre des raccords. Jamais deux
   valeurs voisines proches : le déplacement doit se voir.
   CINQ valeurs et non six : le raccord accueil → cours est désormais tenu
   par le bandeau de façade, qui sépare bien plus franchement qu'un filet.
   Retirer ou ajouter un raccord oblige à reprendre cette liste. */
const HORIZONS = ['70%', '18%', '62%', '34%', '78%', '46%']

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
        {/* Le bandeau tient lieu de raccord : pas d'horizon ici. */}
        <Facade />

        <Cours />
        <Horizon rang={0} />

        <Planning />
        <Horizon rang={1} />

        <Tarifs />
        <Horizon rang={2} />

        <Calendrier />
        <Horizon rang={3} />

        {/* La FAQ après le calendrier et AVANT l'inscription : elle lève les
            dernières questions juste avant le formulaire, là où elles se
            posent. Placée après, elle serait lue par ceux qui sont déjà
            convaincus. */}
        <Faq />
        <Horizon rang={4} />

        <Inscription />
        <Horizon rang={5} />

        <Contact />
      </main>

      <Footer />
    </>
  )
}
