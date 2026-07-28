import { useInView } from '../hooks/useInView.js'

/**
 * Enveloppe un bloc et le révèle au scroll (fade + translation courte).
 * Respecte prefers-reduced-motion via la CSS (.lp-reveal).
 *
 * @param {number} delay  — retard en ms, pour décaler les items d'une grille
 * @param {string} as     — élément rendu (div par défaut)
 */
export default function ScrollReveal({ children, delay = 0, as: Tag = 'div', className = '', style, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  return (
    <Tag
      ref={ref}
      className={`lp-reveal${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
