import { AppSetting } from '../models/AppSetting.js'

export const tokenExpirationSettingKey = 'jwt.tokenExpiresInSeconds'
export const defaultTokenExpiresInSeconds = 7 * 24 * 60 * 60

export function formatTokenExpiration(seconds) {
  if (seconds % 86400 === 0) {
    const days = seconds / 86400
    return `${days} ${days === 1 ? 'dag' : 'dager'}`
  }

  if (seconds % 3600 === 0) {
    const hours = seconds / 3600
    return `${hours} ${hours === 1 ? 'time' : 'timer'}`
  }

  if (seconds % 60 === 0) {
    const minutes = seconds / 60
    return `${minutes} ${minutes === 1 ? 'minutt' : 'minutter'}`
  }

  return `${seconds} sekunder`
}

export async function getTokenExpiresInSeconds() {
  const setting = await AppSetting.findOne({ key: tokenExpirationSettingKey }).lean()
  const value = Number(setting?.value)

  if (Number.isInteger(value) && value >= 300 && value <= 31_536_000) {
    return value
  }

  return defaultTokenExpiresInSeconds
}

export async function setTokenExpiresInSeconds(seconds) {
  const normalizedSeconds = Number(seconds)

  if (!Number.isInteger(normalizedSeconds) || normalizedSeconds < 300 || normalizedSeconds > 31_536_000) {
    throw new Error('Token-utløp må være mellom 5 minutter og 365 dager')
  }

  const setting = await AppSetting.findOneAndUpdate(
    { key: tokenExpirationSettingKey },
    { key: tokenExpirationSettingKey, value: normalizedSeconds },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
  )

  return {
    key: setting.key,
    expiresInSeconds: normalizedSeconds,
    label: formatTokenExpiration(normalizedSeconds),
    updatedAt: setting.updatedAt,
  }
}
