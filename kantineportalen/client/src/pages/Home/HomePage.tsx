import { CalendarDays } from 'lucide-react'

import { Container } from '@/components/Container'
import { LunchCard } from '@/components/LunchCard'
import { SectionTitle } from '@/components/SectionTitle'
import { WeeklyMenuCard } from '@/components/WeeklyMenuCard'
import { todayLunch, weeklyMenu } from '@/data/mockMenu'

export function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,188,212,0.20),transparent_34%),linear-gradient(180deg,#f7fdff_0%,#eef9ff_100%)]" />
        <Container className="space-y-8">
          <LunchCard lunch={todayLunch} />
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="weekly-menu-heading">
        <Container className="space-y-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="UKEPLAN"
              title="Ukens meny"
              description="Rask oversikt over lunsjen hele arbeidsuken."
            />
            <div className="inline-flex w-fit items-center gap-3 rounded-full bg-cyan-50 px-5 py-3 text-base font-extrabold text-slate-700">
              <CalendarDays className="h-5 w-5 text-secondary" aria-hidden="true" />
              Mandag - fredag
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {weeklyMenu.map((item, index) => (
              <WeeklyMenuCard item={item} isToday={index === 0} key={item.day} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
