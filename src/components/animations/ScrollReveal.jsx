import { useArmedReveal } from '../../lib/hooks'

/**
 * Draws its content on from left to right the first time it scrolls into view.
 * Content stays visible until the page is running and knows the element is off screen,
 * so a failed script can never leave a headline hidden.
 */
export default function ScrollReveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, armed, seen] = useArmedReveal()
  return (
    <Tag ref={ref} className={className} {...rest}>
      <span className={`draw-in-text ${armed ? 'draw-in' : ''} ${seen ? 'is-in' : ''}`}>{children}</span>
    </Tag>
  )
}
