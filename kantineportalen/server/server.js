import dotenv from 'dotenv'

import app from './app.js'
import { connectDatabase } from './config/database.js'

dotenv.config()

const port = process.env.PORT || 5000

async function startServer() {
  try {
    await connectDatabase()

    app.listen(port, () => {
      console.log(`Server kjører på http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Kunne ikke starte serveren:', error.message)
    process.exit(1)
  }
}

startServer()
