import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Facade from '../components/Facade.jsx'
import Cours from '../components/Cours.jsx'
import Planning from '../components/Planning.jsx'
import Tarifs from '../components/Tarifs.jsx'
import Calendrier from '../components/Calendrier.jsx'
import Faq from '../components/Faq.jsx'
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
      (accueil → cours → planning → tarifs → calendrier → faq → contact), ce dont dépendent la barre de navigation, le plan du
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
   Le raccord accueil → cours n'y figure pas — il est tenu par le bandeau de
   façade, qui sépare bien plus franchement qu'un filet.
   CINQ valeurs depuis le 24/08, une de moins : la section Inscription n'est
   plus rendue, et son raccord est parti avec elle.
   Retirer ou ajouter un raccord oblige à reprendre cette liste. */
const HORIZONS = ['70%', '18%', '62%', '34%', '78%']

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
        {/* La FAQ après le calendrier : elle lève les dernières questions
            avant qu'on ne parte s'inscrire. */}
        <Faq />
        <Horizon rang={4} />

        {/* ═══ SECTION « INSCRIPTION » DÉSACTIVÉE le 24/08 ═══
            `src/components/Inscription.jsx` est CONSERVÉ, intact, mais n'est
            plus monté. Son formulaire n'envoyait rien à personne, et il
            redemandait exactement ce que la campagne HelloAsso recueille
            désormais : identité, téléphone, niveau, formules et règlement.
            Deux parcours d'inscription valent moins qu'un seul qui aboutit.

            Tous les boutons « S'inscrire » mènent maintenant à la campagne —
            voir LienInscription.jsx et INSCRIPTION_EN_LIGNE.

            POUR LA REMETTRE : réimporter le composant, le monter ici, rendre
            à HORIZONS sa sixième valeur et remettre l'entrée `inscription`
            dans SECTIONS. Rien d'autre n'a été touché. */}

        <Contact />
      </main>

      <Footer />
    </>
  )
}
