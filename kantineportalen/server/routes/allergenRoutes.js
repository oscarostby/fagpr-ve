import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({ message: 'Ruter for allergener er klare' })
})

router.post('/', (_req, res) => {
  res.status(501).json({ message: 'Oppretting av allergener er ikke implementert ennå' })
})

export default router
