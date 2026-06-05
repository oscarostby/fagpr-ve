import styled from 'styled-components'
import { AlertTriangle, Check, Plus, Save, Utensils } from 'lucide-react'

const allergenOptions = ['Gluten', 'Melk', 'Egg', 'Fisk', 'Nøtter', 'Soya']

const draftDishes = [
  {
    title: 'Lasagne med salat',
    day: 'Mandag',
    allergens: ['Gluten', 'Melk'],
  },
  {
    title: 'Fisk med poteter',
    day: 'Onsdag',
    allergens: ['Fisk', 'Melk'],
  },
]

const Section = styled.section.attrs({
  className:
    'mt-8 rounded-[8px] border border-[#dfe8dc] bg-[#f7f8f3] p-4 shadow-[0_10px_28px_rgba(20,35,28,0.06)] md:mt-7 md:p-5 xl:mt-8',
})``

const HeaderRow = styled.div.attrs({
  className:
    'flex flex-col gap-3 border-b border-[#dfe8dc] pb-4 md:flex-row md:items-center md:justify-between',
})``

const TitleGroup = styled.div.attrs({
  className: 'flex min-w-0 items-center gap-3',
})``

const IconFrame = styled.div.attrs({
  className:
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#dfeedd] text-[#2c8335]',
})``

const StyledUtensils = styled(Utensils).attrs({
  className: 'h-5 w-5',
  strokeWidth: 1.8,
})``

const Eyebrow = styled.p.attrs({
  className:
    'text-[10px] font-extrabold uppercase leading-none text-[#2c8335] md:text-[11px]',
})``

const Heading = styled.h2.attrs({
  className:
    'mt-1 text-[20px] font-black leading-none tracking-[-0.035em] text-[#003f35] md:text-[24px]',
})``

const StatusBadge = styled.div.attrs({
  className:
    'inline-flex w-fit items-center gap-2 rounded-[8px] border border-[#cdddc9] bg-[#fbfaf6] px-3 py-2 text-[12px] font-bold text-[#31584e]',
})``

const StyledAlertTriangle = styled(AlertTriangle).attrs({
  className: 'h-4 w-4 text-[#2c8335]',
  strokeWidth: 1.8,
})``

const ContentGrid = styled.div.attrs({
  className: 'mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]',
})``

const FormPanel = styled.div.attrs({
  className: 'grid gap-3 md:grid-cols-2',
})``

const WideField = styled.div.attrs({
  className: 'md:col-span-2',
})``

const Label = styled.label.attrs({
  className:
    'mb-2 block text-[11px] font-extrabold uppercase leading-none text-[#2c8335]',
})``

const FieldShell = styled.div.attrs({
  className:
    'min-h-11 rounded-[8px] border border-[#d5dfd1] bg-[#fbfaf6] px-3 py-3 text-[14px] font-semibold leading-tight text-[#003f35]',
})``

const TextAreaShell = styled(FieldShell).attrs({
  className:
    'min-h-[82px] rounded-[8px] border border-[#d5dfd1] bg-[#fbfaf6] px-3 py-3 text-[14px] font-semibold leading-[1.45] text-[#003f35]',
})``

const SelectShell = styled(FieldShell).attrs({
  className:
    'flex min-h-11 items-center justify-between rounded-[8px] border border-[#d5dfd1] bg-[#fbfaf6] px-3 py-3 text-[14px] font-semibold leading-tight text-[#003f35]',
})``

const MutedText = styled.span.attrs({
  className: 'text-[#6b827b]',
})``

const AllergenGrid = styled.div.attrs({
  className: 'grid grid-cols-2 gap-2 sm:grid-cols-3',
})``

const AllergenOption = styled.div.attrs<{ $selected?: boolean }>(({ $selected }) => ({
  className: `flex min-h-10 items-center gap-2 rounded-[8px] border px-3 text-[13px] font-bold ${
    $selected
      ? 'border-[#5ba05f] bg-[#e5f2df] text-[#003f35]'
      : 'border-[#d5dfd1] bg-[#fbfaf6] text-[#60766f]'
  }`,
}))``

const CheckBox = styled.span.attrs<{ $selected?: boolean }>(({ $selected }) => ({
  className: `flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border ${
    $selected
      ? 'border-[#2c8335] bg-[#2c8335] text-white'
      : 'border-[#b9c8b4] bg-white text-transparent'
  }`,
}))``

const StyledCheck = styled(Check).attrs({
  className: 'h-3.5 w-3.5',
  strokeWidth: 2.2,
})``

const PreviewPanel = styled.div.attrs({
  className: 'rounded-[8px] border border-[#dfe8dc] bg-[#fbfaf6] p-4',
})``

const PreviewHeader = styled.div.attrs({
  className: 'mb-3 flex items-center justify-between gap-3',
})``

