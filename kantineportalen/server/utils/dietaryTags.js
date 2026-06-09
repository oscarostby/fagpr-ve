export const allowedDietaryTags = ['vegetarian', 'vegan', 'halal', 'kosher']

export const dietaryTagLabels = {
  vegetarian: 'Vegetar',
  vegan: 'Vegansk',
  halal: 'Halal',
  kosher: 'Kosher',
}

const allowedDietaryTagSet = new Set(allowedDietaryTags)

export function parseDietaryTags(value) {
  if (!value) {
    return []
  }

  if (Array.isArray(value)) {
    return uniqueDietaryTags(value.flatMap(parseDietaryTags))
  }

  if (typeof value !== 'string') {
    return []
  }

  const trimmedValue = value.trim()
  if (!trimmedValue) {
    return []
  }

  if (trimmedValue.startsWith('[')) {
    const parsed = JSON.parse(trimmedValue)
    if (!Array.isArray(parsed)) {
      throw new Error('Kostholdsmerker må være en liste')
    }
    return parseDietaryTags(parsed)
  }

  return uniqueDietaryTags(trimmedValue.split(',').map((tag) => tag.trim()).filter(Boolean))
}

function uniqueDietaryTags(tags) {
  const uniqueTags = []

  for (const tag of tags) {
    if (!allowedDietaryTagSet.has(tag)) {
      throw new Error(`Ugyldig kostholdsmerke: ${tag}`)
    }

    if (!uniqueTags.includes(tag)) {
      uniqueTags.push(tag)
    }
  }

  return uniqueTags
}
