import { LunchCard } from '@/components/LunchCard'
import { WeeklyMenuCard } from '@/components/WeeklyMenuCard'
import { todayLunch, weeklyMenu } from '@/data/mockMenu'

export function HomePage() {
  return (
    <main className="bg-[#fbfaf6]">
      <section className="px-[26px] pb-[27px] pt-[47px] md:px-[54px] md:pb-[48px] md:pt-[58px]">
        <LunchCard lunch={todayLunch} />

        <section className="mt-[26px] md:mt-[44px]" aria-labelledby="weekly-menu-heading">
          <h2 id="weekly-menu-heading" className="text-[19px] font-black uppercase leading-none tracking-[-0.055em] text-[#003f35] md:text-[30px]">
            Ukesmeny
          </h2>
          <div className="mt-[14px] grid gap-[8px] md:mt-[27px] md:grid-cols-5 md:gap-[27px]">
            {weeklyMenu.map((item) => (
              <WeeklyMenuCard item={item} key={item.day} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
