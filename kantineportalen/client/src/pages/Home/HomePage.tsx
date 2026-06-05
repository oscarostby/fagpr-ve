import { LunchCard } from '@/components/LunchCard'
import { WeeklyMenuCard } from '@/components/WeeklyMenuCard'
import { todayLunch, weeklyMenu } from '@/data/mockMenu'

export function HomePage() {
  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-8 pb-0 pt-10">
        <LunchCard lunch={todayLunch} />

        <section className="mt-6" aria-labelledby="weekly-menu-heading">
          <h2 id="weekly-menu-heading" className="mb-6 text-[26px] font-extrabold uppercase leading-none tracking-[-0.055em] text-[#003f35] md:text-[32px]">
            Ukesmeny
          </h2>
          <div className="grid gap-2 md:grid-cols-5 md:gap-5">
            {weeklyMenu.map((item, index) => (
              <WeeklyMenuCard item={item} isToday={index === 0} key={item.day} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
