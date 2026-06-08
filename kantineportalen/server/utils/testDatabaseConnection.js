import dotenv from 'dotenv'

import { connectDatabase, disconnectDatabase } from '../config/database.js'

dotenv.config()

try {
  await connectDatabase()
  console.log('[Test] Databaseforbindelse OK')
  await disconnectDatabase()
  process.exit(0)
} catch (error) {
  console.error('[Test] Databaseforbindelse feilet:', error.message)
  process.exit(1)
}
