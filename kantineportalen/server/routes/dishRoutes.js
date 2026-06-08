import express from 'express'
import {
  createDish,
  deleteDish,
  getDish,
  getDishes,
  updateDish,
} from '../controllers/dishController.js'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'
import { uploadDishImage } from '../middleware/dishImageUpload.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { idParamSchema } from '../validators/schemas.js'

const router = express.Router()

router.get('/', getDishes)
router.get('/:id', validateRequest(idParamSchema), getDish)
router.post('/', protect, requireAdmin, uploadDishImage, createDish)
router.put('/:id', protect, requireAdmin, validateRequest(idParamSchema), uploadDishImage, updateDish)
router.delete('/:id', protect, requireAdmin, validateRequest(idParamSchema), deleteDish)

export default router
