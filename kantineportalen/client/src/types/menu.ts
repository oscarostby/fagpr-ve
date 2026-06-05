export type Lunch = {
  title: string
  servingTime: string
  allergens: string[]
}

export type Weekday = 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag'

export type MenuIconType = 'soup' | 'wok' | 'fish' | 'plant' | 'pizza'

export type WeeklyMenuItem = {
  day: Weekday
  title: string
  icon: MenuIconType
}
