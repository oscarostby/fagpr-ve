type AllergenListProps = {
  allergens: string[]
}

export function AllergenList({ allergens }: AllergenListProps) {
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Allergener">
      {allergens.map((allergen) => (
        <li
          className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-base font-bold text-slate-800 shadow-sm"
          key={allergen}
        >
          {allergen}
        </li>
      ))}
    </ul>
  )
}
