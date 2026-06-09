import { AppSetting } from '../models/AppSetting.js'

export const tokenExpirationSettingKey = 'jwt.tokenExpiresInSeconds'
export const minTokenExpiresInSeconds = 5 * 60
export const maxTokenExpiresInSeconds = 7 * 24 * 60 * 60
export const defaultTokenExpiresInSeconds = 7 * 24 * 60 * 60
export const tokenExpiresInSecondsCacheTtlMs = 60 * 1000

let cachedTokenExpiresInSeconds = null
let cachedTokenExpiresInSecondsAt = 0

export function clearTokenExpiresInSecondsCache() {
  cachedTokenExpiresInSeconds = null
  cachedTokenExpiresInSecondsAt = 0
}

export function parseTokenExpiresInSeconds(rawValue) {
  const value = Number(rawValue)

  if (!Number.isInteger(value) || value < minTokenExpiresInSeconds || value > maxTokenExpiresInSeconds) {
    throw new Error(
      `${tokenExpirationSettingKey} må være et heltall mellom ${minTokenExpiresInSeconds} og ${maxTokenExpiresInSeconds} sekunder`,
    )
  }

  return value
}

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

function warnInvalidTokenExpiration(rawValue, error) {
  console.warn(
    `[Auth] Ugyldig ${tokenExpirationSettingKey} i MongoDB: ${JSON.stringify(rawValue)}. ${error.message}. `
      + `Bruker trygg fallback ${defaultTokenExpiresInSeconds} sekunder (${formatTokenExpiration(defaultTokenExpiresInSeconds)}).`,
  )
}

function resolveTokenExpiresInSeconds(setting) {
  if (!setting) {
    return defaultTokenExpiresInSeconds
  }

  try {
    return parseTokenExpiresInSeconds(setting.value)
  } catch (error) {
    // Fallback er bevisst: login skal ikke stoppe på grunn av én feilkonfigurert setting.
    // Feilen logges tydelig med faktisk MongoDB-verdi slik at drift kan rette key-en manuelt.
    warnInvalidTokenExpiration(setting.value, error)
    return defaultTokenExpiresInSeconds
  }
}

export async function getTokenExpiresInSeconds() {
  const now = Date.now()

  // Kort cache reduserer ett ekstra MongoDB-kall per login, men lar manuelle MongoDB-endringer slå inn raskt.
  if (cachedTokenExpiresInSeconds && now - cachedTokenExpiresInSecondsAt < tokenExpiresInSecondsCacheTtlMs) {
    return cachedTokenExpiresInSeconds
  }

  const setting = await AppSetting.findOne({ key: tokenExpirationSettingKey }).lean()
  const expiresInSeconds = resolveTokenExpiresInSeconds(setting)

  cachedTokenExpiresInSeconds = expiresInSeconds
  cachedTokenExpiresInSecondsAt = now

  return expiresInSeconds
}

export async function ensureTokenExpiresInSecondsDefault(seconds = defaultTokenExpiresInSeconds) {
  const normalizedSeconds = parseTokenExpiresInSeconds(seconds)

  const setting = await AppSetting.findOneAndUpdate(
    { key: tokenExpirationSettingKey },
    {
      $setOnInsert: {
        key: tokenExpirationSettingKey,
        value: normalizedSeconds,
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    },
  ).lean()

  const expiresInSeconds = resolveTokenExpiresInSeconds(setting)

  clearTokenExpiresInSecondsCache()

  return {
    key: setting.key,
    expiresInSeconds,
    label: formatTokenExpiration(expiresInSeconds),
    updatedAt: setting.updatedAt,
    created: Boolean(setting.createdAt && setting.updatedAt && setting.createdAt.getTime?.() === setting.updatedAt.getTime?.()),
  }
}
