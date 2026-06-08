import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/auth/AuthContext'
import { ApiError } from '@/services/api'

export function LoginPage() {
  const { isAuthenticated, isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/admin'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated && isAdmin) {
    return <Navigate replace to="/admin" />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(username, password)
      navigate(from, { replace: true })
    } catch (loginError) {
      if (loginError instanceof ApiError) {
        setError(loginError.message)
      } else if (loginError instanceof Error) {
        setError(loginError.message)
      } else {
        setError('Innlogging feilet')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white p-4 text-slate-900">
      <section className="mx-auto max-w-sm border p-4">
        <h1 className="text-xl font-bold">Logg inn</h1>
        <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
          <label className="grid gap-1 text-sm">
            Brukernavn
            <input
              autoComplete="username"
              className="border px-2 py-2"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              required
              type="text"
              value={username}
            />
          </label>
          <label className="grid gap-1 text-sm">
            Passord
            <input
              autoComplete="current-password"
              className="border px-2 py-2"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button className="border px-3 py-2" disabled={isLoading} type="submit">
            {isLoading ? 'Logger inn...' : 'Logg inn'}
          </button>
        </form>
      </section>
    </main>
  )
}
