import dotenv from 'dotenv'

import app from './app.js'
import { connectDatabase } from './config/database.js'

dotenv.config()

const port = process.env.PORT || 5001

try {
  await connectDatabase()

  app.listen(port, () => {
    console.log(`[Server] Kantineportalen API kjører på http://localhost:${port}`)
  })
} catch (error) {
  console.error('[Server] Kunne ikke starte:', error.message)
  process.exit(1)
}
