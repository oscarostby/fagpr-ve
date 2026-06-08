import fs from 'node:fs/promises'
import path from 'node:path'

import { dishUploadDir } from '../middleware/dishImageUpload.js'

export function uploadedDishImagePath(file) {
  if (!file?.filename) {
    return ''
  }

  return `/uploads/dishes/${file.filename}`
}

export async function deleteDishImage(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') {
    return
  }

  if (!imagePath.startsWith('/uploads/dishes/')) {
    return
  }

  const fileName = path.basename(imagePath)
  const absolutePath = path.resolve(dishUploadDir, fileName)

  if (!absolutePath.startsWith(`${dishUploadDir}${path.sep}`)) {
    return
  }

  try {
    await fs.unlink(absolutePath)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }
}
