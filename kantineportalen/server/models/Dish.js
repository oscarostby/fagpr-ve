import mongoose from 'mongoose'

import { allowedDietaryTags } from '../utils/dietaryTags.js'

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Navn på rett er påkrevd'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Bilde er påkrevd'],
      trim: true,
      validate: {
        validator(value) {
          return /^\/uploads\/dishes\/.+\.(jpg|jpeg|png|webp)$/i.test(value)
        },
        message: 'Bilde må være en opplastet jpg, jpeg, png eller webp-fil',
      },
    },
    allergens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Allergen',
      },
    ],
    dietaryTags: {
      type: [
        {
          type: String,
          enum: allowedDietaryTags,
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
)

export const Dish = mongoose.model('Dish', dishSchema)
