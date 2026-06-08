import { useEffect, useState, type FormEvent } from 'react'

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

function findDishName(dishes: ApiDish[], id: string | null) {
  if (!id) {
    return 'Ingen rett valgt'
  }

  return dishes.find((dish) => dish._id === id)?.name || 'Ukjent rett'
}

export function WeeklyMenuAdminPage() {
  const { token, logout } = useAuth()
  const [dishes, setDishes] = useState<ApiDish[]>([])
  const [form, setForm] = useState<Required<MenuPayload>>(emptyMenuForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
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

  useEffect(() => {
    void loadData()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) {
      logout()
      return
    }

    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const savedMenu = await updateMenu(form, token)
      setForm(menuToForm(savedMenu))
      setSuccess('Ukemeny lagret')
    } catch (saveError) {
      handleError(saveError)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section>
      <h2 className="text-lg font-bold">Hjem - ukemeny</h2>
      <p className="mt-1 text-sm">Velg, endre eller fjern rett for hver ukedag.</p>
      {isLoading ? <p className="my-2">Laster ukemeny...</p> : null}
      {error ? <p className="my-2 text-sm text-red-700">{error}</p> : null}
      {success ? <p className="my-2 text-sm text-green-700">{success}</p> : null}

      <form className="my-4 grid max-w-xl gap-3 border p-3" onSubmit={handleSubmit}>
        {days.map((day) => (
          <div className="grid gap-1 border p-2" key={day.key}>
            <label className="grid gap-1 text-sm">
              <span className="font-bold">{day.label}</span>
              <span>Valgt rett: {findDishName(dishes, form[day.key])}</span>
              <select
                className="border px-2 py-2"
                onChange={(event) => setForm({ ...form, [day.key]: event.target.value || null })}
                value={form[day.key] || ''}
              >
                <option value="">Ingen rett valgt</option>
                {dishes.map((dish) => (
                  <option key={dish._id} value={dish._id}>
                    {dish.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="w-fit border px-3 py-1 text-sm"
              onClick={() => setForm({ ...form, [day.key]: null })}
              type="button"
            >
              Fjern rett fra {day.label.toLowerCase()}
            </button>
          </div>
        ))}
        <button className="border px-3 py-2" disabled={isSaving} type="submit">
          {isSaving ? 'Lagrer...' : 'Lagre ukemeny'}
        </button>
      </form>
    </section>
  )
}
