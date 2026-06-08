import express from 'express'
import { login } from '../controllers/authController.js'
import { loginLimiter } from '../middleware/rateLimitMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { loginSchema } from '../validators/schemas.js'

const router = express.Router()

router.post('/login', loginLimiter, validateRequest(loginSchema), login)

export default router
