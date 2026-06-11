import styled from 'styled-components'

import type { WeeklyMenuItem } from '@/types/menu'
import { getDishIcon } from '@/utils/dishIcons'
import { dietaryTagIcon, dietaryTagLabel } from '@/utils/dietaryTags'

type WeeklyMenuCardProps = {
  item: WeeklyMenuItem
  isToday?: boolean
}

const Card = styled.article.attrs<{ $isToday: boolean }>(({ $isToday }) => ({
  className: `relative flex min-h-[92px] items-start justify-between rounded-[8px] bg-[#f4f6f2] px-3 py-3 text-[#183630] md:h-[165px] md:flex-col md:items-center md:justify-start md:rounded-[9px] md:px-4 md:py-4 xl:h-[175px] xl:px-5 xl:py-5 ${
    $isToday
      ? 'border border-[#5ba05f] ring-1 ring-[#5ba05f]'
      : 'border border-[#edf0ea]'
  }`,
}))`
  @media (min-width: 768px) and (max-height: 850px) {
    height: 178px;
    min-height: 178px;
    padding: 16px;
  }

  @media (max-width: 1024px) {
    height: auto;
    min-height: 92px;
    flex-direction: row;
    align-items: center;
    padding: 12px 14px;
  }
`

const TextGroup = styled.div.attrs({
  className: 'min-w-0 md:w-full md:text-center',
})`
  @media (max-width: 1024px) {
    text-align: left;
  }
`

const DayLabel = styled.p.attrs({
  className:
    'text-[12px] font-extrabold uppercase leading-tight tracking-[0.01em] text-[#34783c] md:text-[13px] xl:text-[14px]',
})``

const DishTitle = styled.h3.attrs({
  className:
    'mt-1 max-w-[210px] text-[15px] font-bold leading-[1.3] tracking-[-0.025em] text-[#1d332f] md:mx-auto md:mt-3 md:max-w-[170px] md:text-[16px] xl:mt-4 xl:max-w-[190px] xl:text-[17px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    margin-top: 12px;
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    max-width: none;
    margin-top: 5px;
    font-size: 16px;
  }
`

const Badges = styled.div.attrs({
  className:
    'ml-3 flex max-w-[175px] flex-wrap justify-end gap-1 md:absolute md:inset-x-2 md:bottom-2 md:ml-0 md:max-w-none md:justify-center',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    bottom: 8px;
  }

  @media (max-width: 1024px) {
    position: static;
    max-width: 220px;
    margin-left: auto;
    justify-content: flex-end;
  }
`

const Badge = styled.span.attrs({
  className:
    'inline-flex items-center rounded-full border border-[#76aa79] bg-[#edf7ec] px-1.5 py-[1px] text-[9px] font-bold leading-tight text-[#195c29]',
})``

const DietaryIconBadge = styled.span.attrs({
  className:
    'grid h-5 w-5 place-items-center rounded-full border border-[#76aa79] bg-[#edf7ec] text-[#286f36]',
})``

const iconClassName =
  'hidden h-7 w-7 shrink-0 text-[#4b9651] md:mb-12 md:mt-auto md:block md:h-10 md:w-10 xl:h-11 xl:w-11 max-[1024px]:mb-0 max-[1024px]:ml-3 max-[1024px]:mt-0 max-[1024px]:block max-[1024px]:h-9 max-[1024px]:w-9'

export function WeeklyMenuCard({ item, isToday = false }: WeeklyMenuCardProps) {
  const DishIcon = getDishIcon(item.title)

  return (
    <Card $isToday={isToday}>
      <TextGroup>
        <DayLabel>{item.day}</DayLabel>
        <DishTitle>{item.title}</DishTitle>
      </TextGroup>

      <DishIcon aria-hidden="true" className={iconClassName} strokeWidth={1.35} />

      {item.dietaryTags.length || item.allergens.length ? (
        <Badges aria-label="Allergener og kostholdsmerker">
          {item.dietaryTags.map((tag) => {
            const TagIcon = dietaryTagIcon(tag)
            const label = dietaryTagLabel(tag)

            return (
              <DietaryIconBadge aria-label={label} key={tag} role="img" title={label}>
                <TagIcon aria-hidden="true" size={13} strokeWidth={1.8} />
              </DietaryIconBadge>
            )
          })}
          {item.allergens.map((allergen) => (
            <Badge key={allergen}>{allergen}</Badge>
          ))}
        </Badges>
      ) : null}
    </Card>
  )
}
