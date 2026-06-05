import { Clock, Info } from 'lucide-react'

import type { Lunch } from '@/types/menu'
import { AllergenList } from '@/components/AllergenList'

import utensilIcon from '@/assets/icons/utensils.svg'

type LunchCardProps = {
  lunch: Lunch
}

export function LunchCard({ lunch }: LunchCardProps) {
  return (
    <article className="grid gap-6 rounded-[2rem] border border-white/80 bg-white p-5 shadow-xl shadow-sky-900/10 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:p-8">
      <div className="flex min-h-[320px] flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 sm:p-8">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-primary">I DAG</p>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            DAGENS LUNSJ
          </h1>
          <p className="mt-7 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            {lunch.title}
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-xl font-extrabold text-slate-900 shadow-sm ring-1 ring-slate-100">
            <Clock className="h-7 w-7 text-primary" aria-hidden="true" />
            <span>{lunch.servingTime}</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-base font-black uppercase tracking-[0.18em] text-slate-500">
              <Info className="h-5 w-5 text-secondary" aria-hidden="true" />
              Allergener
            </div>
            <AllergenList allergens={lunch.allergens} />
          </div>
        </div>
      </div>

      <div className="relative min-h-[260px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary via-sky-400 to-secondary p-6 shadow-inner sm:min-h-[340px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.42),transparent_30%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.24),transparent_34%)]" />
        <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center rounded-[1.25rem] border border-white/40 bg-white/25 p-8 text-center backdrop-blur-sm sm:min-h-[292px]">
          <img className="h-28 w-28 drop-shadow-xl sm:h-36 sm:w-36" src={utensilIcon} alt="Illustrasjon av mat" />
          <p className="mt-6 max-w-xs text-2xl font-black leading-tight text-white drop-shadow-sm">
            Bildeplassholder for dagens mat
          </p>
        </div>
      </div>
    </article>
  )
}
