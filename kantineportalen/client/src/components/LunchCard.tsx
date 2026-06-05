import styled from 'styled-components'
import { Clock } from 'lucide-react'

import type { Lunch } from '@/types/menu'
import lasagneImage from '@/assets/images/lasagne-salat.png'

type LunchCardProps = {
  lunch: Lunch
}

const LunchSection = styled.section.attrs({
  className:
    'mt-10 grid items-start gap-5 md:mt-8 md:grid-cols-[minmax(300px,0.4fr)_minmax(0,0.6fr)] md:gap-[62px] xl:mt-16 xl:gap-[72px]',
})``

const TextColumn = styled.div.attrs({
  className: 'md:pt-[34px] xl:pt-[40px]',
})``

const Eyebrow = styled.p.attrs({
  className:
    'mb-3 text-[12px] font-extrabold uppercase leading-none tracking-[-0.015em] text-[#2c8335] md:mb-4 md:text-[14px]',
})``

const Heading = styled.h1.attrs({
  className:
    'text-[32px] font-black leading-[0.95] tracking-[-0.045em] text-[#003f35] sm:text-[38px] md:whitespace-nowrap md:text-[44px] xl:text-[48px]',
})``

const DishName = styled.p.attrs({
  className:
    'mt-4 text-[21px] font-medium leading-none tracking-[-0.04em] text-[#003f35] md:mt-6 md:text-[26px] xl:text-[29px]',
})``

const Divider = styled.div.attrs({
  className:
    'my-5 h-[2px] w-[46px] bg-[#2c8335] md:my-5 md:w-[56px]',
})``

const TimeRow = styled.div.attrs({
  className:
    'flex items-center gap-4 text-[16px] font-semibold tracking-[-0.02em] text-[#003f35] md:text-[18px] xl:text-[20px]',
})``

const StyledClock = styled(Clock).attrs({
  className:
    'h-7 w-7 stroke-[1.8] text-[#2c8335] md:h-8 md:w-8',
})``

const Allergens = styled.div.attrs({
  className: 'mt-6 md:mt-7',
})``

const AllergensLabel = styled.p.attrs({
  className:
    'text-[12px] font-extrabold uppercase leading-none text-[#2c8335] md:text-[11px]',
})``

const AllergensText = styled.p.attrs({
  className:
    'mt-2 text-[16px] font-medium leading-none tracking-[-0.02em] text-[#003f35] md:mt-2 md:text-[14px]',
})``

const LunchImage = styled.img.attrs({
  className:
    'h-[170px] w-full rounded-[8px] object-cover object-center shadow-[0_12px_32px_rgba(20,35,28,0.12)] md:mt-[4px] md:h-full md:w-120 md:justify-self-end xl:h-[310px] xl:w-[150px]',
})``

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
          <AllergensText>{lunch.allergens.join(', ')}</AllergensText>
        </Allergens>
      </TextColumn>

      <LunchImage src={lasagneImage} alt={lunch.title} />
    </LunchSection>
  )
}