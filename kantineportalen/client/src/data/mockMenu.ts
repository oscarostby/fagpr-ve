import type { Lunch, WeeklyMenuItem } from '@/types/menu'

export const todayLunch: Lunch = {
  title: 'Lasagne med salat',
  servingTime: '11:00 - 13:00',
  allergens: ['Gluten', 'Melk'],
}

export const weeklyMenu: WeeklyMenuItem[] = [
  {
    day: 'Mandag',
    title: 'Lasagne med salat',
    icon: 'soup',
  },
  {
    day: 'Tirsdag',
    title: 'Kyllingwok med ris',
    icon: 'wok',
  },
  {
    day: 'Onsdag',
    title: 'Fisk med poteter og grønnsaker',
    icon: 'fish',
  },
  {
    day: 'Torsdag',
    title: 'Pastasalat med kylling',
    icon: 'plant',
  },
  {
    day: 'Fredag',
    title: 'Pizza',
    icon: 'pizza',
  },
]
