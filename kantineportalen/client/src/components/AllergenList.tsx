import styled from 'styled-components'

type AllergenListProps = {
  allergens: string[]
}

const List = styled.ul.attrs({
  className: 'flex flex-wrap gap-3',
})``

const Item = styled.li.attrs({
  className: 'rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-base font-bold text-slate-800 shadow-sm',
})``

export function AllergenList({ allergens }: AllergenListProps) {
  return (
    <List aria-label="Allergener">
      {allergens.map((allergen) => (
        <Item key={allergen}>{allergen}</Item>
      ))}
    </List>
  )
}
