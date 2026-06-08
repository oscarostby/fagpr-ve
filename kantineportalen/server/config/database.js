import mongoose from 'mongoose'

export async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGO_URI eller MONGODB_URI mangler i .env')
  }

  mongoose.connection.on('error', (error) => {
    console.error('[MongoDB] Tilkoblingsfeil:', error.message)
  })

  const connection = await mongoose.connect(mongoUri)
  const { host, name } = connection.connection
  console.log(`[MongoDB] Tilkoblet ${host}/${name}`)

  return connection
}

export async function disconnectDatabase() {
  await mongoose.disconnect()
  console.log('[MongoDB] Koblet fra')
}
