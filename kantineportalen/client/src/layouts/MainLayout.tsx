import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const AppShell = styled.div.attrs({
  className: 'flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fbfaf6] text-[#003f35]',
})``

export function MainLayout() {
  return (
    <AppShell>
      <Header />
      <Outlet />
      <Footer />
    </AppShell>
  )
}
