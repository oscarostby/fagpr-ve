import styled from 'styled-components'
import { Clock } from 'lucide-react'

import type { Lunch } from '@/types/menu'
import { dietaryTagIcon, dietaryTagLabel } from '@/utils/dietaryTags'

type LunchCardProps = {
  lunch: Lunch
}

const LunchSection = styled.section.attrs({
  className:
    'mt-7 grid items-start gap-5 md:mt-5 md:grid-cols-[minmax(280px,0.4fr)_minmax(0,0.6fr)] md:gap-[48px] xl:mt-7 xl:gap-[56px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    margin-top: 18px;
    gap: 44px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-top: 24px;
  }
`

const TextColumn = styled.div.attrs({
  className: 'md:pt-[18px] xl:pt-[22px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    padding-top: 14px;
  }

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`

const Eyebrow = styled.p.attrs({
  className:
    'mb-3 text-[16px] font-extrabold uppercase leading-tight tracking-[-0.015em] text-[#276f30] md:mb-4',
})``

const Heading = styled.h1.attrs({
  className:
    'text-[30px] font-black leading-[0.95] tracking-[-0.045em] text-[#003f35] sm:text-[34px] md:whitespace-nowrap md:text-[38px] xl:text-[42px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    font-size: 38px;
  }

  @media (max-width: 1024px) {
    font-size: clamp(30px, 6vw, 38px);
  }
`

const DishName = styled.p.attrs({
  className:
    'mt-3 text-[19px] font-medium leading-none tracking-[-0.04em] text-[#003f35] md:mt-4 md:text-[22px] xl:text-[24px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    margin-top: 14px;
    font-size: 22px;
  }

  @media (max-width: 1024px) {
    margin-top: 12px;
    font-size: 20px;
  }
`

const Divider = styled.div.attrs({
  className:
    'my-5 h-[2px] w-[46px] bg-[#2c8335] md:my-5 md:w-[56px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    margin-top: 14px;
    margin-bottom: 14px;
  }

  @media (max-width: 1024px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`

const TimeRow = styled.div.attrs({
  className:
    'flex items-center gap-4 text-[16px] font-semibold tracking-[-0.02em] text-[#003f35] md:text-[18px] xl:text-[20px]',
})``

const StyledClock = styled(Clock).attrs({
  className:
    'h-7 w-7 stroke-[1.8] text-[#2c8335] md:h-8 md:w-8',
})``

const Allergens = styled.div.attrs({
  className: 'mt-4 md:mt-5',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    margin-top: 16px;
  }

  @media (max-width: 1024px) {
    margin-top: 14px;
  }
`

const AllergensLabel = styled.p.attrs({
  className:
    'text-[16px] font-extrabold uppercase leading-tight text-[#276f30]',
})``

const AllergensText = styled.p.attrs({
  className:
    'mt-2 text-[16px] font-medium leading-normal tracking-[-0.02em] text-[#003f35]',
})``

const Badges = styled.div.attrs({
  className: 'mt-3 flex flex-wrap gap-1.5',
})``

const Badge = styled.span.attrs({
  className: 'rounded-full border border-[#5c9662] bg-[#edf7ec] px-3 py-1.5 text-[14px] font-bold text-[#195c29]',
})``

const LunchImage = styled.img.attrs({
  className:
    'h-[160px] w-full rounded-[8px] object-cover object-center shadow-[0_12px_32px_rgba(20,35,28,0.12)] md:mt-[4px] md:h-[225px] md:w-full md:justify-self-end xl:h-[245px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    height: 220px;
  }

  @media (max-width: 1024px) {
    height: clamp(150px, 32vw, 210px);
    margin-top: 0;
  }
`

const MissingImage = styled.div.attrs({
  className:
    'grid h-[160px] w-full place-items-center rounded-[8px] bg-[#f4f6f2] text-sm font-semibold text-[#003f35] shadow-[0_12px_32px_rgba(20,35,28,0.08)] md:mt-[4px] md:h-[225px] xl:h-[245px]',
})`
  @media (min-width: 768px) and (max-height: 850px) {
    height: 220px;
  }

  @media (max-width: 1024px) {
    height: clamp(150px, 32vw, 210px);
    margin-top: 0;
  }
`

export function LunchCard({ lunch }: LunchCardProps) {
  return (
    <LunchSection>
      <TextColumn>
        <Eyebrow>I DAG</Eyebrow>

        <Heading>DAGENS LUNSJ</Heading>

        <DishName>{lunch.title}</DishName>

        <Divider />

        <TimeRow>
          <StyledClock aria-hidden="true" />
          <span>{lunch.servingTime}</span>
        </TimeRow>

        <Allergens>
          <AllergensLabel>Allergener</AllergensLabel>
          {lunch.allergens.length ? (
            <Badges aria-label="Allergener">
              {lunch.allergens.map((allergen) => (
                <Badge key={allergen}>{allergen}</Badge>
              ))}
            </Badges>
          ) : (
            <AllergensText>Ingen registrerte allergener</AllergensText>
          )}
        </Allergens>

        {lunch.dietaryTags.length ? (
          <Badges aria-label="Kostholdsmerker">
            {lunch.dietaryTags.map((tag) => {
              const TagIcon = dietaryTagIcon(tag)
              const label = dietaryTagLabel(tag)

              return (
                <Badge aria-label={label} key={tag} role="img" title={label}>
                  <TagIcon aria-hidden="true" size={16} />
                  {label}
                </Badge>
              )
            })}
          </Badges>
        ) : null}
      </TextColumn>

      {lunch.image ? <LunchImage src={lunch.image} alt={lunch.title} /> : <MissingImage>Ingen bilde valgt</MissingImage>}
    </LunchSection>
  )
}
