import jwt from 'jsonwebtoken'

export function createToken(user) {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET mangler i .env')
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )
}

export function verifyToken(token) {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET mangler i .env')
  }

  return jwt.verify(token, jwtSecret)
}
