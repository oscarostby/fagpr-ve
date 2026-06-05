export type Lunch = {
  title: string
  servingTime: string
  allergens: string[]
}

export type Weekday = 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag'

export type WeeklyMenuItem = {
  day: Weekday
  title: string
}
