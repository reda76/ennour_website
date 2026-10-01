import { INSCRIPTION_EN_LIGNE } from '../data/contenu.js'

/**
 * Le lien « S'inscrire ».
 *
 * Il quitte le site depuis le 24/08 : l'inscription se fait sur la campagne
 * HelloAsso. Cinq endroits y mènent — la barre en version large et en
 * version repliée, la FAQ, une carte de formule et le bouton de la section
 * tarifs. Un composant plutôt que cinq copies, parce que trois détails
 * doivent y être identiques partout :
 *
 * — `target="_blank"`, parce qu'on envoie le visiteur sur un autre site et
 *   qu'il doit retrouver celui-ci en fermant l'onglet ;
 * — `rel="noreferrer"`, qui évite de transmettre la page d'origine ;
 * — la mention « nouvelle fenêtre », lue par les lecteurs d'écran et jamais
 *   affichée : un lien qui change de site sans le dire désoriente, et rien
 *   dans le texte visible ne l'annonce.
 *
 * Si l'adresse de campagne venait à manquer, le composant ne rend RIEN.
 * Un bouton d'inscription qui ne mène nulle part est pire que pas de
 * bouton du tout.
 */
export default function LienInscription({ className, children, suffixeCache }) {
  const { href, libelle, mentionNouvelOnglet, fermees, libelleFerme } = INSCRIPTION_EN_LIGNE

  /* Inscriptions CLOSES (01/10) : plus de lien du tout. Un <a> vers la
     campagne, même grisé, se cliquerait encore — et mènerait à un paiement
     pour des séances pleines. On rend un simple <span>, qui n'est ni
     focalisable ni activable, et `aria-disabled` dit aux lecteurs d'écran
     que la commande existe mais ne répond plus.
     Le libellé change aussi : « S'inscrire — Coran » devient « Inscriptions
     closes ». Un bouton grisé qui garderait son verbe d'action se lirait
     comme une panne, pas comme une décision. */
  if (fermees) {
    return (
      <span className={`${className ?? ''} is-ferme`} aria-disabled="true">
        {libelleFerme}
      </span>
    )
  }

  if (!href) return null

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children ?? libelle}
      {suffixeCache ? <span className="lp-visually-hidden"> — {suffixeCache}</span> : null}
      <span className="lp-visually-hidden"> ({mentionNouvelOnglet})</span>
    </a>
  )
}
