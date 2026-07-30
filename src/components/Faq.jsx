import { FAQ, ORG, NAV_CTA, estAConfirmer } from '../data/contenu.js'
import ScrollReveal from './ScrollReveal.jsx'

/* ============================================================
   MOSQUÉE EN-NOUR — Questions fréquentes (#faq).

   Un accordéon en <details>/<summary> natifs, et non un composant
   piloté par du state React. Trois raisons, dans cet ordre :
   — le clavier, le rôle et l'état plié/déplié sont donnés par le
     navigateur, sans un seul aria-* à maintenir ;
   — la recherche du navigateur (Ctrl+F) ouvre les blocs fermés
     toute seule sur les moteurs récents, ce qu'aucun accordéon
     maison ne fait ;
   — sans JavaScript, tout reste lisible.

   Aucun `name` partagé entre les <details> : un accordéon qui
   referme la réponse précédente empêche de comparer deux tarifs.
   ============================================================ */

export default function Faq() {
  const questions = FAQ?.questions ?? []
  if (questions.length === 0) return null

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

        <ScrollReveal as="ul" className="lp-faq__liste" delay={80}>
          {questions.map((item, i) => (
            <li key={item.id} className="lp-faq__item">
              <details className="lp-faq__bloc">
                <summary className="lp-faq__q">
                  {/* Le numéro n'est pas décoratif : il donne une prise pour
                      dire « la troisième question » au téléphone. */}
                  <span className="lp-num lp-faq__rang" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="lp-faq__intitule">{item.q}</span>
                  {/* Le chevron est purement visuel : l'état plié/déplié est
                      déjà annoncé par <summary>. */}
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
          ))}
        </ScrollReveal>

        {/* Une FAQ ne couvre jamais tout : on ferme sur une issue réelle. */}
        <ScrollReveal className="lp-faq__reste" delay={140}>
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