const PreviewTitle = styled.h3.attrs({
  className:
    'text-[15px] font-extrabold uppercase leading-none text-[#003f35]',
})``

const AddButton = styled.button.attrs({
  className:
    'inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#2c8335] px-3 text-[12px] font-extrabold text-white opacity-70',
  disabled: true,
  type: 'button',
})``

const StyledPlus = styled(Plus).attrs({
  className: 'h-4 w-4',
  strokeWidth: 2,
})``

const DishList = styled.ul.attrs({
  className: 'grid gap-3',
})``

const DishItem = styled.li.attrs({
  className:
    'rounded-[8px] border border-[#e4ebe0] bg-[#f7f8f3] p-3',
})``

const DishMeta = styled.p.attrs({
  className:
    'text-[10px] font-extrabold uppercase leading-none text-[#2c8335]',
})``

const DishName = styled.p.attrs({
  className:
    'mt-1 text-[15px] font-extrabold leading-tight tracking-[-0.02em] text-[#003f35]',
})``

const ChipRow = styled.div.attrs({
  className: 'mt-3 flex flex-wrap gap-2',
})``

const Chip = styled.span.attrs({
  className:
    'rounded-[7px] border border-[#cdddc9] bg-[#fbfaf6] px-2.5 py-1 text-[11px] font-bold text-[#31584e]',
})``

const SaveButton = styled.button.attrs({
  className:
    'mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-[#003f35] px-4 text-[13px] font-extrabold text-white opacity-60 md:w-auto',
  disabled: true,
  type: 'button',
})``

const StyledSave = styled(Save).attrs({
  className: 'h-4 w-4',
  strokeWidth: 2,
})``

export function DishAdminPlaceholder() {
  return (
    <Section aria-labelledby="dish-admin-placeholder-heading">
      <HeaderRow>
        <TitleGroup>
          <IconFrame>
            <StyledUtensils aria-hidden="true" />
          </IconFrame>
          <div>
            <Eyebrow>Placeholder</Eyebrow>
            <Heading id="dish-admin-placeholder-heading">Retter og allergener</Heading>
          </div>
        </TitleGroup>

        <StatusBadge>
          <StyledAlertTriangle aria-hidden="true" />
          Backend kobles til senere
        </StatusBadge>
      </HeaderRow>

      <ContentGrid>
        <div>
          <FormPanel aria-label="Placeholder for retteskjema">
            <WideField>
              <Label htmlFor="dish-name-placeholder">Rett</Label>
              <FieldShell id="dish-name-placeholder">Eksempel: Kyllingwok med ris</FieldShell>
            </WideField>

            <div>
              <Label htmlFor="dish-day-placeholder">Dag</Label>
              <SelectShell id="dish-day-placeholder">
                Mandag
                <MutedText>Velg dag</MutedText>
              </SelectShell>
            </div>

            <div>
              <Label htmlFor="dish-time-placeholder">Serveringstid</Label>
              <FieldShell id="dish-time-placeholder">11:00 - 13:00</FieldShell>
            </div>

            <WideField>
              <Label htmlFor="dish-description-placeholder">Beskrivelse</Label>
              <TextAreaShell id="dish-description-placeholder">
                Kort beskrivelse av retten, tilbehør og eventuelle alternativer.
              </TextAreaShell>
            </WideField>

            <WideField>
              <Label>Allergener</Label>
              <AllergenGrid>
                {allergenOptions.map((allergen) => {
                  const selected = allergen === 'Gluten' || allergen === 'Melk'

                  return (
                    <AllergenOption $selected={selected} key={allergen}>
                      <CheckBox $selected={selected}>
                        <StyledCheck aria-hidden="true" />
                      </CheckBox>
                      {allergen}
                    </AllergenOption>
                  )
                })}
              </AllergenGrid>
            </WideField>
          </FormPanel>

          <SaveButton aria-disabled="true">
            <StyledSave aria-hidden="true" />
            Lagre rett
          </SaveButton>
        </div>

        <PreviewPanel>
          <PreviewHeader>
            <PreviewTitle>Utkast</PreviewTitle>
            <AddButton aria-disabled="true">
              <StyledPlus aria-hidden="true" />
              Ny rett
            </AddButton>
          </PreviewHeader>

          <DishList>
            {draftDishes.map((dish) => (
              <DishItem key={dish.title}>
                <DishMeta>{dish.day}</DishMeta>
                <DishName>{dish.title}</DishName>
                <ChipRow>
                  {dish.allergens.map((allergen) => (
                    <Chip key={allergen}>{allergen}</Chip>
                  ))}
                </ChipRow>
              </DishItem>
            ))}
          </DishList>
        </PreviewPanel>
      </ContentGrid>
    </Section>
  )
}
