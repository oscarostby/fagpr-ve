import {
  Apple,
  Beef,
  Cake,
  ChefHat,
  Coffee,
  CookingPot,
  Fish,
  ForkKnife,
  LeafyGreen,
  Pizza,
  Salad,
  Soup,
  Utensils,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

export type DishIconRule = {
  icon: LucideIcon
  keywords: string[]
}

function normalizeDishName(dishName: string) {
  return dishName
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
}

export const dishIconRules: DishIconRule[] = [
  {
    icon: Pizza,
    keywords: ['pizza'],
  },
  {
    icon: Beef,
    keywords: ['hamburger', 'burger', 'biff', 'beef', 'kjott', 'kjøtt', 'karbonade'],
  },
  {
    icon: Fish,
    keywords: ['fisk', 'laks', 'torsk', 'sei', 'ørret', 'orret', 'fiskegrateng', 'fish'],
  },
  {
    icon: Salad,
    keywords: ['pastasalat', 'salat', 'salad'],
  },
  {
    icon: LeafyGreen,
    keywords: ['vegetar', 'vegan', 'gronnsak', 'grønnsak', 'gront', 'grønt', 'leaf'],
  },
  {
    icon: ForkKnife,
    keywords: ['kyllingwok', 'wok', 'kylling', 'chicken'],
  },
  {
    icon: CookingPot,
    keywords: ['lasagne', 'gryte', 'grateng', 'pasta', 'bolognese', 'risotto'],
  },
  {
    icon: Soup,
    keywords: ['suppe', 'soup', 'lapskaus'],
  },
  {
    icon: Utensils,
    keywords: ['taco', 'tortilla', 'wrap', 'quesadilla', 'nachos'],
  },
  {
    icon: ChefHat,
    keywords: ['kebab', 'shawarma', 'falafel', 'pommes', 'frites'],
  },
  {
    icon: Cake,
    keywords: ['dessert', 'kake', 'cake', 'brownie', 'muffin', 'vaffel', 'is', 'sjokolade'],
  },
  {
    icon: Apple,
    keywords: ['frukt', 'apple', 'eple', 'banan', 'appelsin', 'pære', 'paere'],
  },
  {
    icon: Coffee,
    keywords: ['kaffe', 'coffee', 'cafe', 'kakao', 'te'],
  },
]

export const defaultDishIcon = UtensilsCrossed

export function getDishIcon(dishName: string): LucideIcon {
  const normalizedDishName = normalizeDishName(dishName)
  const match = dishIconRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedDishName.includes(normalizeDishName(keyword))),
  )

  return match?.icon ?? defaultDishIcon
}
