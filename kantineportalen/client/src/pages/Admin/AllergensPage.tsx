import { useEffect, useState, type FormEvent } from 'react'
import { Pencil, ShieldCheck, Trash2, X } from 'lucide-react'

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
    <section className="allergens-admin">
      <header className="admin-page-heading">
        <div>
          <h1>Allergier</h1>
          <p>Administrer allergener som kan knyttes til matrettene</p>
        </div>
      </header>

      {error ? (
        <p className="admin-alert is-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="allergens-admin-layout">
        <form className="allergen-editor" onSubmit={handleSubmit}>
          <div className="dish-editor-heading">
            <div>
              <span className="admin-eyebrow">{editingId ? 'Redigering' : 'Ny allergi'}</span>
              <h2>{editingId ? 'Rediger allergi' : 'Opprett allergi'}</h2>
            </div>
            {editingId ? (
              <button aria-label="Avbryt redigering" className="admin-icon-button" onClick={resetForm} type="button">
                <X aria-hidden="true" size={18} />
              </button>
            ) : null}
          </div>

          <div className="allergen-editor-icon">
            <ShieldCheck aria-hidden="true" size={28} />
          </div>

          <label className="admin-field">
            <span>Navn på allergien</span>
          <input
            onChange={(event) => setName(event.target.value)}
            placeholder="For eksempel gluten eller melk"
            required
            value={name}
          />
        </label>

          <p className="allergen-editor-help">
            Allergien blir tilgjengelig som et valg når du oppretter eller redigerer en matrett.
          </p>

          <div className="dish-editor-actions">
            <button className="admin-primary-button" disabled={isSaving} type="submit">
              {isSaving ? 'Lagrer...' : editingId ? 'Lagre endring' : 'Opprett allergi'}
          </button>
            {editingId ? (
              <button className="admin-secondary-button" onClick={resetForm} type="button">
                Avbryt
              </button>
            ) : null}
          </div>
        </form>

        <div className="allergen-library">
          <div className="dish-library-heading">
            <div>
              <span className="admin-eyebrow">Allergibibliotek</span>
              <h2>Registrerte allergier</h2>
            </div>
            <span className="dish-count">{allergens.length} allergier</span>
          </div>

          {isLoading ? <p className="admin-empty-state">Laster allergier...</p> : null}
          {!isLoading && allergens.length === 0 ? (
            <p className="admin-empty-state">Ingen allergier er registrert ennå.</p>
          ) : null}

          <ul className="allergen-card-grid">
        {allergens.map((allergen) => (
              <li className="allergen-card" key={allergen._id}>
                <div className="allergen-card-icon">
                  <ShieldCheck aria-hidden="true" size={21} />
                </div>
                <div className="allergen-card-content">
                  <h3>{allergen.name}</h3>
                  <p>Kan legges til på relevante matretter.</p>
                </div>
                <div className="allergen-card-actions">
                  <button
                    aria-label={`Rediger ${allergen.name}`}
                    className="admin-icon-button"
                    onClick={() => {
                      setEditingId(allergen._id)
                      setName(allergen.name)
                    }}
                    type="button"
                  >
                    <Pencil aria-hidden="true" size={16} />
                  </button>
                  <button
                    aria-label={`Slett ${allergen.name}`}
                    className="admin-icon-button is-danger"
                    onClick={() => void handleDelete(allergen._id)}
                    type="button"
                  >
                    <Trash2 aria-hidden="true" size={16} />
                  </button>
                </div>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </section>
  )
}
