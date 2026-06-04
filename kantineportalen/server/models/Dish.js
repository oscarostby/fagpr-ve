import mongoose from 'mongoose'

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    allergens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Allergen',
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Dish', dishSchema)
