import mongoose from 'mongoose'

import { Dish } from '../models/Dish.js'
import { deleteDishImage, uploadedDishImagePath } from '../utils/dishImageStorage.js'

function populateAllergens(query) {
  return query.populate('allergens', 'name')
}

function parseAllergens(value) {
  if (!value) {
    return []
  }

  if (Array.isArray(value)) {
    return value.flatMap(parseAllergens)
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
      throw new Error('Allergener må være en liste')
    }
    return parsed
  }

  return trimmedValue.split(',').map((id) => id.trim()).filter(Boolean)
}

function validateDishFields(body, { requireImage, file }) {
  const name = String(body.name || '').trim()
  const description = String(body.description || '').trim()
  const allergens = parseAllergens(body.allergens)
  const image = uploadedDishImagePath(file)

  if (!name) {
    throw Object.assign(new Error('Navn på rett er påkrevd'), { statusCode: 400 })
  }

  if (name.length > 150) {
    throw Object.assign(new Error('Navn på rett er for langt'), { statusCode: 400 })
  }

  if (description.length > 1000) {
    throw Object.assign(new Error('Beskrivelse er for lang'), { statusCode: 400 })
  }

  for (const allergenId of allergens) {
    if (!mongoose.Types.ObjectId.isValid(allergenId)) {
      throw Object.assign(new Error('Ugyldig allergen-ID'), { statusCode: 400 })
    }
  }

  if (requireImage && !image) {
    throw Object.assign(new Error('Bilde er påkrevd'), { statusCode: 400 })
  }

  return { name, description, image, allergens }
}

async function deleteUploadedFileOnError(file) {
  const image = uploadedDishImagePath(file)
  if (image) {
    await deleteDishImage(image)
  }
}

export async function getDishes(_req, res, next) {
  try {
    const dishes = await populateAllergens(Dish.find().sort({ name: 1 }))
    res.json(dishes)
  } catch (error) {
    next(error)
  }
}

export async function getDish(req, res, next) {
  try {
    const dish = await populateAllergens(Dish.findById(req.params.id))

    if (!dish) {
      return res.status(404).json({ message: 'Retten finnes ikke' })
    }

    res.json(dish)
  } catch (error) {
    next(error)
  }
}

export async function createDish(req, res, next) {
  try {
    const payload = validateDishFields(req.body, { requireImage: true, file: req.file })

    const dish = await Dish.create({
      name: payload.name,
      description: payload.description,
      image: payload.image,
      allergens: payload.allergens,
    })

    const populatedDish = await populateAllergens(Dish.findById(dish._id))
    res.status(201).json(populatedDish)
  } catch (error) {
    await deleteUploadedFileOnError(req.file)
    next(error)
  }
}

export async function updateDish(req, res, next) {
  try {
    const existingDish = await Dish.findById(req.params.id)

    if (!existingDish) {
      await deleteUploadedFileOnError(req.file)
      return res.status(404).json({ message: 'Retten finnes ikke' })
    }

    const payload = validateDishFields(req.body, { requireImage: false, file: req.file })
    const oldImage = existingDish.image

    existingDish.name = payload.name
    existingDish.description = payload.description
    existingDish.allergens = payload.allergens
    if (payload.image) {
      existingDish.image = payload.image
    }

    await existingDish.save()

    if (payload.image && oldImage !== payload.image) {
      await deleteDishImage(oldImage)
    }

    const populatedDish = await populateAllergens(Dish.findById(existingDish._id))
    res.json(populatedDish)
  } catch (error) {
    await deleteUploadedFileOnError(req.file)
    next(error)
  }
}

export async function deleteDish(req, res, next) {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id)

    if (!dish) {
      return res.status(404).json({ message: 'Retten finnes ikke' })
    }

    await deleteDishImage(dish.image)

    res.json({ message: 'Rett slettet' })
  } catch (error) {
    next(error)
  }
}
