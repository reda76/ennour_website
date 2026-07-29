import { useId } from 'react'
import Logo from './Logo.jsx'
import ScrollReveal from './ScrollReveal.jsx'
import {
  CONTACT_LIBELLES,
  INTRO_CONTACT,
  MENTION_CARTE,
  MENTION_SECRETARIAT,
  ORG,
  estAConfirmer,
} from '../data/contenu.js'

/* L'adresse mélange une partie inconnue et une partie connue
   (« __ADRESSE_A_CONFIRMER__, 76600 Le Havre ») : on n'affiche jamais le
   marqueur brut, mais on ne jette pas non plus ce qui est déjà su. */
function decouperAdresse(adresse) {
  const morceaux = String(adresse ?? '')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean)
  return {
    connue: morceaux.filter((m) => !estAConfirmer(m)).join(', '),
    incomplete: morceaux.some(estAConfirmer) || morceaux.length === 0,
  }
}

export default function Contact() {
  const uid = useId()
  const adresse = decouperAdresse(ORG.adresse)
  const telConnu = !estAConfirmer(ORG.tel)
  const emailConnu = !estAConfirmer(ORG.email)

  return (
    <section id="contact" className="lp-section lp-contact" aria-labelledby={`${uid}-titre`}>
      <div className="lp-wrap">
        <ScrollReveal as="header" className="lp-contact__entete">
          <p className="lp-eyebrow">{INTRO_CONTACT.surtitre}</p>
          <hr className="lp-filet" />
          <h2 className="lp-h2" id={`${uid}-titre`}>{INTRO_CONTACT.titre}</h2>
          <p className="lp-lead">{INTRO_CONTACT.chapo}</p>
        </ScrollReveal>

        <div className="lp-contact__corps">
          <ScrollReveal as="dl" className="lp-contact__coord">
            <div className="lp-contact__ligne">
              <dt className="lp-caption">{CONTACT_LIBELLES.adresse}</dt>
              <dd className="lp-contact__valeur">
                {adresse.incomplete ? (
                  <>
                    {/* TODO — remplacer par l'adresse postale exacte dans ORG.adresse. */}
                    <span className="lp-attente">{CONTACT_LIBELLES.adresseAConfirmer}</span>
                    {adresse.connue && <span className="lp-contact__complement">{adresse.connue}</span>}
                  </>
                ) : (
                  <address className="lp-contact__adresse">{adresse.connue}</address>
                )}
              </dd>
            </div>

            <div className="lp-contact__ligne">
              <dt className="lp-caption">{CONTACT_LIBELLES.telephone}</dt>
              <dd className="lp-contact__valeur">
                {telConnu ? (
                  <a className="lp-lien lp-num" href={ORG.telHref}>{ORG.tel}</a>
                ) : (
                  /* Le numéro et son href viennent de l'affiche 2026-2027 et
                     concordent : le lien ci-dessus est le chemin normal. Ce
                     repli ne joue que si ORG.tel redevient un marqueur
                     d'attente — auquel cas ORG.telHref doit repartir avec lui,
                     on n'expose jamais un lien tel: factice. */
                  <span className="lp-attente">{CONTACT_LIBELLES.telAConfirmer}</span>
                )}
              </dd>
            </div>

            <div className="lp-contact__ligne">
              <dt className="lp-caption">{CONTACT_LIBELLES.email}</dt>
              <dd className="lp-contact__valeur">
                {emailConnu ? (
                  <a className="lp-lien" href={`mailto:${ORG.email}`}>{ORG.email}</a>
                ) : (
                  /* TODO — activer le mailto: dès que ORG.email est renseigné. */
                  <span className="lp-attente">{CONTACT_LIBELLES.emailAConfirmer}</span>
                )}
              </dd>
            </div>

            <div className="lp-contact__ligne">
              <dt className="lp-caption">{CONTACT_LIBELLES.secretariat}</dt>
              <dd className="lp-contact__valeur">
                {/* Les horaires d'ouverture n'ont pas été communiqués :
                    on les annonce comme attendus plutôt que de les inventer. */}
                <span className="lp-attente">{MENTION_SECRETARIAT}</span>
              </dd>
            </div>
          </ScrollReveal>

          <ScrollReveal as="figure" className="lp-card lp-contact__plan" delay={120}>
            <div className="lp-contact__releve" aria-hidden="true" />
            <div className="lp-contact__amer">
              {/* Décoratif : le nom du centre est déjà écrit ailleurs sur la page. */}
              <Logo titre="" className="lp-contact__logo" />
              <p className="lp-h4 lp-contact__ville">{ORG.ville}</p>
            </div>
            <figcaption className="lp-contact__legende">
              <span className="lp-caption">{CONTACT_LIBELLES.planTitre}</span>
              <span className="lp-small">{MENTION_CARTE}</span>
            </figcaption>
          </ScrollReveal>
        </div>
      </div>

      {/* Pas de houle ici : le pied de page en pose déjà une, calée en haut,
          qui fait le raccord. Deux trames superposées au même joint (largeurs
          et opacités différentes) se lisaient comme une salissure. */}
    </section>
  )
}
