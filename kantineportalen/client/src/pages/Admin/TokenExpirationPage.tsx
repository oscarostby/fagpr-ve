import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { useAuth } from '@/auth/AuthContext'
import { getTokenExpiration, updateTokenExpiration } from '@/services/adminService'
import { isUnauthorizedError } from '@/services/api'

const presetOptions = [
  { label: '30 minutter', value: 30 * 60 },
  { label: '1 time', value: 60 * 60 },
  { label: '8 timer', value: 8 * 60 * 60 },
  { label: '1 dag', value: 24 * 60 * 60 },
  { label: '7 dager', value: 7 * 24 * 60 * 60 },
  { label: '30 dager', value: 30 * 24 * 60 * 60 },
]

function toDays(seconds: number) {
  return Math.round((seconds / 86400) * 100) / 100
}

export function TokenExpirationPage() {
  const { token, logout } = useAuth()
  const [expiresInSeconds, setExpiresInSeconds] = useState(7 * 24 * 60 * 60)
  const [selectedOption, setSelectedOption] = useState(String(7 * 24 * 60 * 60))
  const [customDays, setCustomDays] = useState('7')
  const [label, setLabel] = useState('7 dager')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const presetValue = useMemo(() => {
    if (selectedOption === 'custom') {
      return 'custom'
    }

    const preset = presetOptions.find((option) => option.value === expiresInSeconds)
    return preset ? String(preset.value) : 'custom'
  }, [expiresInSeconds, selectedOption])

  function handleError(apiError: unknown) {
    if (isUnauthorizedError(apiError)) {
      logout()
      setError('Sesjonen er ugyldig. Logg inn på nytt.')
      return
    }

    setError(apiError instanceof Error ? apiError.message : 'API-feil')
  }

  async function loadSetting() {
    if (!token) {
      logout()
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const setting = await getTokenExpiration(token)
      const matchingPreset = presetOptions.find((option) => option.value === setting.expiresInSeconds)
      setExpiresInSeconds(setting.expiresInSeconds)
      setSelectedOption(matchingPreset ? String(matchingPreset.value) : 'custom')
      setCustomDays(String(toDays(setting.expiresInSeconds)))
      setLabel(setting.label)
    } catch (loadError) {
      handleError(loadError)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadSetting()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) {
      logout()
      return
    }

    const selectedSeconds = presetValue === 'custom'
      ? Math.round(Number(customDays.replace(',', '.')) * 86400)
      : expiresInSeconds

    setIsSaving(true)
    setError('')
    setMessage('')

    try {
      const setting = await updateTokenExpiration(selectedSeconds, token)
      const matchingPreset = presetOptions.find((option) => option.value === setting.expiresInSeconds)
      setExpiresInSeconds(setting.expiresInSeconds)
      setSelectedOption(matchingPreset ? String(matchingPreset.value) : 'custom')
      setCustomDays(String(toDays(setting.expiresInSeconds)))
      setLabel(setting.label)
      setMessage('Token-utløp er lagret i MongoDB. Nye innlogginger bruker den nye tiden.')
    } catch (saveError) {
      handleError(saveError)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="max-w-2xl">
      <h2 className="text-lg font-bold">Token expire</h2>
      <p className="mt-1 text-sm text-slate-700">
        Bestem hvor lenge en innlogging/JWT-token skal være gyldig. Verdien lagres i MongoDB.
      </p>

      {isLoading ? <p className="my-3">Laster innstilling...</p> : null}
      {error ? <p className="my-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="my-3 text-sm text-green-700">{message}</p> : null}

      <div className="my-4 border p-3 text-sm">
        Nåværende utløp: <strong>{label}</strong> ({expiresInSeconds} sekunder)
      </div>

      <form className="grid gap-4 border p-4" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-sm">
          Velg varighet
          <select
            className="border px-2 py-2"
            onChange={(event) => {
              setSelectedOption(event.target.value)
              if (event.target.value === 'custom') {
                return
              }
              const nextSeconds = Number(event.target.value)
              setExpiresInSeconds(nextSeconds)
              setCustomDays(String(toDays(nextSeconds)))
            }}
            value={presetValue}
          >
            {presetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option value="custom">Egendefinert</option>
          </select>
        </label>

        {presetValue === 'custom' ? (
          <label className="grid gap-1 text-sm">
            Egendefinert antall dager
            <input
              className="border px-2 py-2"
              max="365"
              min="0.0035"
              onChange={(event) => setCustomDays(event.target.value)}
              required
              step="0.01"
              type="number"
              value={customDays}
            />
          </label>
        ) : null}

        <p className="text-xs text-slate-600">
          Minimum er 5 minutter. Maks er 365 dager. Endringen gjelder nye tokens etter neste innlogging.
        </p>

        <button className="w-fit border px-3 py-2 text-sm" disabled={isSaving} type="submit">
          {isSaving ? 'Lagrer...' : 'Lagre token expire'}
        </button>
      </form>
    </section>
  )
}
