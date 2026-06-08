import express from 'express'
import {
  createAllergen,
  deleteAllergen,
  getAllergens,
  updateAllergen,
} from '../controllers/allergenController.js'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { allergenSchema, allergenUpdateSchema, idParamSchema } from '../validators/schemas.js'

const router = express.Router()

router.get('/', getAllergens)
router.post('/', protect, requireAdmin, validateRequest(allergenSchema), createAllergen)
router.put('/:id', protect, requireAdmin, validateRequest(allergenUpdateSchema), updateAllergen)
router.delete('/:id', protect, requireAdmin, validateRequest(idParamSchema), deleteAllergen)

export default router
