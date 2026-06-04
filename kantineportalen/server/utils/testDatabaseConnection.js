import dotenv from 'dotenv'

import { connectDatabase, disconnectDatabase } from '../config/database.js'

dotenv.config()

try {
  await connectDatabase()
  console.log('Databaseforbindelse testet og fungerer')
  await disconnectDatabase()
  process.exit(0)
} catch (error) {
  console.error('Databaseforbindelse feilet:', error.message)
  process.exit(1)
}
