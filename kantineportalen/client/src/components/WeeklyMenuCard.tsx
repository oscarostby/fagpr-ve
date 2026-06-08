import styled from 'styled-components'

import type { WeeklyMenuItem } from '@/types/menu'
import { getDishIcon } from '@/utils/dishIcons'

type WeeklyMenuCardProps = {
  item: WeeklyMenuItem
  isToday?: boolean
}

const Card = styled.article.attrs<{ $isToday: boolean }>(({ $isToday }) => ({
  className: `flex h-[52px] items-center justify-between rounded-[8px] bg-[#f4f6f2] px-3 text-[#183630] md:h-[150px] md:flex-col md:justify-start md:rounded-[9px] md:px-5 md:py-5 xl:h-[170px] xl:px-6 xl:py-6 ${
    $isToday
      ? 'border border-[#5ba05f] ring-1 ring-[#5ba05f]'
      : 'border border-[#edf0ea]'
  }`,
}))``

const TextGroup = styled.div.attrs({
  className: 'min-w-0 md:text-center',
})``

const DayLabel = styled.p.attrs({
  className:
    'text-[8px] font-extrabold uppercase leading-none tracking-[0.01em] text-[#4b9651] md:text-[13px] xl:text-[14px]',
})``

const DishTitle = styled.h3.attrs({
  className:
    'mt-1 max-w-[210px] text-[11px] font-bold leading-[1.18] tracking-[-0.025em] text-[#1d332f] md:mt-5 md:max-w-[155px] md:text-[17px] md:leading-[1.16] xl:mt-6 xl:max-w-[170px] xl:text-[18px]',
})``

const iconClassName =
  'h-7 w-7 shrink-0 text-[#5ba05f] md:mt-auto md:h-9 md:w-9 xl:h-10 xl:w-10'

export function WeeklyMenuCard({ item, isToday = false }: WeeklyMenuCardProps) {
  const DishIcon = getDishIcon(item.title)

  return (
    <Card $isToday={isToday}>
      <TextGroup>
        <DayLabel>{item.day}</DayLabel>
        <DishTitle>{item.title}</DishTitle>
      </TextGroup>

      <DishIcon aria-hidden="true" className={iconClassName} strokeWidth={1.35} />
    </Card>
  )
}
