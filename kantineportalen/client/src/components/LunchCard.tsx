import { Clock } from 'lucide-react'

import type { Lunch } from '@/types/menu'
import lasagneImage from '@/assets/images/lasagne-salat.png'

type LunchCardProps = {
  lunch: Lunch
}

export function LunchCard({ lunch }: LunchCardProps) {
  return (
    <section className="grid items-start gap-8 md:grid-cols-[1fr_1.05fr] md:gap-16 lg:gap-20">
      <div className="pt-3 md:pt-8">
        <p className="mb-3 text-[13px] font-black uppercase tracking-[0.02em] text-[#2f8035] md:text-[15px]">I DAG</p>
        <h1 className="text-[34px] font-black leading-[0.96] tracking-[-0.055em] text-[#0d3831] md:text-[44px] lg:text-[49px]">
          DAGENS LUNSJ
        </h1>
        <p className="mt-4 text-[22px] font-medium leading-tight tracking-[-0.04em] text-[#0d3831] md:text-[31px]">
          {lunch.title}
        </p>
        <div className="mt-3 h-[2px] w-8 bg-[#2f8035] md:mt-5 md:h-[3px] md:w-36" />

        <div className="mt-5 flex items-center gap-3 text-[14px] font-semibold text-[#0d3831] md:mt-6 md:text-[19px]">
          <Clock className="h-6 w-6 stroke-[1.8] text-[#2f8035] md:h-8 md:w-8" aria-hidden="true" />
          <span>{lunch.servingTime}</span>
        </div>

        <div className="mt-7 md:mt-8">
          <p className="text-[10px] font-black uppercase leading-none text-[#2f8035] md:text-[13px]">Allergener</p>
          <p className="mt-2 text-[13px] font-medium text-[#0d3831] md:text-[17px]">{lunch.allergens.join(', ')}</p>
        </div>
      </div>

      <img
        src={lasagneImage}
        alt="Lasagne med salat"
        className="h-[105px] w-full rounded-[6px] object-cover shadow-[0_12px_34px_rgba(20,35,28,0.14)] md:mt-0 md:h-[274px] md:rounded-[7px]"
      />
    </section>
  )
}
