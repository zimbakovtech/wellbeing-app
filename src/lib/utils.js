/** Tiny classNames joiner - filters falsy values. Keeps JSX readable. */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}
