import express from 'express'
import { getMenu, updateMenu } from '../controllers/menuController.js'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { menuUpdateSchema } from '../validators/schemas.js'

const router = express.Router()

router.get('/', getMenu)
router.put('/', protect, requireAdmin, validateRequest(menuUpdateSchema), updateMenu)

export default router
