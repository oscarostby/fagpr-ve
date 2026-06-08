import { useEffect, useState, type FormEvent } from 'react'

import { useAuth } from '@/auth/AuthContext'
import {
  createAllergen,
  deleteAllergen,
  getAllergens,
  updateAllergen,
  type ApiAllergen,
} from '@/services/adminService'
import { isUnauthorizedError } from '@/services/api'

export function AllergensPage() {
  const { token, logout } = useAuth()
  const [allergens, setAllergens] = useState<ApiAllergen[]>([])
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  function handleError(apiError: unknown) {
    if (isUnauthorizedError(apiError)) {
      logout()
      setError('Sesjonen er ugyldig. Logg inn på nytt.')
      return
    }

    setError(apiError instanceof Error ? apiError.message : 'API-feil')
  }

  async function loadAllergens() {
    setIsLoading(true)
    setError('')
    try {
      setAllergens(await getAllergens())
    } catch (loadError) {
      handleError(loadError)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadAllergens()
  }, [])

  function resetForm() {
    setEditingId(null)
    setName('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) {
      logout()
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const payload = { name: name.trim() }
      if (editingId) {
        await updateAllergen(editingId, payload, token)
      } else {
        await createAllergen(payload, token)
      }
      resetForm()
      await loadAllergens()
    } catch (saveError) {
      handleError(saveError)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!token) {
      logout()
      return
    }

    setError('')
    try {
      await deleteAllergen(id, token)
      await loadAllergens()
    } catch (deleteError) {
      handleError(deleteError)
    }
  }

  return (
    <section>
      <h2 className="text-lg font-bold">Allergier</h2>
      {error ? <p className="my-2 text-sm text-red-700">{error}</p> : null}

      <form className="my-4 flex max-w-xl flex-wrap gap-2 border p-3" onSubmit={handleSubmit}>
        <label className="grid flex-1 gap-1 text-sm">
          Navn
          <input
            className="border px-2 py-2"
            onChange={(event) => setName(event.target.value)}
            required
            value={name}
          />
        </label>
        <button className="self-end border px-3 py-2" disabled={isSaving} type="submit">
          {isSaving ? 'Lagrer...' : editingId ? 'Lagre endring' : 'Opprett allergi'}
        </button>
        {editingId ? (
          <button className="self-end border px-3 py-2" onClick={resetForm} type="button">
            Avbryt
          </button>
        ) : null}
      </form>

      {isLoading ? <p>Laster allergier...</p> : null}
      <ul className="grid gap-2">
        {allergens.map((allergen) => (
          <li className="flex flex-wrap items-center justify-between gap-2 border p-3" key={allergen._id}>
            <span>{allergen.name}</span>
            <span className="flex gap-2">
              <button
                className="border px-3 py-1 text-sm"
                onClick={() => {
                  setEditingId(allergen._id)
                  setName(allergen.name)
                }}
                type="button"
              >
                Rediger
              </button>
              <button className="border px-3 py-1 text-sm" onClick={() => void handleDelete(allergen._id)} type="button">
                Slett
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
