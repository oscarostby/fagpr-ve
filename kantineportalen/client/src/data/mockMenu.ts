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
  },
  {
    day: 'Tirsdag',
    title: 'Kyllingwok med ris',
  },
  {
    day: 'Onsdag',
    title: 'Fisk med poteter og grønnsaker',
  },
  {
    day: 'Torsdag',
    title: 'Pastasalat med kylling',
  },
  {
    day: 'Fredag',
    title: 'Pizza',
  },
]
