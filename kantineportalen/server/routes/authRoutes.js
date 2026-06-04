import express from 'express'

const router = express.Router()

router.post('/login', (_req, res) => {
  res.status(501).json({ message: 'Innlogging er ikke implementert ennå' })
})

router.post('/register', (_req, res) => {
  res.status(501).json({ message: 'Registrering er ikke implementert ennå' })
})

export default router
