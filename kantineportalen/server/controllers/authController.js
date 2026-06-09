import { User } from '../models/User.js'
import { createToken } from '../utils/jwt.js'

export async function login(req, res, next) {
  try {
    const { username, password } = req.body

    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
      console.warn('[Auth] Login mangler gyldig brukernavn eller passord')
      return res.status(400).json({ message: 'Brukernavn og passord er påkrevd' })
    }

    const normalizedUsername = username.toLowerCase().trim()
    const user = await User.findOne({ username: normalizedUsername }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
      console.warn('[Auth] Feilet login for:', username)
      return res.status(401).json({ message: 'Feil brukernavn eller passord' })
    }

    const token = await createToken(user)

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}
