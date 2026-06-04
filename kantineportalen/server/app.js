import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import allergenRoutes from './routes/allergenRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dishRoutes from './routes/dishRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: corsOrigin }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Kantineportalen API kjører',
    environment: process.env.NODE_ENV || 'development',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/dishes', dishRoutes)
app.use('/api/allergens', allergenRoutes)
app.use('/api/menu', menuRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
