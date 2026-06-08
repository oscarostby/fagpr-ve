import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import multer from 'multer'

export const dishUploadDir = path.resolve(process.cwd(), 'server/uploads/dishes')

const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

fs.mkdirSync(dishUploadDir, { recursive: true })

function safeBaseName(originalName) {
  const parsedName = path.parse(originalName).name
  return parsedName
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, dishUploadDir)
  },
  filename(_req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase()
    const uniquePart = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`
    const baseName = safeBaseName(file.originalname) || 'rett'
    callback(null, `${uniquePart}-${baseName}${extension}`)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(_req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase()

    if (!allowedExtensions.has(extension) || !allowedMimeTypes.has(file.mimetype)) {
      callback(new Error('Ugyldig filtype. Kun jpg, jpeg, png og webp er tillatt.'))
      return
    }

    callback(null, true)
  },
})

export function uploadDishImage(req, res, next) {
  upload.single('image')(req, res, (error) => {
    if (!error) {
      next()
      return
    }

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ message: 'Bildet er for stort. Maks størrelse er 5 MB.' })
      return
    }

    res.status(400).json({ message: error.message || 'Kunne ikke laste opp bilde.' })
  })
}
