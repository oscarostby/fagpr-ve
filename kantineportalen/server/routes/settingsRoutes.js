import express from 'express'

import { getTokenExpiration, updateTokenExpiration } from '../controllers/settingsController.js'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { tokenExpirationSchema } from '../validators/schemas.js'

const router = express.Router()

router.use(protect, requireAdmin)
router.get('/token-expiration', getTokenExpiration)
router.put('/token-expiration', validateRequest(tokenExpirationSchema), updateTokenExpiration)

export default router
