import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function MainLayout() {
  return (
    <div className="mx-auto min-h-screen max-w-[1440px] overflow-hidden rounded-t-[14px] bg-[#fbfaf6] text-[#003f35] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
