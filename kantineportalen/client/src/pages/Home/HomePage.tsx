import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { LunchCard } from '@/components/LunchCard'
import { WeeklyMenuCard } from '@/components/WeeklyMenuCard'
import { getFrontendMenu, type FrontendMenu } from '@/services/menuService'
import type { Weekday } from '@/types/menu'

const PageMain = styled.main.attrs({
  className: 'flex-1 overflow-visible',
})``

const PageInner = styled.section.attrs({
  className:
    'mx-auto flex h-full w-full max-w-[1370px] flex-col px-8 pb-0 pt-9 md:px-[42px] md:pt-[14px] xl:pt-[28px]',
})``

const WeeklySection = styled.section.attrs({
  className: 'mt-7 md:mt-[10px] xl:mt-[18px]',
})``

const WeeklyHeading = styled.h2.attrs({
  className:
    'mb-5 text-[26px] font-extrabold uppercase leading-none tracking-[-0.035em] text-[#003f35] md:mb-6 md:text-[31px]',
})``

const WeeklyGrid = styled.div.attrs({
  className: 'grid gap-2 md:grid-cols-5 md:gap-6',
})``

const weekdays: Record<number, Weekday> = {
  1: 'Mandag',
  2: 'Tirsdag',
  3: 'Onsdag',
  4: 'Torsdag',
  5: 'Fredag',
}

const emptyMenu: FrontendMenu = {
  todayLunch: {
    title: 'Ingen rett satt opp',
    servingTime: '11:00 - 13:00',
    allergens: [],
    image: '',
  },
  weeklyMenu: [
    { day: 'Mandag', title: 'Ingen rett satt opp' },
    { day: 'Tirsdag', title: 'Ingen rett satt opp' },
    { day: 'Onsdag', title: 'Ingen rett satt opp' },
    { day: 'Torsdag', title: 'Ingen rett satt opp' },
    { day: 'Fredag', title: 'Ingen rett satt opp' },
  ],
}

export function HomePage() {
  const highlightedDay = weekdays[new Date().getDay()]
  const [menu, setMenu] = useState<FrontendMenu>(emptyMenu)

  useEffect(() => {
    let isMounted = true

    getFrontendMenu()
      .then((backendMenu) => {
        if (isMounted) {
          setMenu(backendMenu)
        }
      })
      .catch((error) => {
        console.error('Kunne ikke hente meny fra backend:', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <PageMain>
      <PageInner>
        <LunchCard lunch={menu.todayLunch} />

        <WeeklySection aria-labelledby="weekly-menu-heading">
          <WeeklyHeading id="weekly-menu-heading">Ukesmeny</WeeklyHeading>
          <WeeklyGrid>
            {menu.weeklyMenu.map((item) => (
              <WeeklyMenuCard item={item} isToday={item.day === highlightedDay} key={item.day} />
            ))}
          </WeeklyGrid>
        </WeeklySection>
      </PageInner>
    </PageMain>
  )
}
