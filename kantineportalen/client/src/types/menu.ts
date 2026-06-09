import type { DietaryTag } from '@/utils/dietaryTags'

export type Lunch = {
  title: string
  servingTime: string
  allergens: string[]
  dietaryTags: DietaryTag[]
  image: string
}

export type Weekday = 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag'

export type AllergenOption = {
  id: string
  label: string
}

export type DishAdminDraft = {
  title: string
  day: Weekday
  servingTime: string
  description: string
  allergenIds: string[]
}

export type DishAdminPayload = DishAdminDraft

export type DishAdminValidationResult = {
  isValid: boolean
  missingFields: Array<keyof Pick<DishAdminDraft, 'title' | 'day' | 'servingTime'>>
}

export type WeeklyMenuItem = {
  day: Weekday
  title: string
  allergens: string[]
  dietaryTags: DietaryTag[]
}
