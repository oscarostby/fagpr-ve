import { WeeklyMenu } from '../models/WeeklyMenu.js'

const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

function populateMenu(query) {
  return query.populate({
    path: dayNames.join(' '),
    populate: { path: 'allergens', select: 'name' },
  })
}

export async function getMenu(_req, res, next) {
  try {
    let menu = await populateMenu(WeeklyMenu.findOne().sort({ updatedAt: -1 }))

    if (!menu) {
      menu = await WeeklyMenu.create({})
      menu = await populateMenu(WeeklyMenu.findById(menu._id))
    }

    res.json(menu)
  } catch (error) {
    next(error)
  }
}

export async function updateMenu(req, res, next) {
  try {
    const payload = dayNames.reduce((acc, day) => {
      if (Object.prototype.hasOwnProperty.call(req.body, day)) {
        acc[day] = req.body[day] || null
      }
      return acc
    }, {})

    let menu = await WeeklyMenu.findOne().sort({ updatedAt: -1 })

    if (!menu) {
      menu = await WeeklyMenu.create(payload)
    } else {
      Object.assign(menu, payload)
      await menu.save()
    }

    const populatedMenu = await populateMenu(WeeklyMenu.findById(menu._id))
    res.json(populatedMenu)
  } catch (error) {
    next(error)
  }
}
