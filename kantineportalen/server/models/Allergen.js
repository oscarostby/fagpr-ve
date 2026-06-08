import mongoose from 'mongoose'

const allergenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Allergennavn er påkrevd'],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true },
)

export const Allergen = mongoose.model('Allergen', allergenSchema)
