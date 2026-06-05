import type { DishAdminDraft, DishAdminPayload, DishAdminValidationResult } from '@/types/menu'

export const dishAdminPlaceholderDraft: DishAdminDraft = {
  title: '',
  day: 'Mandag',
  servingTime: '11:00 - 13:00',
  description: '',
  allergenIds: [],
}

export const dishAdminAllergenPlaceholders = [
  { id: 'gluten', label: 'Gluten' },
  { id: 'milk', label: 'Melk' },
  { id: 'egg', label: 'Egg' },
  { id: 'fish', label: 'Fisk' },
  { id: 'nuts', label: 'Nøtter' },
  { id: 'soy', label: 'Soya' },
] as const

export function validateDishAdminDraft(draft: DishAdminDraft): DishAdminValidationResult {
  const missingFields: DishAdminValidationResult['missingFields'] = [
    ...(!draft.title.trim() ? (['title'] as const) : []),
    ...(!draft.day ? (['day'] as const) : []),
    ...(!draft.servingTime.trim() ? (['servingTime'] as const) : []),
  ]

  return {
    isValid: Boolean(draft.title.trim() && draft.day && draft.servingTime.trim()),
    missingFields,
  }
}

export function mapDishDraftToPayload(draft: DishAdminDraft): DishAdminPayload {
  return {
    title: draft.title.trim(),
    day: draft.day,
    servingTime: draft.servingTime.trim(),
    description: draft.description.trim(),
    allergenIds: draft.allergenIds,
  }
}
