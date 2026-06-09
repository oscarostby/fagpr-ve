import type { Lunch, Weekday, WeeklyMenuItem } from '@/types/menu'
import { apiRequest, getAssetUrl } from '@/services/api'
import type { DietaryTag } from '@/utils/dietaryTags'

type ApiAllergen = {
  _id: string
  name: string
}

type ApiDish = {
  _id: string
  name: string
  description: string
  image: string
  allergens: ApiAllergen[]
  dietaryTags: DietaryTag[]
}

type ApiWeeklyMenu = {
  monday: ApiDish | null
  tuesday: ApiDish | null
  wednesday: ApiDish | null
  thursday: ApiDish | null
  friday: ApiDish | null
}

const dayConfig: Array<{ apiKey: keyof ApiWeeklyMenu; day: Weekday }> = [
  { apiKey: 'monday', day: 'Mandag' },
  { apiKey: 'tuesday', day: 'Tirsdag' },
  { apiKey: 'wednesday', day: 'Onsdag' },
  { apiKey: 'thursday', day: 'Torsdag' },
  { apiKey: 'friday', day: 'Fredag' },
]

const todayApiKeyByDayNumber: Record<number, keyof ApiWeeklyMenu> = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
}

function allergenNames(dish: ApiDish | null | undefined) {
  return dish?.allergens?.map((allergen) => allergen.name) ?? []
}

function dietaryTags(dish: ApiDish | null | undefined) {
  return dish?.dietaryTags ?? []
}

function dishTitle(dish: ApiDish | null | undefined) {
  return dish?.name || 'Ingen rett satt opp'
}

function dishImage(dish: ApiDish | null | undefined) {
  return getAssetUrl(dish?.image)
}

export type FrontendMenu = {
  todayLunch: Lunch
  weeklyMenu: WeeklyMenuItem[]
}

export async function getFrontendMenu(): Promise<FrontendMenu> {
  const apiMenu = await apiRequest<ApiWeeklyMenu>('/menu')
  const todayDish = apiMenu[todayApiKeyByDayNumber[new Date().getDay()] || 'monday'] || apiMenu.monday

  return {
    todayLunch: {
      title: dishTitle(todayDish),
      servingTime: '11:00 - 13:00',
      allergens: allergenNames(todayDish),
      dietaryTags: dietaryTags(todayDish),
      image: dishImage(todayDish),
    },
    weeklyMenu: dayConfig.map(({ apiKey, day }) => ({
      day,
      title: dishTitle(apiMenu[apiKey]),
      allergens: allergenNames(apiMenu[apiKey]),
      dietaryTags: dietaryTags(apiMenu[apiKey]),
    })),
  }
}
