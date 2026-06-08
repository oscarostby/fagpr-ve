import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/auth/AuthContext'

export function ProtectedRoute() {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !isAdmin) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return <Outlet />
}
