import path from 'node:path'

import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'

import { swaggerSpec, swaggerUiMiddleware } from './config/swagger.js'
import allergenRoutes from './routes/allergenRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dishRoutes from './routes/dishRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

// Ensure upload directory exists when app starts.
import './middleware/dishImageUpload.js'

dotenv.config()

const app = express()
const configuredCorsOrigins = [process.env.CORS_ORIGIN, process.env.CLIENT_URL].filter(Boolean)
const allowedCorsOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...configuredCorsOrigins,
])

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'upgrade-insecure-requests': null,
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedCorsOrigins.has(origin)) {
        callback(null, true)
        return
      }

      callback(new Error(`CORS blokkert for origin: ${origin}`))
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '50kb' }))
app.use(express.urlencoded({ extended: true, limit: '50kb' }))
app.use('/uploads', express.static(path.resolve(process.cwd(), 'server/uploads')))

app.get('/api', (_req, res) => {
  res.redirect(302, '/api/docs/')
})
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})
app.get('/api/openapi.json', (_req, res) => {
  res.json(swaggerSpec)
})
app.get('/api/swagger', (_req, res) => {
  res.redirect(302, '/api/docs/')
})
app.get('/api/swagger.json', (_req, res) => {
  res.json(swaggerSpec)
})
app.use('/api/docs', swaggerUiMiddleware.serve, swaggerUiMiddleware.setup(swaggerSpec, {
  customSiteTitle: 'Kantineportalen API docs',
  swaggerOptions: {
    persistAuthorization: true,
  },
}))

app.use('/api/auth', authRoutes)
app.use('/api/dishes', dishRoutes)
app.use('/api/allergens', allergenRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/settings', settingsRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
