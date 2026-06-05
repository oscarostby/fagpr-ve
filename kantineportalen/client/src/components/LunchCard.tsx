import { Clock } from 'lucide-react'

import { FoodPlaceholder } from '@/components/FoodPlaceholder'
import type { Lunch } from '@/types/menu'

type LunchCardProps = {
  lunch: Lunch
}

export function LunchCard({ lunch }: LunchCardProps) {
  return (
    <section className="grid items-center gap-8 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:gap-10">
      <div>
        <p className="mb-4 text-[18px] font-bold uppercase leading-none text-[#2c8335]">I DAG</p>
        <h1 className="text-[48px] font-black leading-[0.9] tracking-[-0.07em] text-[#003f35] sm:text-[60px] md:text-[72px]">
          <span className="block">DAGENS</span>
          <span className="block">LUNSJ</span>
        </h1>
        <p className="mt-6 text-[28px] font-semibold leading-none tracking-[-0.055em] text-[#003f35] md:text-[32px]">
          {lunch.title}
        </p>
        <div className="my-6 h-1 w-[120px] bg-[#2c8335]" />

        <div className="flex items-center gap-4 text-[18px] font-semibold tracking-[-0.035em] text-[#003f35]">
          <Clock className="h-8 w-8 stroke-[1.9] text-[#2c8335]" aria-hidden="true" />
          <span>{lunch.servingTime}</span>
        </div>

        <div className="mt-7">
          <p className="text-[14px] font-bold uppercase leading-none text-[#2c8335]">Allergener</p>
          <p className="mt-3 text-[18px] font-medium tracking-[-0.035em] text-[#003f35]">
            {lunch.allergens.join(', ')}
          </p>
        </div>
      </div>

      <FoodPlaceholder className="h-[170px] w-full md:h-[330px]" />
    </section>
  )
}
