import mongoose from 'mongoose'

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI mangler i .env')
  }

  mongoose.set('strictQuery', true)

  const connection = await mongoose.connect(mongoUri)
  console.log(`MongoDB tilkoblet: ${connection.connection.host}/${connection.connection.name}`)

  return connection
}

export async function disconnectDatabase() {
  await mongoose.disconnect()
}
