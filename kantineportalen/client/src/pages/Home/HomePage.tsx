import { LunchCard } from '@/components/LunchCard'
import { WeeklyMenuCard } from '@/components/WeeklyMenuCard'
import { todayLunch, weeklyMenu } from '@/data/mockMenu'

export function HomePage() {
  return (
    <main className="bg-[#fbfbf7]">
      <section className="mx-auto max-w-[1440px] px-8 pb-[30px] pt-[26px] md:px-10 md:pb-[32px] md:pt-[30px] lg:px-[33px]">
        <LunchCard lunch={todayLunch} />

        <section className="mt-8 md:mt-[31px]" aria-labelledby="weekly-menu-heading">
          <h2 id="weekly-menu-heading" className="text-[19px] font-black uppercase tracking-[-0.03em] text-[#0d3831] md:text-[22px]">
            Ukesmeny
          </h2>
          <div className="mt-3 grid gap-[7px] md:mt-[15px] md:grid-cols-5 md:gap-[15px] lg:gap-[16px]">
            {weeklyMenu.map((item, index) => (
              <WeeklyMenuCard item={item} isToday={index === 0} key={item.day} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
