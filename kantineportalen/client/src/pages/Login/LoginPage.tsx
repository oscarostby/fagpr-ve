import { ArrowRight, LockKeyhole, UserRound } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import vaarLogo from '@/assets/images/logovaar1.png'
import { useAuth } from '@/auth/AuthContext'
import { ApiError } from '@/services/api'
import '@/pages/Admin/admin.css'

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
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand">
          <span className="login-brand-logo-crop" aria-hidden="true">
            <img alt="" className="login-brand-logo" src={vaarLogo} />
          </span>
          <span>Kantineportalen</span>
        </div>

        <div className="login-brand-copy">
          <span className="admin-eyebrow">Administrasjon</span>
          <h1>Ukens meny, samlet på ett sted.</h1>
          <p>Administrer retter, allergener og ukemenyen på en enkel og oversiktlig måte.</p>
        </div>

        <p className="login-brand-footer">Kantineportalen</p>
      </section>

      <section className="login-form-panel">
        <div className="login-card">
          <header className="login-heading">
            <span className="admin-eyebrow">Velkommen tilbake</span>
            <h2>Logg inn</h2>
            <p>Bruk adminkontoen din for å fortsette.</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>Brukernavn</span>
              <span className="login-input-wrap">
                <UserRound aria-hidden="true" size={18} />
            <input
              autoComplete="username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
                  placeholder="Skriv inn brukernavn"
              required
              type="text"
              value={username}
            />
              </span>
          </label>
            <label className="login-field">
              <span>Passord</span>
              <span className="login-input-wrap">
                <LockKeyhole aria-hidden="true" size={18} />
            <input
              autoComplete="current-password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
                  placeholder="Skriv inn passord"
              required
              type="password"
              value={password}
            />
              </span>
          </label>

            {error ? (
              <p className="login-error" role="alert">
                {error}
              </p>
            ) : null}

            <button aria-busy={isLoading} className="login-submit" disabled={isLoading} type="submit">
              <span>{isLoading ? 'Logger inn...' : 'Logg inn'}</span>
              <ArrowRight aria-hidden="true" size={18} />
          </button>
        </form>
        </div>
      </section>
    </main>
  )
}
