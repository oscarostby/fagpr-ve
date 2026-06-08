import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'

import { useAuth } from '@/auth/AuthContext'
import {
  createDish,
  deleteDish,
  getAllergens,
  getDishes,
  updateDish,
  type ApiAllergen,
  type ApiDish,
  type DishPayload,
} from '@/services/adminService'
import { getAssetUrl, isUnauthorizedError } from '@/services/api'

type DishFormState = {
  name: string
  description: string
  imageFile: File | null
  allergens: string[]
}

const emptyForm: DishFormState = {
  name: '',
  description: '',
  imageFile: null,
  allergens: [],
}

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'webp']
const maxImageSize = 5 * 1024 * 1024

function toForm(dish: ApiDish): DishFormState {
  return {
    name: dish.name || '',
    description: dish.description || '',
    imageFile: null,
    allergens: dish.allergens?.map((allergen) => allergen._id) || [],
  }
}

function toPayload(form: DishFormState): DishPayload {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    imageFile: form.imageFile,
    allergens: form.allergens,
  }
}

function fileExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() || ''
}

function formatFileSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function DishesPage() {
  const { token, logout } = useAuth()
  const [dishes, setDishes] = useState<ApiDish[]>([])
  const [allergens, setAllergens] = useState<ApiAllergen[]>([])
  const [form, setForm] = useState<DishFormState>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editingDish = dishes.find((dish) => dish._id === editingId) || null
  const existingImageUrl = editingDish?.image ? getAssetUrl(editingDish.image) : ''
  const savedImagePreviewUrl = previewUrl || existingImageUrl
  const selectedFileName = form.imageFile?.name || ''
  const imageStatus = form.imageFile
    ? 'Neste lagring bruker nytt valgt bilde.'
    : editingDish?.image
      ? 'Neste lagring beholder eksisterende bilde hvis du ikke velger et nytt.'
      : 'Velg bilde før retten lagres.'

  async function loadData() {
    setIsLoading(true)
    setError('')
    try {
      const [dishData, allergenData] = await Promise.all([getDishes(), getAllergens()])
      setDishes(dishData)
      setAllergens(allergenData)
    } catch (loadError) {
      handleError(loadError)
    } finally {
      setIsLoading(false)
    }
  }

  function handleError(apiError: unknown) {
    if (isUnauthorizedError(apiError)) {
      logout()
      setError('Sesjonen er ugyldig. Logg inn på nytt.')
      return
    }

    setError(apiError instanceof Error ? apiError.message : 'API-feil')
  }

  useEffect(() => {
    void loadData()
  }, [])

  useEffect(() => {
    if (!form.imageFile) {
      setPreviewUrl('')
      return undefined
    }

    const objectUrl = URL.createObjectURL(form.imageFile)
    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [form.imageFile])

  function resetFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
    setImageError('')
    resetFileInput()
  }

  function clearSelectedImage() {
    setForm((current) => ({ ...current, imageFile: null }))
    setImageError('')
    resetFileInput()
  }

  function validateImageFile(file: File) {
    const extension = fileExtension(file.name)

    if (!allowedImageTypes.has(file.type) || !allowedImageExtensions.includes(extension)) {
      return 'Ugyldig filtype. Kun jpg, jpeg, png og webp er tillatt.'
    }

    if (file.size > maxImageSize) {
      return 'Bildet er for stort. Maks størrelse er 5 MB.'
    }

    return ''
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null

    if (!file) {
      clearSelectedImage()
      return
    }

    const validationMessage = validateImageFile(file)
    if (validationMessage) {
      setForm((current) => ({ ...current, imageFile: null }))
      setImageError(validationMessage)
      resetFileInput()
      return
    }

    setImageError('')
    setForm((current) => ({ ...current, imageFile: file }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) {
      logout()
      return
    }

    if (imageError) {
      setError('Rett opp bildefeilen før du lagrer retten.')
      return
    }

    if (!editingId && !form.imageFile) {
      setError('Bilde er påkrevd. Velg et bilde før du oppretter retten.')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const payload = toPayload(form)
      if (editingId) {
        await updateDish(editingId, payload, token)
      } else {
        await createDish(payload, token)
      }
      resetForm()
      await loadData()
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
      await deleteDish(id, token)
      await loadData()
      if (editingId === id) {
        resetForm()
      }
    } catch (deleteError) {
      handleError(deleteError)
    }
  }

  function startEdit(dish: ApiDish) {
    setEditingId(dish._id)
    setForm(toForm(dish))
    setImageError('')
    resetFileInput()
  }

  function toggleAllergen(allergenId: string) {
    setForm((current) => ({
      ...current,
      allergens: current.allergens.includes(allergenId)
        ? current.allergens.filter((id) => id !== allergenId)
        : [...current.allergens, allergenId],
    }))
  }

  return (
    <section>
      <h2 className="text-lg font-bold">Retter</h2>
      {error ? <p className="my-2 text-sm text-red-700">{error}</p> : null}

      <form className="my-4 grid max-w-xl gap-3 border p-3" encType="multipart/form-data" onSubmit={handleSubmit}>
        <h3 className="font-bold">{editingId ? 'Rediger rett' : 'Opprett rett'}</h3>
        <label className="grid gap-1 text-sm">
          Navn
          <input
            className="border px-2 py-2"
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
            value={form.name}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Beskrivelse
          <textarea
            className="border px-2 py-2"
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            value={form.description}
          />
        </label>

        <div className="grid gap-2 border p-3 text-sm">
          <label className="grid gap-1">
            Bilde
            <span className="text-xs text-slate-600">Tillatt: jpg, jpeg, png, webp. Maks 5 MB.</span>
            <input
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              className="border px-2 py-2"
              onChange={handleImageChange}
              ref={fileInputRef}
              required={!editingId}
              type="file"
            />
          </label>

          {imageError ? <p className="text-sm font-semibold text-red-700">{imageError}</p> : null}

          <div className="grid gap-1 text-xs text-slate-700">
            <p>
              <strong>Valgt fil:</strong> {selectedFileName || 'Ingen ny fil valgt'}
              {form.imageFile ? ` (${formatFileSize(form.imageFile.size)})` : ''}
            </p>
            {editingDish?.image ? (
              <p className="break-all">
                <strong>Eksisterende bilde:</strong> {editingDish.image}
              </p>
            ) : null}
            <p>
              <strong>Status:</strong> {imageStatus}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {existingImageUrl ? (
              <div className="grid gap-1">
                <p className="text-xs font-bold uppercase text-slate-600">Bilde som ligger på retten nå</p>
                <img
                  alt={`Eksisterende bilde for ${editingDish?.name || form.name}`}
                  className="h-36 w-full rounded border object-cover"
                  src={existingImageUrl}
                />
              </div>
            ) : null}

            <div className="grid gap-1">
              <p className="text-xs font-bold uppercase text-slate-600">Bilde som blir lagret</p>
              {savedImagePreviewUrl ? (
                <img
                  alt={`Preview for ${form.name || 'ny rett'}`}
                  className="h-36 w-full rounded border object-cover"
                  src={savedImagePreviewUrl}
                />
              ) : (
                <div className="grid h-36 place-items-center rounded border bg-slate-50 text-xs text-slate-500">
                  Ingen bilde valgt
                </div>
              )}
            </div>
          </div>

          {form.imageFile ? (
            <button className="w-fit border px-3 py-1 text-sm" onClick={clearSelectedImage} type="button">
              Fjern valgt bilde
            </button>
          ) : null}
        </div>

        <fieldset className="border p-2">
          <legend className="text-sm font-bold">Allergener</legend>
          {allergens.length === 0 ? <p className="text-sm">Ingen allergier registrert.</p> : null}
          <div className="grid gap-1">
            {allergens.map((allergen) => (
              <label className="flex gap-2 text-sm" key={allergen._id}>
                <input
                  checked={form.allergens.includes(allergen._id)}
                  onChange={() => toggleAllergen(allergen._id)}
                  type="checkbox"
                />
                {allergen.name}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex gap-2">
          <button className="border px-3 py-2" disabled={isSaving || Boolean(imageError)} type="submit">
            {isSaving ? 'Lagrer...' : editingId ? 'Lagre endring' : 'Opprett rett'}
          </button>
          {editingId ? (
            <button className="border px-3 py-2" onClick={resetForm} type="button">
              Avbryt
            </button>
          ) : null}
        </div>
      </form>

      {isLoading ? <p>Laster retter...</p> : null}
      <ul className="grid gap-2">
        {dishes.map((dish) => (
          <li className="grid gap-3 border p-3 sm:grid-cols-[120px_1fr]" key={dish._id}>
            {dish.image ? (
              <img alt={dish.name} className="h-24 w-28 rounded object-cover" src={getAssetUrl(dish.image)} />
            ) : (
              <div className="grid h-24 w-28 place-items-center rounded bg-slate-100 text-xs text-slate-600">Mangler bilde</div>
            )}
            <div>
              <h3 className="font-bold">{dish.name}</h3>
              {dish.description ? <p className="text-sm">{dish.description}</p> : null}
              <p className="break-all text-xs text-slate-600">Bilde: {dish.image || 'Mangler'}</p>
              {dish.allergens?.length ? (
                <p className="text-sm">Allergener: {dish.allergens.map((allergen) => allergen.name).join(', ')}</p>
              ) : (
                <p className="text-sm">Ingen allergener</p>
              )}
              <div className="mt-2 flex gap-2">
                <button className="border px-3 py-1 text-sm" onClick={() => startEdit(dish)} type="button">
                  Rediger
                </button>
                <button className="border px-3 py-1 text-sm" onClick={() => void handleDelete(dish._id)} type="button">
                  Slett
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
