import { BookOpen, CookingPot, House, LogOut, Menu, Sprout, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import vaarLogo from '@/assets/images/logovaar1.png'
import { useAuth } from '@/auth/AuthContext'
import './admin.css'

const navItems = [
  { to: '/admin', label: 'Hjem', end: true, icon: House },
  { to: '/admin/retter', label: 'Retter', icon: CookingPot },
  { to: '/admin/allergier', label: 'Allergier', icon: Sprout },
  { to: '/admin/dokumentasjon', label: 'Dokumentasjon', icon: BookOpen },
]

function Brand() {
  return (
    <div className="admin-brand" aria-label="Kantineportalen">
      <span className="admin-brand-logo-crop" aria-hidden="true">
        <img className="admin-brand-logo" src={vaarLogo} alt="" />
      </span>
      <span className="admin-brand-name">Kantineportalen</span>
    </div>
  )
}

export function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="admin-shell">
      <aside className={isMenuOpen ? 'admin-sidebar is-open' : 'admin-sidebar'}>
        <div className="admin-sidebar-header">
          <Brand />
          <button
            aria-label="Lukk meny"
            className="admin-mobile-menu-button"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          >
            <X size={22} strokeWidth={1.8} />
          </button>
        </div>

        <nav className="admin-nav" aria-label="Adminmeny">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                className={({ isActive }) => `admin-nav-link${isActive ? ' is-active' : ''}`}
                end={item.end}
                key={item.to}
                onClick={() => setIsMenuOpen(false)}
                to={item.to}
              >
                <Icon aria-hidden="true" size={20} strokeWidth={1.7} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <button className="admin-logout" onClick={handleLogout} type="button">
          <LogOut aria-hidden="true" size={20} strokeWidth={1.7} />
          <span>Logg ut</span>
        </button>
      </aside>

      <header className="admin-mobile-header">
        <Brand />
        <button
          aria-label="Åpne meny"
          className="admin-mobile-menu-button"
          onClick={() => setIsMenuOpen(true)}
          type="button"
        >
          <Menu size={23} strokeWidth={1.8} />
        </button>
      </header>

      {isMenuOpen ? (
        <button
          aria-label="Lukk meny"
          className="admin-sidebar-backdrop"
          onClick={() => setIsMenuOpen(false)}
          type="button"
        />
      ) : null}

      <div className="admin-content">
        <Outlet />
      </div>
    </main>
  )
}
