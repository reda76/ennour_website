import { useEffect, useId, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal.jsx'
import {
  ACTEURS_ETAPES,
  CONTACT_LIBELLES,
  DEVISE,
  ETAPES_INSCRIPTION,
  FORMULES,
  INSCRIPTION_FORMULES,
  INSCRIPTION_TEXTES,
  INTRO_INSCRIPTION,
  MENTION_CHAMPS_REQUIS,
  MENTION_CONSENTEMENT,
  MENTION_DEMANDE_PRETE,
  MENTION_ENVOI_INDISPONIBLE,
  MOYENS_REGLEMENT,
  NIVEAUX,
  ORG,
  SECTIONS,
  TARIFS_AFFICHE,
  estAConfirmer,
} from '../data/contenu.js'

/* État initial du formulaire. Hors composant : il ne change jamais.

   `formules` est un TABLEAU depuis que l'affiche annonce les formules
   cumulables : un choix unique aurait obligé qui veut le Coran ET les
   sciences musulmanes à mentir dans le formulaire, ou à l'écrire en
   commentaire — c'est-à-dire à donner à l'équipe une donnée qu'elle ne
   peut pas traiter.

   Le champ « Public » a disparu : PUBLICS ne porte plus qu'« Adultes ».
   Un choix à une seule option ne demande rien ; il fait seulement croire
   qu'une autre réponse existe. */
const VIDE = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  formules: [],
  niveau: '',
  message: '',
  consentement: false,
}

/* Ordre de parcours pour porter le focus sur la PREMIÈRE erreur telle que
   l'œil la rencontre, pas telle que l'objet d'erreurs est construit. */
const ORDRE_CHAMPS = ['prenom', 'nom', 'email', 'telephone', 'formules', 'niveau', 'consentement']

/* Un seul formateur pour toute la section : la monnaie passe par Intl,
   jamais par un « € » écrit à la main, et les tarifs sont ronds. */
const EUROS = new Intl.NumberFormat(DEVISE.locale, {
  style: 'currency',
  currency: DEVISE.monnaie,
  maximumFractionDigits: 0,
})

/* Volontairement permissif : un e-mail se vérifie à l'envoi, pas au clavier.
   On n'écarte ici que les saisies manifestement incomplètes. */
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

function valider(d) {
  const e = {}
  if (!d.prenom.trim()) e.prenom = 'Indiquez votre prénom.'
  if (!d.nom.trim()) e.nom = 'Indiquez votre nom.'

  if (!d.email.trim()) e.email = 'Indiquez une adresse e-mail.'
  else if (!RE_EMAIL.test(d.email.trim())) e.email = 'Cette adresse semble incomplète — exemple : prenom@exemple.fr'

  const chiffres = d.telephone.replace(/\D/g, '')
  if (!chiffres) e.telephone = 'Indiquez un numéro : c’est par là que l’équipe vous recontacte.'
  else if (chiffres.length < 9 || chiffres.length > 15) e.telephone = 'Ce numéro ne comporte pas le bon nombre de chiffres.'

  /* Les listes viennent du contenu : si elles sont vides, on n'exige pas
     un choix impossible à faire. */
  if (FORMULES.length && d.formules.length === 0) e.formules = INSCRIPTION_FORMULES.erreur

  /* « Niveau estimé » n'est plus exigé. L'affiche ne publie aucune échelle
     de niveaux, aucun groupe de niveau, aucun entretien de placement : un
     débutant complet devait pourtant se classer sur une échelle qui
     n'existe pas dans l'offre, faute de quoi sa demande était bloquée.
     Le champ reste — il renseigne utilement le secrétariat — mais il
     n'arrête plus personne. */

  if (!d.consentement) e.consentement = 'Votre accord est nécessaire pour que nous puissions traiter la demande.'

  return e
}

