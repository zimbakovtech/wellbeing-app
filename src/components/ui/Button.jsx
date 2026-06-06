import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils.js'
import Icon from './Icon.jsx'

const VARIANTS = {
  primary:
    'bg-ink text-paper hover:bg-ink-soft shadow-soft hover:shadow-lift focus-visible:ring-ink/50',
  accent:
    'bg-blue-500 text-white hover:bg-blue-600 shadow-soft hover:shadow-lift focus-visible:ring-blue-500/50',
  secondary:
    'bg-surface text-ink border border-line-strong hover:border-ink/30 hover:bg-paper shadow-ring',
  ghost: 'text-ink hover:bg-ink/[0.04]',
}

const SIZES = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-[0.95rem] gap-2',
  lg: 'h-12 px-7 text-base gap-2',
}

/**
 * Polymorphic button. Renders a router <Link> with `to`, an <a> with `href`,
 * otherwise a <button>. Consistent sizing, focus ring and gentle motion.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconRight,
  className,
  ...props
}) {
  const classes = cn(
    'group inline-flex select-none items-center justify-center rounded-full font-medium',
    'transition-all duration-200 ease-gentle cursor-pointer active:scale-[0.97]',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
    VARIANTS[variant],
    SIZES[size],
    className,
  )

  const inner = (
    <>
      {icon && <Icon name={icon} className="h-[1.05em] w-[1.05em]" />}
      {children}
      {iconRight && (
        <Icon
          name={iconRight}
          className="h-[1.05em] w-[1.05em] transition-transform duration-200 ease-gentle group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {inner}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  )
}
