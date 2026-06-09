import mongoose from 'mongoose'

const appSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
)

appSettingSchema.index({ key: 1 }, { unique: true })

export const AppSetting = mongoose.model('AppSetting', appSettingSchema)
