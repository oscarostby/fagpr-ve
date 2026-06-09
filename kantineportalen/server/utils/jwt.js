import jwt from 'jsonwebtoken'

import { getTokenExpiresInSeconds } from './tokenSettings.js'

export async function createToken(user) {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET mangler i .env')
  }

  const expiresIn = await getTokenExpiresInSeconds()

  return jwt.sign(
    {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    },
    jwtSecret,
    { expiresIn },
  )
}

export function verifyToken(token) {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET mangler i .env')
  }

  return jwt.verify(token, jwtSecret)
}
