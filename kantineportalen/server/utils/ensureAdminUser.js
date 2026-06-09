import dotenv from 'dotenv'

import { connectDatabase, disconnectDatabase } from '../config/database.js'
import { User } from '../models/User.js'


dotenv.config()

function requireEnv(name) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(`${name} må settes i .env før adminbruker kan opprettes`)
  }

  return value
}

try {
  const username = requireEnv('SEED_ADMIN_USERNAME').toLowerCase()
  const password = requireEnv('SEED_ADMIN_PASSWORD')

  if (password.length < 12) {
    throw new Error('SEED_ADMIN_PASSWORD må være minst 12 tegn')
  }

  await connectDatabase()

  const existingAdmin = await User.findOne({ username })

  if (!existingAdmin) {
    await User.create({ username, password, role: 'admin' })
    console.log(`[Admin] Adminbruker opprettet i MongoDB: ${username}`)
  } else if (existingAdmin.role !== 'admin') {
    existingAdmin.role = 'admin'
    await existingAdmin.save()
    console.log(`[Admin] Eksisterende bruker fikk adminrolle: ${username}`)
  } else {
    console.log(`[Admin] Adminbruker finnes allerede i MongoDB: ${username}`)
  }

  await disconnectDatabase()
  process.exit(0)
} catch (error) {
  console.error('[Admin] Feilet:', error.message)
  await disconnectDatabase().catch(() => {})
  process.exit(1)
}
