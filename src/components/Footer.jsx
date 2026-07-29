import Logo from './Logo.jsx'
import {
  ORG,
  SECTIONS,
  PIED,
  PIED_LIBELLES,
  MENTION_HORAIRES,
  NAV_CTA,
  PIED_SECOURS,
  estAConfirmer,
  partieConnue,
} from '../data/contenu.js'

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

function Coordonnee({ etiquette, valeur, href, attente }) {
  const manque = estAConfirmer(valeur)
  const connu = manque ? partieConnue(valeur) : valeur

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
        {/* Jamais de trou : ce qui manque est annoncé, pas masqué. */}
        {manque && <span className="lp-attente">{attente}</span>}
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
        <div className="lp-pied__haut">
          <div className="lp-pied__intro">
            {/* Surtitre repris de l'organisation, pas « Contact » : la
                section précédente porte déjà ce surtitre-là. */}
            <p className="lp-eyebrow">{ORG.nom}</p>
            <hr className="lp-filet" />
            <h2 className="lp-h2">{PIED.titre}</h2>
            <p className="lp-lead">{PIED.intro}</p>
          </div>

          <div className="lp-pied__identite">
            <Logo titre="" />
            <p className="lp-h3 lp-pied__nom">{ORG.nom}</p>
            <p className="lp-small">{ORG.baseline}</p>
            {/* Même traitement que dans les autres sections : libellé en
                .lp-caption, valeur en .lp-num. L'année n'est un « chiffre
                remarquable » qu'une seule fois sur la page, dans le hero. */}
            <p className="lp-caption lp-pied__annee">
              {PIED_LIBELLES.annee} <span className="lp-num">{ORG.anneeScolaire}</span>
            </p>
          </div>
        </div>

        <hr className="lp-rule lp-pied__separation" />

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
                attente={PIED_LIBELLES.emailAConfirmer}
              />
            </dl>
            {/* Un vide n'est pas un cul-de-sac : on dit par où passer en attendant.
                Mais on ne dit QUE ce qui manque : depuis que l'affiche a donné
                le numéro, annoncer l'absence de ligne téléphonique juste sous
                un téléphone cliquable était un démenti à trois lignes d'écart. */}
            {(!telConfirme || !emailConfirme) && (
              <p className="lp-small lp-pied__secours">
                {!telConfirme && !emailConfirme
                  ? PIED_SECOURS.lesDeux
                  : telConfirme
                    ? PIED_SECOURS.email
                    : PIED_SECOURS.tel}{' '}
                <a className="lp-lien" href={`#${NAV_CTA.cible}`}>
                  {NAV_CTA.libelle}
                </a>
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
          <p className="lp-caption lp-pied__legal">
            {mentions?.url ? (
              <a className="lp-lien" href={mentions.url}>
                {mentions.libelle}
              </a>
            ) : (
              /* La page n'existe pas encore : on ne pose pas un lien mort. */
              <span className="lp-attente">
                {mentions.libelle} — {PIED_LIBELLES.mentionsAPublier}
              </span>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
