import mongoose from 'mongoose'

const weekdayDish = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Dish',
  default: null,
}

const weeklyMenuSchema = new mongoose.Schema(
  {
    monday: weekdayDish,
    tuesday: weekdayDish,
    wednesday: weekdayDish,
    thursday: weekdayDish,
    friday: weekdayDish,
  },
  { timestamps: true },
)

export const WeeklyMenu = mongoose.model('WeeklyMenu', weeklyMenuSchema)
