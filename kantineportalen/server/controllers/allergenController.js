import { Allergen } from '../models/Allergen.js'

export async function getAllergens(_req, res, next) {
  try {
    const allergens = await Allergen.find().sort({ name: 1 })
    res.json(allergens)
  } catch (error) {
    next(error)
  }
}

export async function createAllergen(req, res, next) {
  try {
    const allergen = await Allergen.create({ name: req.body.name })
    res.status(201).json(allergen)
  } catch (error) {
    next(error)
  }
}

export async function updateAllergen(req, res, next) {
  try {
    const allergen = await Allergen.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true },
    )

    if (!allergen) {
      return res.status(404).json({ message: 'Allergenet finnes ikke' })
    }

    res.json(allergen)
  } catch (error) {
    next(error)
  }
}

export async function deleteAllergen(req, res, next) {
  try {
    const allergen = await Allergen.findByIdAndDelete(req.params.id)

    if (!allergen) {
      return res.status(404).json({ message: 'Allergenet finnes ikke' })
    }

    res.json({ message: 'Allergen slettet' })
  } catch (error) {
    next(error)
  }
}
