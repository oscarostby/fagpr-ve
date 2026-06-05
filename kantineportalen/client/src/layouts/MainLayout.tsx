import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#003f35]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
