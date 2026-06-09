import { Info, Plus, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useAuth } from '@/auth/AuthContext'
import { getDishes, getMenu, updateMenu, type ApiDish, type ApiWeeklyMenu, type MenuPayload } from '@/services/adminService'
import { isUnauthorizedError } from '@/services/api'

const days: Array<{ key: keyof MenuPayload; label: string }> = [
  { key: 'monday', label: 'Mandag' },
  { key: 'tuesday', label: 'Tirsdag' },
  { key: 'wednesday', label: 'Onsdag' },
  { key: 'thursday', label: 'Torsdag' },
  { key: 'friday', label: 'Fredag' },
]

const emptyMenuForm: Required<MenuPayload> = {
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
}

function menuToForm(menu: ApiWeeklyMenu): Required<MenuPayload> {
  return {
    monday: menu.monday?._id || null,
    tuesday: menu.tuesday?._id || null,
    wednesday: menu.wednesday?._id || null,
    thursday: menu.thursday?._id || null,
    friday: menu.friday?._id || null,
  }
}

function findDish(dishes: ApiDish[], id: string | null) {
  return dishes.find((dish) => dish._id === id) || null
}

export function WeeklyMenuAdminPage() {
  const { token, logout } = useAuth()
  const [dishes, setDishes] = useState<ApiDish[]>([])
  const [form, setForm] = useState<Required<MenuPayload>>(emptyMenuForm)
  const [isLoading, setIsLoading] = useState(true)
  const [savingDay, setSavingDay] = useState<keyof MenuPayload | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleError(apiError: unknown) {
    if (isUnauthorizedError(apiError)) {
      logout()
      setError('Sesjonen er ugyldig. Logg inn på nytt.')
      return
    }

    setError(apiError instanceof Error ? apiError.message : 'API-feil')
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      setError('')
      try {
        const [dishData, menuData] = await Promise.all([getDishes(), getMenu()])
        setDishes(dishData)
        setForm(menuToForm(menuData))
      } catch (loadError) {
        handleError(loadError)
      } finally {
        setIsLoading(false)
      }
    }

    void loadData()
  }, [])

  async function updateDay(day: keyof MenuPayload, dishId: string) {
    if (!token) {
      logout()
      return
    }

    const previousForm = form
    const nextForm = { ...form, [day]: dishId || null }
    setForm(nextForm)
    setSavingDay(day)
    setError('')
    setSuccess('')

    try {
      const savedMenu = await updateMenu(nextForm, token)
      setForm(menuToForm(savedMenu))
      setSuccess('Ukemenyen ble oppdatert')
    } catch (saveError) {
      setForm(previousForm)
      handleError(saveError)
    } finally {
      setSavingDay(null)
    }
  }

  return (
    <section className="weekly-menu-admin">
      <header className="weekly-menu-heading">
        <h1>Ukemeny</h1>
        <p>Administrer ukens meny</p>
      </header>

      <div className="weekly-menu-info">
        <Info aria-hidden="true" size={23} strokeWidth={1.8} />
        <div>
          <strong>Automatisk sletting</strong>
          <p>Retter som legges til i ukemenyen vil automatisk fjernes på søndag kl. 23:59.</p>
        </div>
      </div>

      {error ? (
        <p className="weekly-menu-message is-error" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p aria-live="polite" className="weekly-menu-message">
          {success}
        </p>
      ) : null}

      <div className="weekly-menu-grid" aria-busy={isLoading}>
        {days.map((day) => {
          const selectedDish = findDish(dishes, form[day.key])
          const isSaving = savingDay === day.key

          return (
            <article className="weekly-menu-day" key={day.key}>
              <h2>{day.label}</h2>
              <label className={selectedDish ? 'weekly-menu-slot has-dish' : 'weekly-menu-slot'}>
                <select
                  aria-label={`Velg rett for ${day.label.toLowerCase()}`}
                  disabled={isLoading || Boolean(savingDay)}
                  onChange={(event) => void updateDay(day.key, event.target.value)}
                  value={form[day.key] || ''}
                >
                  <option value="">Ingen rett valgt</option>
                  {dishes.map((dish) => (
                    <option key={dish._id} value={dish._id}>
                      {dish.name}
                    </option>
                  ))}
                </select>

                {selectedDish ? (
                  <>
                    <span className="weekly-menu-dish-icon">
                      <UtensilsCrossed aria-hidden="true" size={18} strokeWidth={1.8} />
                    </span>
                    <strong>{selectedDish.name}</strong>
                    <span className="weekly-menu-change">{isSaving ? 'Lagrer...' : 'Endre matrett'}</span>
                  </>
                ) : (
                  <>
                    <span className="weekly-menu-plus">
                      <Plus aria-hidden="true" size={22} strokeWidth={2} />
                    </span>
                    <strong>{isSaving ? 'Lagrer...' : 'Legg til matrett'}</strong>
                  </>
                )}
              </label>
            </article>
          )
        })}
      </div>
    </section>
  )
}
