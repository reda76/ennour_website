import {
  DEVISE,
  FORMULES,
  FORMULES_CUMULABLES,
  DEGRESSIF,
  totalFormules,
  totalFiable,
  totalPlein,
  seancesDeFormule,
  MOYENS_REGLEMENT,
  ORG,
  PLANNING_INTRO,
  PLACES_LIMITEES,
  SECTIONS,
  TARIFS_AFFICHE,
  TARIFS_MENTION,
  TARIFS_TEXTES,
} from '../data/contenu.js'
import ScrollReveal from './ScrollReveal.jsx'
import LienInscription from './LienInscription.jsx'

/* ============================================================
   MOSQUÉE EN-NOUR — Section « Formules & tarifs ».

   Refonte sur l'affiche 2026-2027 : trois formules, trois montants
   publics. La section n'est plus une liste d'offres à confirmer,
   c'est une GRILLE DE COMPARAISON — d'où les trois bandes de prix
   qui tombent exactement à la même hauteur (voir tarifs.css), et
   la bande « cumulables » qui traverse la grille pour dire qu'on
   n'y choisit pas forcément une seule colonne.
   ============================================================ */

/* Le surtitre est repris de la navigation : un seul libellé à maintenir,
   et la section ne peut pas se désynchroniser du menu. */
const LIBELLE = SECTIONS.find((s) => s.id === 'tarifs')?.label ?? 'Formules & tarifs'

/* Deux formateurs figés au chargement du module : instancier un
   Intl.NumberFormat à chaque rendu coûte cher, et le cas décimal est
   trop rare pour mériter un calcul d'options à la volée.
   La locale et la monnaie viennent de DEVISE : aucun « € » n'est écrit
   à la main dans ce fichier. */
