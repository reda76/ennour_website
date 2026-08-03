import { FAQ, ORG, NAV_CTA, estAConfirmer } from '../data/contenu.js'
import ScrollReveal from './ScrollReveal.jsx'

/* ============================================================
   MOSQUÉE EN-NOUR — Questions fréquentes (#faq).

   Dix-neuf questions fournies par la mosquée, rangées en trois
   familles. Sans ce rangement la liste faisait deux écrans d'un
   trait, et les questions d'argent y voisinaient avec celles sur
   le matériel à apporter.

   Un accordéon en <details>/<summary> natifs, et non un composant
   piloté par du state React. Trois raisons, dans cet ordre :
   — le clavier, le rôle et l'état plié/déplié sont donnés par le
     navigateur, sans un seul aria-* à maintenir ;
   — la recherche du navigateur (Ctrl+F) ouvre les blocs fermés
     toute seule sur les moteurs récents, ce qu'aucun accordéon
     maison ne fait — sur dix-neuf questions, ça compte ;
   — sans JavaScript, tout reste lisible.

   Aucun `name` partagé entre les <details> : un accordéon qui
   referme la réponse précédente empêche de comparer deux réponses.
   ============================================================ */

function Question({ item, rang }) {
  return (
    <li className="lp-faq__item">
      <details className="lp-faq__bloc">
        <summary className="lp-faq__q">
          {/* Le numéro n'est pas décoratif : il donne une prise pour dire
              « la question 12 » au téléphone. Il court sur toute la liste,
              d'un groupe à l'autre, et non de 1 à n dans chaque groupe. */}
          <span className="lp-num lp-faq__rang" aria-hidden="true">
            {String(rang).padStart(2, '0')}
          </span>
          <span className="lp-faq__intitule">{item.q}</span>
          {/* Purement visuel : l'état plié est déjà annoncé par <summary>. */}
          <svg
            className="lp-faq__chevron"
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M1 1.5 7 7.5l6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>
        <div className="lp-faq__r">
          <p className="lp-p">{item.r}</p>
        </div>
      </details>
    </li>
  )
}

/* Numérotation continue à travers les familles — « la question 12 » doit
   désigner la même chose d'un bout à l'autre de la liste. Calculée UNE fois,
   hors du rendu : un compteur incrémenté pendant le rendu est une mutation,
   et il repartirait de travers au moindre rendu partiel. */
const GROUPES = (() => {
  let n = 0
  return (FAQ?.groupes ?? []).map((groupe) => ({
    ...groupe,
    questions: (groupe.questions ?? []).map((q) => ({ ...q, rang: (n += 1) })),
  }))
})()

export default function Faq() {
  if (GROUPES.length === 0) return null

  const telConfirme = !estAConfirmer(ORG.tel)

  return (
    <section id="faq" className="lp-section lp-faq" aria-labelledby="faq-titre">
      <div className="lp-wrap lp-faq__wrap">
        <ScrollReveal as="header" className="lp-faq__entete">
          <p className="lp-eyebrow">{FAQ.surtitre}</p>
          <hr className="lp-filet" />
          <h2 id="faq-titre" className="lp-h2">{FAQ.titre}</h2>
          {FAQ.chapeau ? <p className="lp-lead">{FAQ.chapeau}</p> : null}
        </ScrollReveal>

        <div className="lp-faq__familles">
          {GROUPES.map((groupe, i) => (
            <ScrollReveal
              as="section"
              key={groupe.id}
              className="lp-faq__famille"
              delay={60 * i}
              aria-labelledby={`faq-${groupe.id}`}
            >
              <h3 id={`faq-${groupe.id}`} className="lp-h4 lp-faq__famille-titre">
                {groupe.titre}
              </h3>
              <ul className="lp-faq__liste">
                {groupe.questions.map((item) => (
                  <Question key={item.id} item={item} rang={item.rang} />
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {/* Une FAQ ne couvre jamais tout : on ferme sur une issue réelle. */}
        <ScrollReveal className="lp-faq__reste" delay={200}>
          <p className="lp-small">{FAQ.reste}</p>
          {telConfirme ? (
            <a className="lp-lien lp-faq__tel lp-num" href={ORG.telHref}>
              {ORG.tel}
            </a>
          ) : (
            <a className="lp-lien" href={`#${NAV_CTA.cible}`}>
              {NAV_CTA.libelle}
            </a>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
