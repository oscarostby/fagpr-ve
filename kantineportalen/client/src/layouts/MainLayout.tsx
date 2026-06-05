import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const AppShell = styled.div.attrs({
  className: 'mx-auto flex min-h-screen max-w-[1440px] flex-col overflow-hidden rounded-t-[12px] bg-[#fbfaf6] text-[#003f35] md:h-screen',
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
