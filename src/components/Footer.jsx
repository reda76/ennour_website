import {
  ORG,
  SECTIONS,
  PIED,
  PIED_LIBELLES,
  MENTION_HORAIRES,
  PIED_SECOURS,
  estAConfirmer,
  partieConnue,
} from '../data/contenu.js'
import LienInscription from './LienInscription.jsx'

/* Le pied de page. Il porte l'id « contact » : la dernière entrée de
   SECTIONS ne renvoie pas vers une section de plus, elle renvoie ici.
   C'est la fin de la page qui répond à la question « comment vous joindre ».

   La houle en haut sert de raccord — le seul endroit du site où l'on quitte
   la ligne d'horizon pour la mer elle-même. En dessous, tout est aligné et
   silencieux : un pied de page se lit, il ne se regarde pas. */

/* estAConfirmer et partieConnue viennent de contenu.js : le pied de page en
   avait sa propre version, avec une règle différente de celle du reste du
   site — une valeur pouvait donc s'afficher en clair ici et en attente
   ailleurs, sur la même page. */

/* `attente` absent = la ligne DISPARAÎT tant que la donnée manque, au lieu
   d'afficher une pastille. Décision du 24/08, appliquée à l'e-mail : la
   mosquée ne veut pas exposer à ses visiteurs ce qui lui manque encore.
   Le choix reste par ligne — l'adresse et le téléphone gardent leur
   pastille, parce que leur absence, elle, empêcherait de venir. */
function Coordonnee({ etiquette, valeur, href, attente }) {
  const manque = estAConfirmer(valeur)
  const connu = manque ? partieConnue(valeur) : valeur

  if (manque && !attente && !connu) return null

  return (
    <div className="lp-pied__coord">
      {/* Le micro-libellé en capitales est un rôle partagé (.lp-eyebrow),
          en variante sourde : le orange reste aux surtitres de section. */}
      <dt className="lp-eyebrow lp-eyebrow--sourd">{etiquette}</dt>
      <dd className="lp-pied__valeur">
        {!manque && href && (
          <a className="lp-lien" href={href}>
            {valeur}
          </a>
        )}
        {!manque && !href && <span>{valeur}</span>}
        {manque && connu && <span className="lp-pied__partiel">{connu}</span>}
        {/* Ce qui manque est annoncé — sauf si aucun libellé d'attente n'est
            fourni, auquel cas la ligne n'est pas rendue du tout. */}
        {manque && attente && <span className="lp-attente">{attente}</span>}
      </dd>
    </div>
  )
}

