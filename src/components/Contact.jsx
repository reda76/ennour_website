import { useId } from 'react'
import ScrollReveal from './ScrollReveal.jsx'
import {
  CONTACT_LIBELLES,
  PLAN_ACCES,
  INTRO_CONTACT,
  MENTION_CARTE,
  ORG,
  estAConfirmer,
} from '../data/contenu.js'

/* L'adresse est aujourd'hui complète, mais la découpe reste : elle sépare
   une partie inconnue d'une partie connue (« __ADRESSE_A_CONFIRMER__, 76620
   Le Havre ») sans jamais afficher le marqueur brut.
   LEÇON, apprise à nos dépens : la « partie connue » d'une donnée en attente
   peut être fausse. Le site a affiché 76600 pendant des semaines — le vrai
   code postal est 76620, et personne ne l'avait jamais communiqué. Ne rien
   pré-remplir ici sans source. */
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

            {/* La ligne E-MAIL n'apparaît que si l'adresse existe. Décision
                du 24/08 : la mosquée ne veut pas exposer ce qui lui manque à
                ses visiteurs. Une pastille « à confirmer » est un signal
                d'équipe, et l'équipe a déjà le README pour ça.
                La ligne revient d'elle-même dès que ORG.email est renseigné —
                avec son mailto:, sans rien retoucher ici. */}
            {emailConnu && (
              <div className="lp-contact__ligne">
                <dt className="lp-caption">{CONTACT_LIBELLES.email}</dt>
                <dd className="lp-contact__valeur">
                  <a className="lp-lien" href={`mailto:${ORG.email}`}>{ORG.email}</a>
                </dd>
              </div>
            )}

            {/* La ligne « Secrétariat » a été retirée le 21/08 : la mosquée
                n'a pas d'horaires fixes. Rien à afficher, donc rien à
                promettre — pas même une pastille d'attente. */}
          </ScrollReveal>

          <ScrollReveal as="figure" className="lp-card lp-contact__plan" delay={120}>
            {/* Le relevé décoratif et le logo qui meublaient l'emplacement
                réservé ont disparu le 24/08 : il y a un vrai plan à montrer.
                L'image entière est cliquable — sur un plan, c'est l'endroit
                que le doigt vise en premier. Le lien de la légende reste,
                pour qui navigue au clavier ou lit les liens un par un. */}
            <a
              className="lp-contact__vignette"
              href={ORG.planHref}
              target="_blank"
              rel="noreferrer"
              /* Le nom accessible est porté par le lien de la légende, juste
                 en dessous, qui mène au même endroit : deux liens voisins
                 annonçant la même chose alourdissent la navigation. */
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                className="lp-contact__plan-image"
                src={PLAN_ACCES.src}
                srcSet={PLAN_ACCES.srcset}
                sizes="(min-width: 900px) 460px, 90vw"
                width={PLAN_ACCES.largeur}
                height={PLAN_ACCES.hauteur}
                alt={PLAN_ACCES.alt}
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption className="lp-contact__legende">
              <span className="lp-caption">{CONTACT_LIBELLES.planTitre}</span>
              <span className="lp-small">{MENTION_CARTE}</span>
              {/* Une IMAGE fixe et un LIEN, jamais un cadre embarqué : rien
                  n'est chargé chez Google tant que personne ne clique, la page
                  ne dépend d'aucun service extérieur pour s'afficher, et
                  aucun cookie tiers n'est déposé — donc aucune bannière de
                  consentement à ajouter. */}
              {ORG.planHref && !estAConfirmer(ORG.adresse) ? (
                <a
                  className="lp-lien lp-contact__itineraire"
                  href={ORG.planHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONTACT_LIBELLES.itineraire}
                </a>
              ) : null}
              <span className="lp-caption lp-contact__credit">{PLAN_ACCES.credit}</span>
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
