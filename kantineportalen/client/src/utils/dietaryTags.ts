export const dietaryTagOptions = [
  { value: 'vegetarian', label: 'Vegetar' },
  { value: 'vegan', label: 'Vegansk' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
] as const

export type DietaryTag = (typeof dietaryTagOptions)[number]['value']

export const dietaryTagLabels: Record<DietaryTag, string> = {
  vegetarian: 'Vegetar',
  vegan: 'Vegansk',
  halal: 'Halal',
  kosher: 'Kosher',
}

export const dietaryTagIcons: Record<DietaryTag, LucideIcon> = {
  vegetarian: Leaf,
  vegan: Vegan,
  halal: MoonStar,
  kosher: BadgeCheck,
}

export function dietaryTagLabel(tag: string) {
  return dietaryTagLabels[tag as DietaryTag] || tag
}

export function dietaryTagIcon(tag: DietaryTag) {
  return dietaryTagIcons[tag]
}

export function hasSelectedDietaryTags(dishTags: string[] | undefined, selectedTags: DietaryTag[]) {
  if (selectedTags.length === 0) {
    return true
  }

  const dishTagSet = new Set(dishTags || [])
  // Når flere filter er valgt bruker vi OR-logikk: retten vises hvis den matcher minst ett valgt kostholdsmerke.
  return selectedTags.some((tag) => dishTagSet.has(tag))
}
import { BadgeCheck, Leaf, MoonStar, Vegan, type LucideIcon } from 'lucide-react'