export default function Footer() {
  const annee = new Date().getFullYear()
  const telConfirme = !estAConfirmer(ORG.tel)
  const emailConfirme = !estAConfirmer(ORG.email)
  const mentions = PIED.mentionsLegales

  /* L'id « contact » est porté par la SECTION Contact, juste au-dessus : le
     pied de page ne peut pas le reprendre sans créer un doublon d'ancre.
     Il garde le sien, qui ne sert qu'à le désigner. */
  return (
    <footer id="pied-de-page" className="lp-pied">
      <div className="lp-arcade lp-arcade--haut lp-arcade--fondu" aria-hidden="true" />

      <div className="lp-wrap lp-pied__corps">
        {/* TOUT LE HAUT DU PIED a été retiré le 24/08, en deux temps :
            d'abord « La mosquée, en bref », qui répétait la section Contact
            juste au-dessus ; puis le bloc d'identité — nom, ville, année
            scolaire — pour la même raison. Rien ne s'y perdait : le nom est
            dans la barre, dans le premier écran et dans le colophon ; l'année
            scolaire est annoncée quatre fois ailleurs, dont le planning et le
            calendrier, où elle sert vraiment à situer.
            Le filet de séparation est parti avec : il ne séparait plus rien.
            Le pied commence donc directement par ses trois colonnes. */}

        <div className="lp-pied__grille">
          <section className="lp-pied__bloc">
            <h3 className="lp-h4">{PIED_LIBELLES.coordonnees}</h3>
            <dl className="lp-pied__liste-coord">
              <Coordonnee
                etiquette={PIED_LIBELLES.adresse}
                valeur={ORG.adresse}
                attente={PIED_LIBELLES.adresseAConfirmer}
              />
              <Coordonnee
                etiquette={PIED_LIBELLES.telephone}
                valeur={ORG.tel}
                href={telConfirme ? ORG.telHref : undefined}
                attente={PIED_LIBELLES.telAConfirmer}
              />
              <Coordonnee
                etiquette={PIED_LIBELLES.email}
                valeur={ORG.email}
                href={emailConfirme ? `mailto:${ORG.email}` : undefined}
                /* Pas de libellé d'attente : la ligne s'efface tant que
                   l'adresse manque, et revient d'elle-même avec elle. */
              />
            </dl>
            {/* Un vide n'est pas un cul-de-sac : on dit par où passer en attendant.
                Mais on ne dit QUE ce qui manque : depuis que l'affiche a donné
                le numéro, annoncer l'absence de ligne téléphonique juste sous
                un téléphone cliquable était un démenti à trois lignes d'écart. */}
            {/* Ne s'affiche plus QUE si le téléphone manque. Tant qu'un
                numéro fonctionne, il y a un moyen de joindre la mosquée et
                rien à excuser : la phrase, elle, annonçait à tout visiteur
                que l'e-mail faisait défaut — ce que la mosquée ne veut pas
                exposer (même décision que la ligne e-mail, le 24/08). */}
            {!telConfirme && (
              <p className="lp-small lp-pied__secours">
                {/* Le lien vers l'ancienne section « Inscription » a été
                    retiré avec elle. Quand le TÉLÉPHONE manque, la phrase
                    renvoie à la campagne d'inscription et le lien la suit ;
                    quand seul l'e-mail manque — le cas d'aujourd'hui — elle
                    renvoie au téléphone, qui est juste au-dessus : y poser
                    un second lien serait un doublon. */}
                {emailConfirme ? PIED_SECOURS.tel : PIED_SECOURS.lesDeux}
                {' '}
                <LienInscription className="lp-lien" />
              </p>
            )}
          </section>

          <nav className="lp-pied__bloc" aria-label={PIED_LIBELLES.planDuSite}>
            <h3 className="lp-h4">{PIED_LIBELLES.planDuSite}</h3>
            <ul className="lp-pied__plan">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a className="lp-pied__plan-lien" href={`#${s.id}`}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section className="lp-pied__bloc">
            <h3 className="lp-h4">{PIED_LIBELLES.horaires}</h3>
            <p className="lp-small lp-pied__mention">{MENTION_HORAIRES}</p>
          </section>
        </div>
      </div>

      <div className="lp-pied__colophon">
        <div className="lp-wrap lp-pied__colophon-corps">
          {/* Le statut juridique n'est affiché que s'il est établi : c'est la
              ligne la plus susceptible d'être reprise telle quelle par un
              tiers, et « Association loi 1901 » n'avait aucune source. */}
          <p className="lp-caption">
            <span className="lp-num">© {annee}</span> {ORG.nom}
            {PIED.statut ? ` — ${PIED.statut}` : ''}
          </p>
          {/* Tant que la page n'existe pas, le colophon ne dit RIEN à son
              sujet — ni lien mort, ni pastille d'attente. Annoncer au
              visiteur qu'il manque une page ne lui sert à rien ; c'est une
              information d'équipe, elle vit dans le README.
              Le lien réapparaît de lui-même dès que `PIED.mentionsLegales.url`
              est renseigné : ne pas écrire l'URL en dur ailleurs. */}
          {mentions?.url ? (
            <p className="lp-caption lp-pied__legal">
              <a className="lp-lien" href={mentions.url}>
                {mentions.libelle}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
