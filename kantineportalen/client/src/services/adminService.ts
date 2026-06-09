import { apiRequest } from '@/services/api'
import type { DietaryTag } from '@/utils/dietaryTags'

export type ApiAllergen = {
  _id: string
  name: string
}

export type ApiDish = {
  _id: string
  name: string
  description?: string
  image?: string
  allergens: ApiAllergen[]
  dietaryTags: DietaryTag[]
}

export type ApiWeeklyMenu = {
  _id?: string
  monday: ApiDish | null
  tuesday: ApiDish | null
  wednesday: ApiDish | null
  thursday: ApiDish | null
  friday: ApiDish | null
}

export type LoginResponse = {
  token: string
  user: {
    id: string
    username: string
    role: string
  }
}

export type DishPayload = {
  name: string
  description?: string
  imageFile?: File | null
  allergens?: string[]
  dietaryTags?: DietaryTag[]
}

function toDishFormData(payload: DishPayload) {
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('description', payload.description || '')
  formData.append('allergens', JSON.stringify(payload.allergens || []))
  formData.append('dietaryTags', JSON.stringify(payload.dietaryTags || []))

  if (payload.imageFile) {
    formData.append('image', payload.imageFile)
  }

  return formData
}

export type AllergenPayload = {
  name: string
}

export type MenuPayload = {
  monday?: string | null
  tuesday?: string | null
  wednesday?: string | null
  thursday?: string | null
  friday?: string | null
}

function normalizeDish(dish: ApiDish): ApiDish {
  return { ...dish, allergens: dish.allergens || [], dietaryTags: dish.dietaryTags || [] }
}

export function login(username: string, password: string) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

export function getDishes() {
  return apiRequest<ApiDish[]>('/dishes').then((dishes) => dishes.map(normalizeDish))
}

export function getDish(id: string) {
  return apiRequest<ApiDish>(`/dishes/${id}`)
}

export function createDish(payload: DishPayload, token: string) {
  return apiRequest<ApiDish>('/dishes', {
    method: 'POST',
    body: toDishFormData(payload),
    token,
  }).then(normalizeDish)
}

export function updateDish(id: string, payload: DishPayload, token: string) {
  return apiRequest<ApiDish>(`/dishes/${id}`, {
    method: 'PUT',
    body: toDishFormData(payload),
    token,
  }).then(normalizeDish)
}

export function deleteDish(id: string, token: string) {
  return apiRequest<{ message: string }>(`/dishes/${id}`, {
    method: 'DELETE',
    token,
  })
}

export function getAllergens() {
  return apiRequest<ApiAllergen[]>('/allergens')
}

export function createAllergen(payload: AllergenPayload, token: string) {
  return apiRequest<ApiAllergen>('/allergens', {
    method: 'POST',
    body: JSON.stringify(payload),
    token,
  })
}

export function updateAllergen(id: string, payload: AllergenPayload, token: string) {
  return apiRequest<ApiAllergen>(`/allergens/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    token,
  })
}

export function deleteAllergen(id: string, token: string) {
  return apiRequest<{ message: string }>(`/allergens/${id}`, {
    method: 'DELETE',
    token,
  })
}

export function getMenu() {
  return apiRequest<ApiWeeklyMenu>('/menu')
}

export function updateMenu(payload: MenuPayload, token: string) {
  return apiRequest<ApiWeeklyMenu>('/menu', {
    method: 'PUT',
    body: JSON.stringify(payload),
    token,
  })
}