const MONTANT_ENTIER = new Intl.NumberFormat(DEVISE.locale, {
  style: 'currency',
  currency: DEVISE.monnaie,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const MONTANT_DECIMAL = new Intl.NumberFormat(DEVISE.locale, {
  style: 'currency',
  currency: DEVISE.monnaie,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/**
 * Formate un montant, ou renvoie `null` si la donnée n'est pas exploitable
 * (prix à null, NaN…). Les trois tarifs sont ronds : ils sortent sans
 * décimales — « 300 € », jamais « 300,00 € ».
 */
function formaterPrix(prix) {
  if (typeof prix !== 'number' || !Number.isFinite(prix)) return null
  return Number.isInteger(prix) ? MONTANT_ENTIER.format(prix) : MONTANT_DECIMAL.format(prix)
}

/**
 * Le dégressif.
 *
 * Une seule règle d'affichage, et c'est une règle d'honnêteté : on ne
 * montre une combinaison QUE si elle est remisée.
 *
 * — Sans remise, le total n'apprend rien que les trois cartes ne disent
 *   déjà ; la mosquée a d'ailleurs demandé de retirer la ligne des deux
 *   formules pour cette raison.
 * — Avec une remise annoncée mais sans forfait connu, aucun montant n'est
 *   affiché : la somme brute n'est pas le prix, et l'écrire facturerait
 *   faux. C'est ce que garantit `totalFiable`.
 */
function Degressif() {
  const cles = FORMULES.map((f) => f.key)
  const forfaits = DEGRESSIF?.forfaits ?? {}

  /* Les nombres de formules pour lesquels une remise existe — déclarée par
     un forfait, ou annoncée par le seuil sans être encore chiffrée. */
  const rangs = new Set(Object.keys(forfaits).map(Number))
  const seuil = DEGRESSIF?.aPartirDe
  if (typeof seuil === 'number' && seuil <= cles.length) rangs.add(seuil)

  const lignes = [...rangs]
    .filter((n) => n >= 2 && n <= cles.length)
    .sort((a, b) => a - b)
    .map((n) => {
      const sous = cles.slice(0, n)
      const sur = totalFiable(n)
      const remise = sur ? totalFormules(sous) : null
      const plein = totalPlein(sous)
      return {
        n,
        libelle: DEGRESSIF.libelles?.[n] ?? null,
        // Le prix barré n'est montré que s'il diffère réellement.
        montant: sur ? formaterPrix(remise) : null,
        plein: sur && plein !== remise ? formaterPrix(plein) : null,
      }
    })
    .filter((l) => l.libelle)

  if (lignes.length === 0) return null

  return (
    <div className="lp-tarifs__degressif">
      <p className="lp-p">{DEGRESSIF.texte}</p>
      <dl className="lp-tarifs__combinaisons">
        {lignes.map((l) => (
          <div className="lp-tarifs__combi" key={l.n}>
            <dt>{l.libelle}</dt>
            <dd>
              {l.montant ? (
                <>
                  <span className="lp-num lp-tarifs__combi-total">{l.montant}</span>
                  {/* Le prix plein est barré ET annoncé par un mot : une
                      rature seule ne s'entend pas dans une synthèse vocale. */}
                  {l.plein ? (
                    <span className="lp-tarifs__combi-plein">
                      {' '}{DEGRESSIF.auLieuDe}{' '}
                      <s>{l.plein}</s>
                    </span>
                  ) : null}
                </>
              ) : (
                <span className="lp-attente">{DEGRESSIF.montantAConfirmer}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/**
 * La bande du prix. Le chemin d'attente est conservé — il ne se déclenche
 * plus aujourd'hui, les trois montants étant publics — pour qu'un `prix`
 * remis à null n'ouvre pas un trou dans la grille.
 */
function Prix({ prix, prixNote }) {
  const montant = formaterPrix(prix)

  if (montant === null) {
    /* Aucun repli codé en dur : la phrase d'attente appartient à la formule
       (FORMULES[].prixNote). Sans note, on n'invente pas de texte. */
    return prixNote ? (
      <p className="lp-tarifs__attente">
        <span className="lp-attente">{prixNote}</span>
      </p>
    ) : null
  }

  return (
    <>
      <p className="lp-tarifs__montant">
        <span className="lp-chiffre lp-num">{montant}</span>{' '}
        {/* La période fait partie du prix : « 300 € » seul se lirait comme
            un tarif mensuel. */}
        <span className="lp-tarifs__periode">{TARIFS_AFFICHE.parAn}</span>
      </p>
      {prixNote ? <p className="lp-caption">{prixNote}</p> : null}
    </>
  )
}

/**
 * Les jours d'une séance, énumérés en français.
 * `auChoix` change la liaison ET son poids : « Samedi OU Dimanche » sur
 * l'affiche veut dire un seul des deux jours. Rendu « et », il doublerait
 * l'offre annoncée — le mot est donc mis en évidence.
 */
function Jours({ jours, auChoix }) {
  if (!jours?.length) return null
  if (jours.length === 1) return jours[0]

  const premiers = jours.slice(0, -1).join(', ')
  const dernier = jours[jours.length - 1]
  const liaison = auChoix ? TARIFS_AFFICHE.ou : TARIFS_AFFICHE.et

  return (
    <>
      {premiers}{' '}
      {auChoix ? <em className="lp-tarifs__ou">{liaison}</em> : liaison} {dernier}
    </>
  )
}

/* Une séance de la formule : ce qu'on vient faire, quel jour, à quelle heure.
   Les horaires gardent la notation de la section « Planning » (20:00 – 21:30) :
   deux façons d'écrire l'heure sur une même page se liraient comme deux
   plannings différents. */
function Seance({ seance }) {
  /* La séance est une entrée de CRENEAUX : son intitulé s'y appelle
     `intitule`, et le groupe le complète — « Coran » seul ne distinguerait
     pas les trois créneaux de la formule 1. */
  const { intitule, groupe, detail, salutation, jours, debut, fin, auChoix } = seance
  const libelle = groupe ? `${intitule} — ${groupe.toLocaleLowerCase('fr')}` : intitule

  return (
    <li className="lp-tarifs__seance">
      <p className="lp-tarifs__seance-nom">{libelle}</p>

      {detail ? (
        <p className="lp-tarifs__seance-detail">
          {detail}
          {salutation ? (
            <>
              {' '}
              {/* Alegreya Sans ne possède pas la ligature ﷺ : isolée dans
                  .lp-arabe, elle est dessinée par Amiri. `lang="ar"` la fait
                  annoncer en arabe plutôt qu'épeler en français au milieu
                  d'une phrase — comme au planning, sur le même caractère. */}
              <span className="lp-arabe" lang="ar">{salutation}</span>
            </>
          ) : null}
        </p>
      ) : null}

      {/* Jour et horaire, ou l'attente des deux. Le Coran femmes n'a ni
          l'un ni l'autre depuis sa réouverture : `Jours` ne rend rien sur
          une liste vide, et la pastille prend la place de l'heure. */}
      <p className="lp-tarifs__quand">
        {debut && fin ? (
          <>
            <span className="lp-tarifs__jours">
              <Jours jours={jours} auChoix={auChoix} />
            </span>
            <span className="lp-tarifs__heure lp-num">
              <time dateTime={debut}>{debut}</time>
              <span aria-hidden="true"> – </span>
              <span className="lp-visually-hidden">à</span>
              <time dateTime={fin}>{fin}</time>
            </span>
          </>
        ) : (
          <span className="lp-attente">{PLANNING_INTRO.attenteJours}</span>
        )}
      </p>
    </li>
  )
}

/* La carte compte SEPT blocs, dans cet ordre exact : tête → résumé →
   programme → séances → supports → prix → lien. Le bloc « supports » a été
   ajouté le 24/08 : « dans la formule, là où il y a le prix, que le livre il
   apparaisse ». Il est posé JUSTE AVANT le prix et non après, pour ne pas
   défaire l'ordre ci-dessous — le montant reste le dernier mot. La grille les aligne d'une colonne à
   l'autre (subgrid, voir tarifs.css) ; en ajouter ou en retirer un oblige à
   reprendre `grid-template-rows` dans le partial, sinon les trois bandes de
   prix se désalignent.

   L'ORDRE vient de la référence citée par le client, l'institut Al-Furquan :
   le montant y arrive en DERNIER, après le contenu et les horaires. On lit
   d'abord ce que l'on reçoit, puis ce que l'on paie — et non l'inverse. Le
   résumé d'une phrase sous le nom vient de la même source. */
function CarteFormule({ formule, delai }) {
  const { numero, nom, sousTitre, resume, rythme, prix, prixNote, inclus, supports } = formule
  /* Lues dans le planning : une formule et son planning ne peuvent plus
     annoncer deux horaires différents. */
  const seances = seancesDeFormule(formule.key)
  const titreId = `tarifs-${formule.key}`
  const auChoix = seances?.some((s) => s.auChoix)

  return (
    <ScrollReveal
      as="article"
      className="lp-card lp-tarifs__carte"
      delay={delai}
      aria-labelledby={titreId}
    >
      <header className="lp-tarifs__tete">
        {typeof numero === 'number' ? (
          <p className="lp-eyebrow lp-eyebrow--sourd lp-tarifs__numero">
            {TARIFS_AFFICHE.formule} <span className="lp-num">{numero}</span>
          </p>
        ) : null}
        <h3 className="lp-h3 lp-tarifs__nom" id={titreId}>
          {nom}
        </h3>
        {sousTitre ? <p className="lp-tarifs__sous">{sousTitre}</p> : null}
        {rythme ? <p className="lp-caption lp-tarifs__rythme">{rythme}</p> : null}
      </header>

      {/* Une phrase, pas deux : elle dit à qui la formule s'adresse et ne
          répète ni le contenu (ci-dessous) ni les horaires (plus bas). */}
      <p className="lp-tarifs__resume">{resume}</p>

      <div className="lp-tarifs__bloc">
        {inclus?.length ? (
          <>
            <h4 className="lp-eyebrow lp-eyebrow--sourd">{TARIFS_AFFICHE.programme}</h4>
            <ul className="lp-tarifs__inclus">
              {inclus.map((ligne) => (
                <li key={ligne}>{ligne}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div className="lp-tarifs__bloc">
        {seances?.length ? (
          <>
            <h4 className="lp-eyebrow lp-eyebrow--sourd">{TARIFS_AFFICHE.seances}</h4>
            <ul className="lp-tarifs__seances">
              {seances.map((seance) => (
                <Seance key={seance.id} seance={seance} />
              ))}
            </ul>
            {auChoix ? (
              <p className="lp-small lp-tarifs__auchoix">{TARIFS_AFFICHE.auChoixNote}</p>
            ) : null}
          </>
        ) : null}
      </div>

      {/* Les supports du cours.

          Le CADRE porte un format 3/2 fixe, calé sur la largeur utile de la
          carte : les trois blocs ont donc exactement la même hauteur, et le
          HAUT des images s'aligne d'une colonne à l'autre — pas seulement
          leur bas. C'est ce qu'on ne pouvait pas obtenir en laissant chaque
          rangée se dimensionner seule : une image en 3/2 est plus haute que
          deux portraits qui se partagent la même largeur.

          La rangée est autorisée à MORDRE dans le rembourrage de la carte
          (marge négative) : à cette hauteur, deux couvertures dépassent la
          largeur utile d'une quarantaine de pixels. Elles restent à
          l'intérieur de la carte, le rembourrage est assez large. */}
      <div className="lp-tarifs__supports">
        {supports?.length > 0 && (
          <>
            <p className="lp-caption lp-tarifs__supports-titre">{TARIFS_TEXTES.supports}</p>
            <div className="lp-tarifs__supports-cadre">
              <ul className="lp-tarifs__supports-liste">
                {supports.map((image) => (
                  <li key={image.src}>
                    <img
                      className="lp-tarifs__support"
                      src={image.src}
                      srcSet={image.srcset}
                      sizes="(min-width: 900px) 340px, 80vw"
                      width={image.largeur}
                      height={image.hauteur}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Le prix ferme la carte, juste avant l'appel à l'action. */}
      <div className="lp-tarifs__prix">
        <Prix prix={prix} prixNote={prixNote} />
      </div>

      <p className="lp-tarifs__liens">
        <LienInscription className="lp-lien" suffixeCache={nom}>
          {TARIFS_TEXTES.sInscrire}
        </LienInscription>
      </p>
    </ScrollReveal>
  )
}

export default function Tarifs() {
  const formules = FORMULES ?? []
  const moyens = MOYENS_REGLEMENT ?? []

  return (
    <section id="tarifs" className="lp-section lp-tarifs" aria-labelledby="tarifs-titre">
      <div className="lp-wrap">
        {/* En-tête sur deux colonnes : le titre tient sa colonne, la mise au
            point sur les montants tient l'autre — elle est trop importante
            pour être reléguée sous le titre. */}
        <ScrollReveal className="lp-tarifs__entete">
          <div className="lp-tarifs__titre">
            <p className="lp-eyebrow">{LIBELLE}</p>
            <hr className="lp-filet" />
            <h2 className="lp-h2" id="tarifs-titre">
              {TARIFS_MENTION.titre}
            </h2>
          </div>
          <div className="lp-tarifs__intro">
            <p className="lp-lead">{TARIFS_MENTION.montants}</p>
            <p className="lp-caption lp-tarifs__annee">
              {TARIFS_TEXTES.annee} <span className="lp-num">{ORG.anneeScolaire}</span>
            </p>
          </div>
        </ScrollReveal>

        {formules.length ? (
          <div className="lp-tarifs__grille">
            {formules.map((formule, i) => (
              <CarteFormule key={formule.key} formule={formule} delai={i * 90} />
            ))}
          </div>
        ) : (
          <p className="lp-tarifs__attente">
            <span className="lp-attente">{TARIFS_TEXTES.formulesAConfirmer}</span>
          </p>
        )}

        {/* La bande qui traverse la grille : sans elle, trois colonnes
            côte à côte se lisent comme un choix exclusif. Le « plus » est
            dessiné avec deux .lp-filet croisés — le vocabulaire du site,
            pas un pictogramme importé. */}
        {FORMULES_CUMULABLES ? (
          <ScrollReveal className="lp-tarifs__cumul">
            <span className="lp-tarifs__plus" aria-hidden="true" />
            <div className="lp-tarifs__cumul-corps">
              <h3 className="lp-h3">{FORMULES_CUMULABLES.titre}</h3>
              <p className="lp-p">{FORMULES_CUMULABLES.texte}</p>
              <Degressif />
            </div>
          </ScrollReveal>
        ) : null}

        <hr className="lp-horizon lp-horizon--sourd lp-tarifs__coupure" />

        <ScrollReveal className="lp-tarifs__pied">
          <div className="lp-tarifs__reglement">
            <h3 className="lp-h4">{TARIFS_MENTION.reglementTitre}</h3>
            {moyens.length ? (
              <ul className="lp-tarifs__moyens">
                {moyens.map((moyen) => (
                  <li key={moyen.key}>
                    <p className="lp-tarifs__moyen">{moyen.libelle}</p>
                    {moyen.detail ? <p className="lp-small">{moyen.detail}</p> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="lp-tarifs__attente">
                <span className="lp-attente">{TARIFS_TEXTES.reglementAConfirmer}</span>
              </p>
            )}
          </div>

          {/* La colonne d'action : l'unique bouton primaire de la section,
              et la seule mention de places — posée là parce que c'est au
              moment d'agir qu'elle informe, pas quand elle alarme. */}
          <div className="lp-card lp-tarifs__action">
            <LienInscription className="lp-btn lp-btn--primaire lp-tarifs__cta">
              {TARIFS_TEXTES.ctaInscription}
            </LienInscription>
            {PLACES_LIMITEES ? (
              <p className="lp-small lp-tarifs__places">{PLACES_LIMITEES}</p>
            ) : null}
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
