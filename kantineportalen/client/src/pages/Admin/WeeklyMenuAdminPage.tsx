import { Info, Plus, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/auth/AuthContext'
import { getDishes, getMenu, updateMenu, type ApiDish, type ApiWeeklyMenu, type MenuPayload } from '@/services/adminService'
import { getAssetUrl, isUnauthorizedError } from '@/services/api'

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

const createDishOption = '__create-dish__'

type PickerPosition = {
  left: number
  top: number
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
  const navigate = useNavigate()
  const [dishes, setDishes] = useState<ApiDish[]>([])
  const [form, setForm] = useState<Required<MenuPayload>>(emptyMenuForm)
  const [openDay, setOpenDay] = useState<keyof MenuPayload | null>(null)
  const [pickerPosition, setPickerPosition] = useState<PickerPosition>({ left: 16, top: 16 })
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

  useEffect(() => {
    if (!openDay) {
      return undefined
    }

    function closePickerOnOutsideClick(event: PointerEvent) {
      const target = event.target as HTMLElement | null

      if (target?.closest('.weekly-menu-picker, .weekly-menu-slot')) {
        return
      }

      setOpenDay(null)
    }

    document.addEventListener('pointerdown', closePickerOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closePickerOnOutsideClick)
  }, [openDay])

  async function updateDay(day: keyof MenuPayload, dishId: string) {
    if (dishId === createDishOption) {
      setOpenDay(null)
      navigate('/admin/retter')
      return
    }

    if (!token) {
      logout()
      return
    }

    const previousForm = form
    const nextForm = { ...form, [day]: dishId || null }
    setOpenDay(null)
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

  function togglePicker(day: keyof MenuPayload, event: MouseEvent<HTMLButtonElement>) {
    if (openDay === day) {
      setOpenDay(null)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const margin = 16
    const pickerWidth = Math.min(340, window.innerWidth - margin * 2)
    const pickerHeight = Math.min(430, window.innerHeight - margin * 2)

    setPickerPosition({
      left: Math.min(Math.max(rect.left, margin), window.innerWidth - pickerWidth - margin),
      top: Math.min(Math.max(rect.top, margin), window.innerHeight - pickerHeight - margin),
    })
    setOpenDay(day)
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
              <div className="weekly-menu-slot-wrap">
                <button
                  aria-label={`Velg rett for ${day.label.toLowerCase()}`}
                  aria-expanded={openDay === day.key}
                  className={selectedDish ? 'weekly-menu-slot has-dish' : 'weekly-menu-slot'}
                  disabled={isLoading || Boolean(savingDay)}
                  onClick={(event) => togglePicker(day.key, event)}
                  type="button"
                >
                  {selectedDish ? (
                    <>
                    {selectedDish.image ? (
                      <img
                        alt={`Forhåndsvisning av ${selectedDish.name}`}
                        className="weekly-menu-dish-image"
                        src={getAssetUrl(selectedDish.image)}
                      />
                    ) : (
                      <span className="weekly-menu-dish-icon">
                        <UtensilsCrossed aria-hidden="true" size={18} strokeWidth={1.8} />
                      </span>
                    )}
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
                </button>

                {openDay === day.key ? (
                  <div
                    aria-label={`Retter for ${day.label.toLowerCase()}`}
                    className="weekly-menu-picker"
                    style={{ left: pickerPosition.left, top: pickerPosition.top }}
                  >
                    <div className="weekly-menu-picker-list">
                      <button
                        className={!form[day.key] ? 'is-selected' : ''}
                        onClick={() => void updateDay(day.key, '')}
                        type="button"
                      >
                        Ingen rett valgt
                      </button>
                      {dishes.map((dish) => (
                        <button
                          className={form[day.key] === dish._id ? 'is-selected' : ''}
                          key={dish._id}
                          onClick={() => void updateDay(day.key, dish._id)}
                          type="button"
                        >
                          {dish.name}
                        </button>
                      ))}
                    </div>
                    <button
                      className="weekly-menu-picker-create"
                      onClick={() => void updateDay(day.key, createDishOption)}
                      type="button"
                    >
                      <Plus aria-hidden="true" size={17} />
                      Opprett ny rett
                    </button>
                  </div>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
