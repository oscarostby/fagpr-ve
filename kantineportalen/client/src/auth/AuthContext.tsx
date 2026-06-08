import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

import { login as loginRequest, type LoginResponse } from '@/services/adminService'

const tokenStorageKey = 'kantineportalen.jwt'

type JwtPayload = {
  exp?: number
  role?: string
  username?: string
}

type AuthContextValue = {
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  username: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) {
      return null
    }

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(window.atob(normalizedPayload))
    return decoded as JwtPayload
  } catch {
    return null
  }
}

function isTokenUsable(token: string | null) {
  if (!token) {
    return false
  }

  const payload = decodeToken(token)
  if (!payload?.exp || payload.role !== 'admin') {
    return false
  }

  return payload.exp * 1000 > Date.now()
}

function getStoredToken() {
  const token = window.localStorage.getItem(tokenStorageKey)
  if (!isTokenUsable(token)) {
    window.localStorage.removeItem(tokenStorageKey)
    return null
  }

  return token
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())

  const logout = useCallback(() => {
    window.localStorage.removeItem(tokenStorageKey)
    setToken(null)
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const response: LoginResponse = await loginRequest(username, password)

    if (response.user.role !== 'admin' || !isTokenUsable(response.token)) {
      throw new Error('Brukeren mangler admin-tilgang')
    }

    window.localStorage.setItem(tokenStorageKey, response.token)
    setToken(response.token)
  }, [])

  const payload = token ? decodeToken(token) : null

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      isAdmin: payload?.role === 'admin',
      username: payload?.username || null,
      login,
      logout,
    }),
    [login, logout, payload?.role, payload?.username, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth må brukes inni AuthProvider')
  }

  return context
}
