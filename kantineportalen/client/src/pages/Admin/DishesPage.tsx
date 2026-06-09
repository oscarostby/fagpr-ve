import { ImagePlus, Pencil, Plus, Trash2, X } from 'lucide-react'
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
import { dietaryTagIcon, dietaryTagLabel, dietaryTagOptions, type DietaryTag } from '@/utils/dietaryTags'

type DishFormState = {
  name: string
  description: string
  imageFile: File | null
  allergens: string[]
  dietaryTags: DietaryTag[]
}

const emptyForm: DishFormState = {
  name: '',
  description: '',
  imageFile: null,
  allergens: [],
  dietaryTags: [],
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
    dietaryTags: dish.dietaryTags || [],
  }
}

function toPayload(form: DishFormState): DishPayload {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    imageFile: form.imageFile,
    allergens: form.allergens,
    dietaryTags: form.dietaryTags,
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
  const [success, setSuccess] = useState('')
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
    setSuccess('')

    try {
      const payload = toPayload(form)
      let savedDish: ApiDish
      if (editingId) {
        savedDish = await updateDish(editingId, payload, token)
      } else {
        savedDish = await createDish(payload, token)
      }

      const savedTagSet = new Set(savedDish.dietaryTags)
      if (payload.dietaryTags?.some((tag) => !savedTagSet.has(tag))) {
        throw new Error('Serveren lagret ikke alle kostholdsmerkene. Start backend på nytt og prøv igjen.')
      }

      setDishes((current) =>
        editingId
          ? current.map((dish) => (dish._id === savedDish._id ? savedDish : dish))
          : [...current, savedDish].sort((a, b) => a.name.localeCompare(b.name, 'nb')),
      )
      setSuccess(`${savedDish.name} ble lagret med valgte allergener og kostholdsmerker.`)
      resetForm()
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

  function toggleDietaryTag(tag: DietaryTag) {
    setForm((current) => ({
      ...current,
      dietaryTags: current.dietaryTags.includes(tag)
        ? current.dietaryTags.filter((currentTag) => currentTag !== tag)
        : [...current.dietaryTags, tag],
    }))
  }

  return (
    <section className="dishes-admin">
      <header className="admin-page-heading">
        <div>
          <h1>Retter</h1>
          <p>Opprett og administrer matrettene i kantineportalen</p>
        </div>
        {!editingId ? (
          <button className="admin-primary-button" onClick={resetForm} type="button">
            <Plus aria-hidden="true" size={18} />
            Ny rett
          </button>
        ) : null}
      </header>

      {error ? (
        <p className="admin-alert is-error" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p aria-live="polite" className="admin-alert is-success">
          {success}
        </p>
      ) : null}

      <div className="dishes-admin-layout">
        <form className="dish-editor" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="dish-editor-heading">
            <div>
              <span className="admin-eyebrow">{editingId ? 'Redigering' : 'Ny matrett'}</span>
              <h2>{editingId ? editingDish?.name || 'Rediger rett' : 'Opprett rett'}</h2>
            </div>
            {editingId ? (
              <button aria-label="Avbryt redigering" className="admin-icon-button" onClick={resetForm} type="button">
                <X aria-hidden="true" size={18} />
              </button>
            ) : null}
          </div>

          <label className="admin-field">
            <span>Navn på retten</span>
          <input
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="For eksempel lasagne med salat"
            required
            value={form.name}
          />
        </label>
          <label className="admin-field">
            <span>Beskrivelse</span>
          <textarea
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="Kort beskrivelse av retten"
            rows={3}
            value={form.description}
          />
        </label>

          <div className="dish-image-field">
            <div className="dish-field-heading">
              <div>
                <strong>Bilde</strong>
                <span>JPG, PNG eller WEBP. Maks 5 MB.</span>
              </div>
              {form.imageFile ? (
                <button className="admin-text-button" onClick={clearSelectedImage} type="button">
                  Fjern valgt bilde
                </button>
              ) : null}
            </div>

            <label className={savedImagePreviewUrl ? 'dish-image-dropzone has-image' : 'dish-image-dropzone'}>
            <input
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              ref={fileInputRef}
              required={!editingId}
              type="file"
            />
              {savedImagePreviewUrl ? (
                <img alt={`Forhåndsvisning for ${form.name || 'ny rett'}`} src={savedImagePreviewUrl} />
              ) : (
                <>
                  <span className="dish-image-dropzone-icon">
                    <ImagePlus aria-hidden="true" size={23} />
                  </span>
                  <strong>Velg bilde</strong>
                  <span>Klikk for å laste opp</span>
                </>
              )}
            </label>

            {imageError ? (
              <p className="admin-field-error" role="alert">
                {imageError}
              </p>
            ) : null}

            <p className="dish-image-status">
              <strong>{selectedFileName || (editingDish?.image ? 'Eksisterende bilde' : 'Ingen fil valgt')}</strong>
              {form.imageFile ? ` (${formatFileSize(form.imageFile.size)})` : ''}
              <span>{imageStatus}</span>
            </p>
          </div>

          <fieldset className="dish-options">
            <legend>Allergener</legend>
            {allergens.length === 0 ? <p>Ingen allergier registrert.</p> : null}
            <div className="dish-option-grid">
            {allergens.map((allergen) => (
                <label className="dish-option" key={allergen._id}>
                <input
                  checked={form.allergens.includes(allergen._id)}
                  onChange={() => toggleAllergen(allergen._id)}
                  type="checkbox"
                />
                  <span>{allergen.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

          <fieldset className="dish-options">
            <legend>Kostholdsmerker</legend>
            <p>Velg ett eller flere merker dersom retten passer bestemte kosthold.</p>
            <div className="dish-option-grid">
              {dietaryTagOptions.map((option) => {
                const OptionIcon = dietaryTagIcon(option.value)

                return (
                  <label className="dish-option" key={option.value}>
                    <input
                      checked={form.dietaryTags.includes(option.value)}
                      onChange={() => toggleDietaryTag(option.value)}
                      type="checkbox"
                    />
                    <OptionIcon aria-hidden="true" size={17} />
                    <span>{option.label}</span>
                  </label>
                )
              })}
          </div>
        </fieldset>

          <div className="dish-editor-actions">
            <button className="admin-primary-button" disabled={isSaving || Boolean(imageError)} type="submit">
            {isSaving ? 'Lagrer...' : editingId ? 'Lagre endring' : 'Opprett rett'}
          </button>
          {editingId ? (
              <button className="admin-secondary-button" onClick={resetForm} type="button">
              Avbryt
            </button>
          ) : null}
        </div>
      </form>

        <div className="dish-library">
          <div className="dish-library-heading">
            <div>
              <span className="admin-eyebrow">Menybibliotek</span>
              <h2>Eksisterende retter</h2>
            </div>
            <span className="dish-count">{dishes.length} retter</span>
          </div>

          {isLoading ? <p className="admin-empty-state">Laster retter...</p> : null}
          {!isLoading && dishes.length === 0 ? <p className="admin-empty-state">Ingen retter er opprettet ennå.</p> : null}

          <ul className="dish-card-grid">
        {dishes.map((dish) => (
              <li className="dish-card" key={dish._id}>
            {dish.image ? (
                  <img alt={dish.name} className="dish-card-image" src={getAssetUrl(dish.image)} />
            ) : (
                  <div className="dish-card-image dish-card-image-placeholder">
                    <ImagePlus aria-hidden="true" size={25} />
                    Mangler bilde
                  </div>
            )}
                <div className="dish-card-body">
                  <h3>{dish.name}</h3>
                  <p className="dish-card-description">{dish.description || 'Ingen beskrivelse lagt til.'}</p>

                  <div className="dish-card-tags">
                    {dish.dietaryTags?.map((tag) => {
                      const TagIcon = dietaryTagIcon(tag)
                      return (
                        <span key={tag}>
                          <TagIcon aria-hidden="true" size={13} />
                          {dietaryTagLabel(tag)}
                        </span>
                      )
                    })}
                    {dish.allergens?.map((allergen) => <span key={allergen._id}>{allergen.name}</span>)}
                    {!dish.dietaryTags?.length && !dish.allergens?.length ? <span>Ingen merker</span> : null}
                  </div>

                  <div className="dish-card-actions">
                    <button className="admin-secondary-button" onClick={() => startEdit(dish)} type="button">
                      <Pencil aria-hidden="true" size={15} />
                      Rediger
                </button>
                    <button className="admin-danger-button" onClick={() => void handleDelete(dish._id)} type="button">
                      <Trash2 aria-hidden="true" size={15} />
                  Slett
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </section>
  )
}