export default function Inscription() {
  const uid = useId()
  const champsRef = useRef({})
  const succesRef = useRef(null)

  const [donnees, setDonnees] = useState(VIDE)
  const [erreurs, setErreurs] = useState({})
  const [resume, setResume] = useState('')
  const [prete, setPrete] = useState(false)
  const [copie, setCopie] = useState('')

  /* Le récapitulatif remplace le formulaire : on y porte le focus, sinon
     un lecteur d'écran reste sur un bouton qui n'existe plus. */
  useEffect(() => {
    if (prete) succesRef.current?.focus()
  }, [prete])

  const id = (champ) => `${uid}-${champ}`
  const idErreur = (champ) => `${uid}-${champ}-erreur`
  const idAide = (champ) => `${uid}-${champ}-aide`

  function modifier(champ, valeur) {
    setDonnees((d) => ({ ...d, [champ]: valeur }))
    setResume('')
    /* On efface l'erreur dès que la personne corrige : le message ne doit
       pas survivre à la faute qu'il signale. */
    setErreurs((e) => {
      if (!e[champ]) return e
      const suivant = { ...e }
      delete suivant[champ]
      return suivant
    })
  }

  /* Les formules sont cochées, donc cumulées. L'ordre de FORMULES est
     conservé plutôt que l'ordre des clics : le récapitulatif doit se lire
     dans le même ordre que l'affiche et que la section « Formules ». */
  function basculerFormule(cle, coche) {
    modifier(
      'formules',
      coche
        ? FORMULES.filter((f) => f.key === cle || donnees.formules.includes(f.key)).map((f) => f.key)
        : donnees.formules.filter((k) => k !== cle),
    )
  }

  function soumettre(evt) {
    evt.preventDefault()
    const trouvees = valider(donnees)
    setErreurs(trouvees)

    const enDefaut = ORDRE_CHAMPS.filter((c) => trouvees[c])
    if (enDefaut.length) {
      setResume(
        enDefaut.length === 1
          ? 'Un champ est à corriger avant de continuer.'
          : `${enDefaut.length} champs sont à corriger avant de continuer.`,
      )
      champsRef.current[enDefaut[0]]?.focus()
      return
    }

    setResume('')
    setCopie('')
    setPrete(true)

    // TODO — BRANCHEMENT DE L'ENVOI. C'est ici, et nulle part ailleurs, que
    // se pose l'appel réel une fois le back-end en place :
    //   await fetch('/api/inscription', { method: 'POST', headers: {...},
    //     body: JSON.stringify(donnees) })
    // puis, si et seulement si la mosquée ouvre une campagne HelloAsso et
    // en fournit l'URL, la redirection correspondante — et c'est alors
    // seulement que l'entrée « HelloAsso » revient dans MOYENS_REGLEMENT.
    // Tant que ce point de terminaison n'existe
    // pas, on n'appelle RIEN et on n'affiche jamais « demande envoyée » :
    // le récapitulatif ci-dessous est le seul état honnête possible.
  }

  /* Le libellé porté au récapitulatif dit AUSSI le prix : c'est ce que la
     personne transmettra au secrétariat, et un nom de formule seul obligerait
     les deux parties à retourner à l'affiche pour savoir de quoi on parle.
     Aucun total n'est calculé : l'affiche annonce les formules cumulables
     mais ne dit rien d'un tarif de plusieurs formules — l'addition serait
     une hypothèse, et c'est à la mosquée de la faire. */
  function libelleFormule(f) {
    const prix = f.prix == null ? f.prixNote : `${EUROS.format(f.prix)} ${TARIFS_AFFICHE.parAn}`
    return prix ? `${f.nom} (${prix})` : f.nom
  }

  const formulesChoisies = FORMULES.filter((f) => donnees.formules.includes(f.key))

  const recapitulatif = [
    ['Prénom', donnees.prenom.trim()],
    ['Nom', donnees.nom.trim()],
    ['E-mail', donnees.email.trim()],
    ['Téléphone', donnees.telephone.trim()],
    [INSCRIPTION_FORMULES.recap, formulesChoisies.map(libelleFormule).join(' + ')],
    ['Niveau estimé', donnees.niveau],
    ['Message', donnees.message.trim()],
  ].filter(([, valeur]) => valeur)

  function copier() {
    const texte = [`Demande d’inscription — ${ORG.nom}, ${ORG.anneeScolaire}`, '']
      .concat(recapitulatif.map(([libelle, valeur]) => `${libelle} : ${valeur}`))
      .join('\n')

    if (!navigator.clipboard?.writeText) {
      setCopie('indisponible')
      return
    }
    navigator.clipboard.writeText(texte).then(
      () => setCopie('ok'),
      () => setCopie('indisponible'),
    )
  }

  /* L'acteur de la première étape, c'est le candidat : il sert de référence
     pour repérer l'étape qui, elle, ne lui appartient pas. */
  const acteurCandidat = ACTEURS_ETAPES[ETAPES_INSCRIPTION[0]?.n]

  const lienTarifs = SECTIONS.find((s) => s.id === 'tarifs')
  const tarifsEnAttente = FORMULES.length > 0 && FORMULES.every((f) => f.prix == null)
  const telConnu = !estAConfirmer(ORG.tel)
  const emailConnu = !estAConfirmer(ORG.email)

  /* Un champ ne pointe vers son message d'erreur que si l'erreur existe :
     un aria-describedby vers un élément absent ne dit rien à personne. */
  const decrit = (champ, avecAide) =>
    [avecAide ? idAide(champ) : null, erreurs[champ] ? idErreur(champ) : null]
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <>
      <section id="inscription" className="lp-section lp-inscription" aria-labelledby={`${uid}-titre`}>
        <div className="lp-wrap">
          <ScrollReveal as="header" className="lp-inscription__entete">
            <p className="lp-eyebrow">
              {INTRO_INSCRIPTION.surtitre} <span className="lp-num">{ORG.anneeScolaire}</span>
            </p>
            <hr className="lp-filet" />
            <h2 className="lp-h2" id={`${uid}-titre`}>{INTRO_INSCRIPTION.titre}</h2>
            <p className="lp-lead">{INTRO_INSCRIPTION.chapo}</p>
          </ScrollReveal>

          {ETAPES_INSCRIPTION.length > 0 && (
            <ol className="lp-inscription__parcours">
              {ETAPES_INSCRIPTION.map((etape, i) => {
                const acteur = ACTEURS_ETAPES[etape.n]
                /* L'étape où la main passe à l'équipe est celle où votre
                   demande attend : son filet passe en pointillé orange. */
                const attente = Boolean(acteur) && acteur !== acteurCandidat
                return (
                  <ScrollReveal
                    as="li"
                    key={etape.n}
                    delay={i * 90}
                    className={`lp-inscription__etape${attente ? ' lp-inscription__etape--attente' : ''}`}
                  >
                    <p className="lp-inscription__etape-tete">
                      <span className="lp-chiffre lp-inscription__num">{etape.n}</span>
                      {acteur && (
                        <span className="lp-eyebrow lp-eyebrow--sourd lp-inscription__acteur">
                          {acteur}
                        </span>
                      )}
                    </p>
                    <h3 className="lp-h4">{etape.titre}</h3>
                    <p className="lp-p lp-inscription__etape-texte">{etape.texte}</p>
                  </ScrollReveal>
                )
              })}
            </ol>
          )}

          <div className="lp-inscription__corps">
            <div className="lp-card lp-inscription__panneau">
              {prete ? (
                <div className="lp-inscription__succes">
                  <h3 className="lp-h3" ref={succesRef} tabIndex={-1}>Votre demande est prête</h3>
                  <p className="lp-p">{MENTION_DEMANDE_PRETE}</p>

                  <dl className="lp-inscription__recap">
                    {recapitulatif.map(([libelle, valeur]) => (
                      <div className="lp-inscription__recap-ligne" key={libelle}>
                        <dt>{libelle}</dt>
                        <dd>{valeur}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="lp-inscription__actions">
                    <button type="button" className="lp-btn lp-btn--primaire" onClick={copier}>
                      Copier le récapitulatif
                    </button>
                    <button
                      type="button"
                      className="lp-btn lp-btn--secondaire"
                      onClick={() => { setPrete(false); setCopie('') }}
                    >
                      Modifier ma demande
                    </button>
                  </div>

                  <p className="lp-small" role="status">
                    {copie === 'ok' && 'Récapitulatif copié : collez-le dans votre message au secrétariat.'}
                    {copie === 'indisponible' &&
                      'La copie automatique est bloquée par votre navigateur — sélectionnez le récapitulatif ci-dessus pour le copier.'}
                  </p>
                </div>
              ) : (
                <form className="lp-inscription__form" onSubmit={soumettre} noValidate>
                  <div className="lp-inscription__form-tete">
                    <h3 className="lp-h3">Formulaire d’inscription</h3>
                    <p className="lp-small">{MENTION_CHAMPS_REQUIS}</p>
                  </div>

                  {resume && (
                    <p className="lp-inscription__resume" role="alert">{resume}</p>
                  )}

                  <div className="lp-inscription__rang">
                    <div className="lp-inscription__champ">
                      <label className="lp-inscription__label" htmlFor={id('prenom')}>Prénom</label>
                      <input
                        id={id('prenom')}
                        className="lp-inscription__input"
                        type="text"
                        name="prenom"
                        autoComplete="given-name"
                        required
                        value={donnees.prenom}
                        onChange={(e) => modifier('prenom', e.target.value)}
                        aria-invalid={erreurs.prenom ? true : undefined}
                        aria-describedby={decrit('prenom', false)}
                        ref={(el) => { champsRef.current.prenom = el }}
                      />
                      {erreurs.prenom && <p className="lp-inscription__erreur" id={idErreur('prenom')}>{erreurs.prenom}</p>}
                    </div>

                    <div className="lp-inscription__champ">
                      <label className="lp-inscription__label" htmlFor={id('nom')}>Nom</label>
                      <input
                        id={id('nom')}
                        className="lp-inscription__input"
                        type="text"
                        name="nom"
                        autoComplete="family-name"
                        required
                        value={donnees.nom}
                        onChange={(e) => modifier('nom', e.target.value)}
                        aria-invalid={erreurs.nom ? true : undefined}
                        aria-describedby={decrit('nom', false)}
                        ref={(el) => { champsRef.current.nom = el }}
                      />
                      {erreurs.nom && <p className="lp-inscription__erreur" id={idErreur('nom')}>{erreurs.nom}</p>}
                    </div>
                  </div>

                  <div className="lp-inscription__rang">
                    <div className="lp-inscription__champ">
                      <label className="lp-inscription__label" htmlFor={id('email')}>Adresse e-mail</label>
                      <input
                        id={id('email')}
                        className="lp-inscription__input"
                        type="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        value={donnees.email}
                        onChange={(e) => modifier('email', e.target.value)}
                        aria-invalid={erreurs.email ? true : undefined}
                        aria-describedby={decrit('email', false)}
                        ref={(el) => { champsRef.current.email = el }}
                      />
                      {erreurs.email && <p className="lp-inscription__erreur" id={idErreur('email')}>{erreurs.email}</p>}
                    </div>

                    <div className="lp-inscription__champ">
                      <label className="lp-inscription__label" htmlFor={id('telephone')}>Téléphone</label>
                      <input
                        id={id('telephone')}
                        className="lp-inscription__input lp-num"
                        type="tel"
                        name="telephone"
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        value={donnees.telephone}
                        onChange={(e) => modifier('telephone', e.target.value)}
                        aria-invalid={erreurs.telephone ? true : undefined}
                        aria-describedby={decrit('telephone', true)}
                        ref={(el) => { champsRef.current.telephone = el }}
                      />
                      <p className="lp-small" id={idAide('telephone')}>C’est le moyen le plus rapide d’être recontacté.</p>
                      {erreurs.telephone && <p className="lp-inscription__erreur" id={idErreur('telephone')}>{erreurs.telephone}</p>}
                    </div>
                  </div>

                  {/* Cases à cocher et non liste déroulante : les formules sont
                      cumulables. Le contrôle doit dire ce que la règle permet,
                      sans quoi le formulaire contredit la section « Tarifs »
                      deux écrans plus haut. Trois options tiennent à l'écran :
                      les montrer toutes vaut mieux que les cacher dans un menu. */}
                  {FORMULES.length > 0 ? (
                    <fieldset
                      className="lp-inscription__champ lp-inscription__fieldset"
                      /* role explicite, et PAS d'aria-invalid : un <fieldset>
                         est exposé en role="group", qui ne prend pas en charge
                         cet attribut — contrairement au radiogroup du groupe
                         « Niveau » juste en dessous. L'erreur est portée par
                         aria-describedby, qui la fait lire, et par un
                         data-invalid que le CSS accroche pour donner au groupe
                         la même arête orange qu'à un champ de saisie. */
                      role="group"
                      data-invalid={erreurs.formules ? 'oui' : undefined}
                      aria-describedby={decrit('formules', true)}
                    >
                      <legend className="lp-inscription__label">{INSCRIPTION_FORMULES.legende}</legend>
                      <p className="lp-small" id={idAide('formules')}>{INSCRIPTION_FORMULES.aide}</p>
                      <div className="lp-inscription__formules">
                        {FORMULES.map((f, i) => (
                          <label className="lp-inscription__formule" key={f.key}>
                            <input
                              type="checkbox"
                              name="formules"
                              value={f.key}
                              checked={donnees.formules.includes(f.key)}
                              onChange={(e) => basculerFormule(f.key, e.target.checked)}
                              /* Le focus de validation se porte sur la première
                                 case : c'est le début du groupe, pas une case
                                 en particulier. */
                              ref={i === 0 ? (el) => { champsRef.current.formules = el } : undefined}
                            />
                            <span className="lp-inscription__formule-corps">
                              <span className="lp-inscription__formule-nom">{f.nom}</span>
                              <span className="lp-small lp-inscription__formule-rythme">{f.rythme}</span>
                            </span>
                            <span className="lp-inscription__formule-prix">
                              {f.prix == null ? (
                                <span className="lp-attente">{f.prixNote ?? INSCRIPTION_FORMULES.prixAConfirmer}</span>
                              ) : (
                                <>
                                  <span className="lp-num">{EUROS.format(f.prix)}</span>{' '}
                                  <span className="lp-small">{TARIFS_AFFICHE.parAn}</span>
                                </>
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                      {erreurs.formules && (
                        <p className="lp-inscription__erreur" id={idErreur('formules')}>{erreurs.formules}</p>
                      )}
                    </fieldset>
                  ) : (
                    <div className="lp-inscription__champ">
                      <span className="lp-inscription__label">{INSCRIPTION_FORMULES.legende}</span>
                      <span className="lp-attente">{INSCRIPTION_FORMULES.aConfirmer}</span>
                    </div>
                  )}

                  {NIVEAUX.length > 0 && (
                    <fieldset
                      className="lp-inscription__champ lp-inscription__fieldset"
                      role="radiogroup"
                      aria-invalid={erreurs.niveau ? true : undefined}
                      data-invalid={erreurs.niveau ? 'oui' : undefined}
                      aria-describedby={decrit('niveau', true)}
                    >
                      <legend className="lp-inscription__label">
                        {INSCRIPTION_TEXTES.niveauLegende}{' '}
                        <span className="lp-inscription__facultatif">
                          {INSCRIPTION_TEXTES.facultatif}
                        </span>
                      </legend>
                      <p className="lp-small" id={idAide('niveau')}>
                        {INSCRIPTION_TEXTES.niveauAide}
                      </p>
                      <div className="lp-inscription__niveaux">
                        {NIVEAUX.map((niveau, i) => (
                          <label className="lp-inscription__niveau" key={niveau}>
                            <input
                              type="radio"
                              name={`${uid}-niveau`}
                              value={niveau}
                              checked={donnees.niveau === niveau}
                              onChange={(e) => modifier('niveau', e.target.value)}
                              ref={i === 0 ? (el) => { champsRef.current.niveau = el } : undefined}
                            />
                            <span>{niveau}</span>
                          </label>
                        ))}
                      </div>
                      {erreurs.niveau && <p className="lp-inscription__erreur" id={idErreur('niveau')}>{erreurs.niveau}</p>}
                    </fieldset>
                  )}

                  <div className="lp-inscription__champ">
                    <label className="lp-inscription__label" htmlFor={id('message')}>
                      Message{' '}
                      <span className="lp-inscription__facultatif">
                        {INSCRIPTION_TEXTES.facultatif}
                      </span>
                    </label>
                    <textarea
                      id={id('message')}
                      className="lp-inscription__textarea"
                      name="message"
                      rows={4}
                      value={donnees.message}
                      onChange={(e) => modifier('message', e.target.value)}
                      aria-describedby={idAide('message')}
                    />
                    <p className="lp-small" id={idAide('message')}>
                      Contrainte d’horaire, expérience déjà acquise, question à poser…
                    </p>
                  </div>

                  <div className="lp-inscription__champ">
                    <div className="lp-inscription__consentement">
                      <input
                        id={id('consentement')}
                        type="checkbox"
                        name="consentement"
                        required
                        checked={donnees.consentement}
                        onChange={(e) => modifier('consentement', e.target.checked)}
                        aria-invalid={erreurs.consentement ? true : undefined}
                        aria-describedby={decrit('consentement', false)}
                        ref={(el) => { champsRef.current.consentement = el }}
                      />
                      <label htmlFor={id('consentement')} className="lp-small lp-inscription__consentement-texte">
                        {MENTION_CONSENTEMENT}
                      </label>
                    </div>
                    {erreurs.consentement && (
                      <p className="lp-inscription__erreur" id={idErreur('consentement')}>{erreurs.consentement}</p>
                    )}
                  </div>

                  <hr className="lp-rule" />

                  <div className="lp-inscription__actions">
                    <button type="submit" className="lp-btn lp-btn--primaire">Vérifier ma demande</button>
                    <p className="lp-small lp-inscription__mention-envoi">{MENTION_ENVOI_INDISPONIBLE}</p>
                  </div>
                </form>
              )}
            </div>

            <aside className="lp-inscription__aide" aria-label="Inscription — informations pratiques">
              <ScrollReveal className="lp-card lp-inscription__bloc">
                {/* Le bloc s'intitulait « S'inscrire autrement » et annonçait
                    que « le secrétariat prend aussi les inscriptions par
                    téléphone et sur place » — l'affiche dit l'inverse :
                    « INSCRIPTION SUR LE SITE INTERNET DES COURS DE LA
                    MOSQUÉE ». On n'ouvre pas un canal à la place de la
                    mosquée ; on annonce le seul usage établi du numéro
                    qu'elle publie : répondre aux questions. */}
                <h3 className="lp-h4">{INSCRIPTION_TEXTES.aideTitre}</h3>
                <p className="lp-p">{INSCRIPTION_TEXTES.aideTexte}</p>
                <hr className="lp-rule" />
                <dl className="lp-inscription__coord">
                  <div>
                    <dt className="lp-caption">Téléphone</dt>
                    <dd>
                      {telConnu ? (
                        <a className="lp-lien lp-num" href={ORG.telHref}>{ORG.tel}</a>
                      ) : (
                        /* Le numéro vient de l'affiche 2026-2027 et ORG.telHref
                           lui correspond : le lien tel: ci-dessus est le chemin
                           NORMAL. Ce repli ne sert plus que si ORG.tel redevient
                           un marqueur d'attente. */
                        <span className="lp-attente">{CONTACT_LIBELLES.telAConfirmer}</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="lp-caption">E-mail</dt>
                    <dd>
                      {emailConnu ? (
                        <a className="lp-lien" href={`mailto:${ORG.email}`}>{ORG.email}</a>
                      ) : (
                        /* Le mailto: s'active tout seul dès que ORG.email est
                           renseigné. Libellé pris dans contenu.js et non écrit
                           ici : en dur, il disait « Adresse à confirmer », ce
                           qui se lisait comme l'adresse POSTALE. */
                        <span className="lp-attente">{CONTACT_LIBELLES.emailAConfirmer}</span>
                      )}
                    </dd>
                  </div>
                </dl>
                <a className="lp-lien lp-inscription__lien-contact" href="#contact">
                  Adresse et coordonnées complètes
                </a>
              </ScrollReveal>

              {MOYENS_REGLEMENT.length > 0 && (
                <ScrollReveal className="lp-card lp-inscription__bloc" delay={90}>
                  <h3 className="lp-h4">Règlement</h3>
                  <p className="lp-small">{INSCRIPTION_TEXTES.reglementNote}</p>
                  <ul className="lp-inscription__reglement">
                    {MOYENS_REGLEMENT.map((moyen) => (
                      <li key={moyen.key}>
                        {/* Le libellé devient un LIEN quand le moyen en porte
                            un — c'est le cas de HelloAsso depuis le 24/08.
                            `target=_blank` parce que le visiteur est peut-être
                            en train de remplir le formulaire juste à côté :
                            l'envoyer payer ne doit pas lui faire perdre ce
                            qu'il a saisi. `rel=noreferrer` par principe. */}
                        {moyen.url ? (
                          <a
                            className="lp-lien lp-inscription__moyen"
                            href={moyen.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {moyen.libelle}
                          </a>
                        ) : (
                          <span className="lp-inscription__moyen">{moyen.libelle}</span>
                        )}
                        {/* Un moyen peut n'avoir rien de plus à dire que son
                            libellé : on ne pose pas un <span> vide. */}
                        {moyen.detail ? <span className="lp-small">{moyen.detail}</span> : null}
                      </li>
                    ))}
                  </ul>
                  {tarifsEnAttente && (
                    <p><span className="lp-attente">{FORMULES[0]?.prixNote ?? 'Tarif à confirmer'}</span></p>
                  )}
                  {lienTarifs && (
                    <p className="lp-small">
                      Le détail des montants figure dans la section{' '}
                      <a className="lp-lien" href={`#${lienTarifs.id}`}>{lienTarifs.label}</a>.
                    </p>
                  )}
                </ScrollReveal>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
