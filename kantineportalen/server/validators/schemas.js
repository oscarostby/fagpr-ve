import mongoose from 'mongoose'
import { z } from 'zod'

const nonEmptyString = (fieldName, max = 250) =>
  z
    .string({ required_error: `${fieldName} er påkrevd`, invalid_type_error: `${fieldName} må være tekst` })
    .trim()
    .min(1, `${fieldName} kan ikke være tom`)
    .max(max, `${fieldName} er for lang`)

const optionalString = (fieldName, max = 1000) =>
  z
    .string({ invalid_type_error: `${fieldName} må være tekst` })
    .trim()
    .max(max, `${fieldName} er for lang`)
    .optional()

const objectId = z
  .string({ required_error: 'ObjectId er påkrevd', invalid_type_error: 'ObjectId må være tekst' })
  .trim()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), 'Ugyldig ObjectId')

const dietaryTag = z.enum(['vegetarian', 'vegan', 'halal', 'kosher'], {
  invalid_type_error: 'Kostholdsmerke må være tekst',
  errorMap: () => ({ message: 'Ugyldig kostholdsmerke' }),
})

const optionalObjectIdOrNull = z
  .union([objectId, z.null(), z.literal('')])
  .optional()
  .transform((value) => (value === '' ? null : value))

export const idParamSchema = z.object({
  params: z.object({ id: objectId }).strict(),
  body: z.unknown().optional(),
  query: z.unknown().optional(),
})

export const loginSchema = z.object({
  body: z
    .object({
      username: nonEmptyString('Brukernavn', 100),
      password: nonEmptyString('Passord', 200),
    })
    .strict(),
  params: z.unknown().optional(),
  query: z.unknown().optional(),
})

export const dishSchema = z.object({
  body: z
    .object({
      name: nonEmptyString('Navn på rett', 150),
      description: optionalString('Beskrivelse', 1000),
      image: optionalString('Bilde', 500),
      allergens: z.array(objectId, { invalid_type_error: 'Allergener må være en liste' }).optional(),
      dietaryTags: z.array(dietaryTag, { invalid_type_error: 'Kostholdsmerker må være en liste' }).optional(),
    })
    .strict(),
  params: z.unknown().optional(),
  query: z.unknown().optional(),
})

export const dishUpdateSchema = z.object({
  params: z.object({ id: objectId }).strict(),
  body: dishSchema.shape.body,
  query: z.unknown().optional(),
})

export const allergenSchema = z.object({
  body: z
    .object({
      name: nonEmptyString('Allergennavn', 100),
    })
    .strict(),
  params: z.unknown().optional(),
  query: z.unknown().optional(),
})

export const allergenUpdateSchema = z.object({
  params: z.object({ id: objectId }).strict(),
  body: allergenSchema.shape.body,
  query: z.unknown().optional(),
})

export const menuUpdateSchema = z.object({
  body: z
    .object({
      monday: optionalObjectIdOrNull,
      tuesday: optionalObjectIdOrNull,
      wednesday: optionalObjectIdOrNull,
      thursday: optionalObjectIdOrNull,
      friday: optionalObjectIdOrNull,
    })
    .strict('Kun ukedager mandag-fredag er tillatt'),
  params: z.unknown().optional(),
  query: z.unknown().optional(),
})
