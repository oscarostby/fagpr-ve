import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '@/auth/AuthContext'

const navItems = [
  { to: '/admin', label: 'Hjem', end: true },
  { to: '/admin/retter', label: 'Retter' },
  { to: '/admin/allergier', label: 'Allergier' },
]

export function AdminLayout() {
  const { logout, username } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="min-h-screen bg-white p-4 text-slate-900">
      <header className="mb-4 border-b pb-3">
        <h1 className="text-xl font-bold">Admin</h1>
        <p className="text-sm">Innlogget{username ? ` som ${username}` : ''}</p>
        <nav className="mt-3 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `border px-3 py-2 text-sm ${isActive ? 'bg-slate-200' : 'bg-white'}`
              }
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
          <button className="border px-3 py-2 text-sm" onClick={handleLogout} type="button">
            Logg ut
          </button>
        </nav>
      </header>
      <Outlet />
    </main>
  )
}
