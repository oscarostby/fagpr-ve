import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { LunchCard } from '@/components/LunchCard'
import { WeeklyMenuCard } from '@/components/WeeklyMenuCard'
import { getFrontendMenu, type FrontendMenu } from '@/services/menuService'
import type { Weekday } from '@/types/menu'
import { dietaryTagIcon, dietaryTagOptions, hasSelectedDietaryTags, type DietaryTag } from '@/utils/dietaryTags'

const PageMain = styled.main.attrs({
  className: 'flex-1 overflow-visible',
})``

const PageInner = styled.section.attrs({
  className:
    'mx-auto flex h-full w-full max-w-[1200px] flex-col px-7 pb-2 pt-6 md:px-[34px] md:pb-3 md:pt-[10px] xl:pt-[16px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    padding-top: 8px;
  }

  @media (max-width: 1024px) {
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 10px;
  }
`

const WeeklySection = styled.section.attrs({
  className: 'mt-5 md:mt-[8px] xl:mt-[10px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    margin-top: 8px;
  }

  @media (max-width: 1024px) {
    margin-top: 18px;
  }
`

const WeeklyHeading = styled.h2.attrs({
  className:
    'mb-5 text-[26px] font-extrabold uppercase leading-none tracking-[-0.035em] text-[#003f35] md:mb-6 md:text-[31px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    margin-bottom: 12px;
    font-size: 26px;
  }

  @media (max-width: 1024px) {
    margin-bottom: 12px;
    font-size: 26px;
  }
`

const WeeklyGrid = styled.div.attrs({
  className: 'grid gap-2 md:grid-cols-5 md:gap-6',
})`
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`

const FilterBox = styled.div.attrs({
  className: 'mb-4 flex flex-wrap items-center gap-2 text-[16px] text-[#003f35]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    margin-bottom: 10px;
  }

  @media (max-width: 520px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const FilterLabel = styled.span.attrs({
  className: 'font-bold',
})`
  @media (max-width: 520px) {
    grid-column: 1 / -1;
  }
`

const FilterOption = styled.label.attrs({
  className: 'flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-[#9caf9d] bg-white px-4 py-2 font-medium',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    min-height: 40px;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  @media (max-width: 520px) {
    min-height: 44px;
    justify-content: center;
    padding: 6px 10px;
  }
`

const EmptyFilterMessage = styled.p.attrs({
  className: 'rounded border border-[#9caf9d] bg-[#f4f6f2] p-4 text-[16px] font-semibold text-[#003f35]',
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
    dietaryTags: [],
    image: '',
  },
  weeklyMenu: [
    { day: 'Mandag', title: 'Ingen rett satt opp', allergens: [], dietaryTags: [] },
    { day: 'Tirsdag', title: 'Ingen rett satt opp', allergens: [], dietaryTags: [] },
    { day: 'Onsdag', title: 'Ingen rett satt opp', allergens: [], dietaryTags: [] },
    { day: 'Torsdag', title: 'Ingen rett satt opp', allergens: [], dietaryTags: [] },
    { day: 'Fredag', title: 'Ingen rett satt opp', allergens: [], dietaryTags: [] },
  ],
}

export function HomePage() {
  const highlightedDay = weekdays[new Date().getDay()]
  const [menu, setMenu] = useState<FrontendMenu>(emptyMenu)
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<DietaryTag[]>([])
  const filteredWeeklyMenu = menu.weeklyMenu.filter((item) => hasSelectedDietaryTags(item.dietaryTags, selectedDietaryTags))

  function toggleDietaryFilter(tag: DietaryTag) {
    setSelectedDietaryTags((current) =>
      current.includes(tag) ? current.filter((currentTag) => currentTag !== tag) : [...current, tag],
    )
  }

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
          <FilterBox aria-label="Filtrer ukesmenyen etter kostholdsmerker">
            <FilterLabel>Filter:</FilterLabel>
            {dietaryTagOptions.map((option) => {
              const OptionIcon = dietaryTagIcon(option.value)

              return (
                <FilterOption key={option.value}>
                  <input
                    checked={selectedDietaryTags.includes(option.value)}
                    onChange={() => toggleDietaryFilter(option.value)}
                    type="checkbox"
                  />
                  <OptionIcon aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#34783c]" strokeWidth={1.8} />
                  {option.label}
                </FilterOption>
              )
            })}
          </FilterBox>
          <WeeklyGrid>
            {filteredWeeklyMenu.map((item) => (
              <WeeklyMenuCard item={item} isToday={item.day === highlightedDay} key={item.day} />
            ))}
          </WeeklyGrid>
          {filteredWeeklyMenu.length === 0 ? <EmptyFilterMessage>Ingen retter matcher valgte kostholdsmerker.</EmptyFilterMessage> : null}
        </WeeklySection>
      </PageInner>
    </PageMain>
  )
}
