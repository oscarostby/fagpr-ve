import mongoose from 'mongoose'

const weeklyMenuSchema = new mongoose.Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 53,
    },
    year: {
      type: Number,
      required: true,
    },
    days: [
      {
        day: {
          type: String,
          required: true,
          enum: ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag'],
        },
        dishes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish',
          },
        ],
      },
    ],
  },
  { timestamps: true },
)

weeklyMenuSchema.index({ weekNumber: 1, year: 1 }, { unique: true })

export default mongoose.model('WeeklyMenu', weeklyMenuSchema)
