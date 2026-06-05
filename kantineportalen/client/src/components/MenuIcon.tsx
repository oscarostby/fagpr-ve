type MenuIconProps = {
  type: 'soup' | 'wok' | 'fish' | 'plant' | 'pizza'
  className?: string
}

const iconClass = 'fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round'

export function MenuIcon({ type, className = '' }: MenuIconProps) {
  if (type === 'soup') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
        <path className={iconClass} d="M17 34h30c0 8-6 13-15 13s-15-5-15-13Z" />
        <path className={iconClass} d="M22 48h20" />
        <path className={iconClass} d="M25 18c-4 5 4 7 0 12" />
        <path className={iconClass} d="M33 15c-4 5 4 8 0 13" />
        <path className={iconClass} d="M41 18c-4 5 4 7 0 12" />
      </svg>
    )
  }

  if (type === 'wok') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
        <path className={iconClass} d="M17 38h31c-2 7-8 11-16 11s-13-4-15-11Z" />
        <path className={iconClass} d="M22 50h21" />
        <path className={iconClass} d="M12 35h42" />
        <path className={iconClass} d="M31 34 51 20" />
        <path className={iconClass} d="M37 35 56 24" />
        <path className={iconClass} d="M24 33c3-5 9-4 11 0" />
      </svg>
    )
  }

  if (type === 'fish') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
        <path className={iconClass} d="M13 33c8-12 24-13 35 0-11 13-27 12-35 0Z" />
        <path className={iconClass} d="M48 33 57 24v18l-9-9Z" />
        <path className={iconClass} d="M25 27c3 3 3 9 0 12" />
        <circle cx="19.5" cy="31" r="1.5" className="fill-current" />
        <path className={iconClass} d="M33 23c3-4 7-5 11-3" />
        <path className={iconClass} d="M34 43c4 2 7 1 10-2" />
      </svg>
    )
  }

  if (type === 'plant') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
        <path className={iconClass} d="M18 43h29c-1 6-6 9-14 9s-13-3-15-9Z" />
        <path className={iconClass} d="M24 53h18" />
        <path className={iconClass} d="M33 43V22" />
        <path className={iconClass} d="M33 32c-8 0-13-5-15-12 8 0 13 5 15 12Z" />
        <path className={iconClass} d="M34 35c9 0 14-5 16-13-9 0-14 5-16 13Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path className={iconClass} d="M18 13 52 47 11 55 18 13Z" />
      <path className={iconClass} d="M22 23c7 2 14 8 18 15" />
      <circle cx="24" cy="43" r="2.8" className={iconClass} />
      <circle cx="35" cy="48" r="2.8" className={iconClass} />
      <circle cx="32" cy="34" r="2.8" className={iconClass} />
    </svg>
  )
}
