import { User } from '../models/User.js'
import { verifyToken } from '../utils/jwt.js'

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || ''
    const [scheme, token] = authHeader.split(' ')

    if (scheme !== 'Bearer' || !token) {
      console.warn('[Auth] Mangler Bearer-token')
      return res.status(401).json({ message: 'Ikke innlogget' })
    }

    const payload = verifyToken(token)
    const user = await User.findById(payload.id)

    if (!user) {
      console.warn('[Auth] Token peker til ukjent bruker')
      return res.status(401).json({ message: 'Ugyldig token' })
    }

    req.user = user
    next()
  } catch (error) {
    console.warn('[Auth] Token-feil:', error.message)
    res.status(401).json({ message: 'Ugyldig eller utløpt token' })
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    console.warn('[Auth] Ikke admin:', req.user?.username || 'ukjent')
    return res.status(403).json({ message: 'Krever admin-tilgang' })
  }

  next()
}
