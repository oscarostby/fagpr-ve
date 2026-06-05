import { CookingPot, Fish, Pizza, Soup, Sprout, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type MenuIconProps = {
  type: 'soup' | 'wok' | 'fish' | 'plant' | 'pizza'
  className?: string
}

const menuIcons: Record<MenuIconProps['type'], LucideIcon> = {
  soup: Soup,
  wok: CookingPot,
  fish: Fish,
  plant: Sprout,
  pizza: Pizza,
}

export function MenuIcon({ type, className = '' }: MenuIconProps) {
  const Icon = menuIcons[type]

  return (
    <Icon
      aria-hidden="true"
      className={cn(className)}
      strokeWidth={1.35}
    />
  )
}
