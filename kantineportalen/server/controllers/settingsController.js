import { formatTokenExpiration, getTokenExpiresInSeconds, setTokenExpiresInSeconds } from '../utils/tokenSettings.js'

export async function getTokenExpiration(req, res, next) {
  try {
    const expiresInSeconds = await getTokenExpiresInSeconds()

    res.json({
      expiresInSeconds,
      label: formatTokenExpiration(expiresInSeconds),
    })
  } catch (error) {
    next(error)
  }
}

export async function updateTokenExpiration(req, res, next) {
  try {
    const setting = await setTokenExpiresInSeconds(req.body.expiresInSeconds)
    res.json(setting)
  } catch (error) {
    next(error)
  }
}
