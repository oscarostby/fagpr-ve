import fs from 'node:fs/promises'
import path from 'node:path'

import dotenv from 'dotenv'

import { connectDatabase, disconnectDatabase } from '../config/database.js'
import { Allergen } from '../models/Allergen.js'
import { Dish } from '../models/Dish.js'
import { User } from '../models/User.js'
import { WeeklyMenu } from '../models/WeeklyMenu.js'
import { defaultTokenExpiresInSeconds, ensureTokenExpiresInSecondsDefault } from './tokenSettings.js'


dotenv.config()

const allergenNames = ['Gluten', 'Melk', 'Egg', 'Fisk', 'Skalldyr', 'Nøtter']
const uploadDir = path.resolve(process.cwd(), 'server/uploads/dishes')
const sourceSeedImage = path.resolve(process.cwd(), 'client/src/assets/images/lasagne-salat.png')

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function ensureSeedImage(name) {
  await fs.mkdir(uploadDir, { recursive: true })
  const fileName = `seed-${slugify(name)}.png`
  const targetPath = path.join(uploadDir, fileName)

  try {
    await fs.access(targetPath)
  } catch {
    await fs.copyFile(sourceSeedImage, targetPath)
  }

  return `/uploads/dishes/${fileName}`
}

const dishSeeds = [
  {
    name: 'Lasagne med salat',
    description: 'Hjemmelaget lasagne servert med frisk salat.',
    allergens: ['Gluten', 'Melk', 'Egg'],
  },
  {
    name: 'Kyllingwok med ris',
    description: 'Kyllingwok med grønnsaker og ris.',
    allergens: [],
  },
  {
    name: 'Fisk med poteter',
    description: 'Fisk servert med kokte poteter og grønnsaker.',
    allergens: ['Fisk', 'Melk'],
  },
  {
    name: 'Pastasalat med skinke',
    description: 'Kald pastasalat med skinke og grønnsaker.',
    allergens: ['Gluten', 'Melk', 'Egg'],
  },
  {
    name: 'Pizza',
    description: 'Pizza med ost og tomatsaus.',
    allergens: ['Gluten', 'Melk'],
  },
]

try {
  await connectDatabase()

  const allergenDocs = {}
  for (const name of allergenNames) {
    const allergen = await Allergen.findOneAndUpdate(
      { name },
      { name },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
    allergenDocs[name] = allergen
  }

  const dishDocs = {}
  for (const seed of dishSeeds) {
    const image = await ensureSeedImage(seed.name)
    const dish = await Dish.findOneAndUpdate(
      { name: seed.name },
      {
        name: seed.name,
        description: seed.description,
        image,
        allergens: seed.allergens.map((name) => allergenDocs[name]._id),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
    )
    dishDocs[seed.name] = dish
  }

  const fallbackImage = await ensureSeedImage('standard-rett')
  const migrationResult = await Dish.updateMany(
    { $or: [{ image: '' }, { image: { $exists: false } }, { image: null }] },
    { $set: { image: fallbackImage } },
    { runValidators: true },
  )

  await WeeklyMenu.findOneAndUpdate(
    {},
    {
      monday: dishDocs['Lasagne med salat']._id,
      tuesday: dishDocs['Kyllingwok med ris']._id,
      wednesday: dishDocs['Fisk med poteter']._id,
      thursday: dishDocs['Pastasalat med skinke']._id,
      friday: dishDocs.Pizza._id,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  )

  const tokenExpiresInSeconds = process.env.SEED_TOKEN_EXPIRES_IN_SECONDS ?? defaultTokenExpiresInSeconds
  const tokenExpirationSetting = await ensureTokenExpiresInSecondsDefault(tokenExpiresInSeconds)
  console.log(
    tokenExpirationSetting.created
      ? `[Seed] Token-utløp opprettet i MongoDB: ${tokenExpiresInSeconds} sekunder`
      : `[Seed] Token-utløp finnes allerede i MongoDB og ble ikke overskrevet: ${tokenExpirationSetting.expiresInSeconds} sekunder`,
  )

  const adminUsername = process.env.SEED_ADMIN_USERNAME?.trim()
  const adminPassword = process.env.SEED_ADMIN_PASSWORD?.trim()

  if (adminUsername || adminPassword) {
    if (!adminUsername || !adminPassword) {
      throw new Error('Både SEED_ADMIN_USERNAME og SEED_ADMIN_PASSWORD må settes for å opprette adminbruker')
    }

    if (adminPassword.length < 12) {
      throw new Error('SEED_ADMIN_PASSWORD må være minst 12 tegn')
    }

    const existingAdmin = await User.findOne({ username: adminUsername.toLowerCase() })

    if (!existingAdmin) {
      await User.create({ username: adminUsername, password: adminPassword, role: 'admin' })
      console.log(`[Seed] Adminbruker opprettet i MongoDB: ${adminUsername.toLowerCase()}`)
    } else if (existingAdmin.role !== 'admin') {
      throw new Error(`Seed-bruker ${adminUsername.toLowerCase()} finnes, men har ikke adminrolle`)
    } else {
      console.log(`[Seed] Adminbruker finnes allerede i MongoDB: ${adminUsername.toLowerCase()}`)
    }
  } else {
    console.log('[Seed] Hopper over adminbruker fordi SEED_ADMIN_USERNAME/SEED_ADMIN_PASSWORD ikke er satt')
  }

  console.log(`[Seed] Allergener, retter og ukemeny er klare. Migrerte retter uten bilde: ${migrationResult.modifiedCount}`)
  await disconnectDatabase()
  process.exit(0)
} catch (error) {
  console.error('[Seed] Feilet:', error.message)
  process.exit(1)
}
