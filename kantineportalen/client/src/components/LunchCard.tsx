import { Clock } from 'lucide-react'

import type { Lunch } from '@/types/menu'
import lasagneImage from '@/assets/images/lasagne-salat.png'

type LunchCardProps = {
  lunch: Lunch
}

export function LunchCard({ lunch }: LunchCardProps) {
  return (
    <section className="grid items-center gap-6 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:gap-10">
      <div>
        <p className="mb-3 text-[14px] font-bold uppercase leading-none text-[#2c8335] md:text-[18px]">I DAG</p>
        <h1 className="text-[40px] font-black leading-[0.9] tracking-[-0.07em] text-[#003f35] sm:text-[52px] md:whitespace-nowrap md:text-[61px]">
          DAGENS LUNSJ
        </h1>
        <p className="mt-5 text-[24px] font-semibold leading-none tracking-[-0.055em] text-[#003f35] md:text-[32px]">
          {lunch.title}
        </p>
        <div className="my-5 h-1 w-[90px] bg-[#2c8335] md:my-6 md:w-[120px]" />

        <div className="flex items-center gap-4 text-[16px] font-semibold tracking-[-0.035em] text-[#003f35] md:text-[18px]">
          <Clock className="h-7 w-7 stroke-[1.9] text-[#2c8335] md:h-8 md:w-8" aria-hidden="true" />
          <span>{lunch.servingTime}</span>
        </div>

        <div className="mt-6 md:mt-7">
          <p className="text-[12px] font-bold uppercase leading-none text-[#2c8335] md:text-[14px]">Allergener</p>
          <p className="mt-2 text-[16px] font-medium tracking-[-0.035em] text-[#003f35] md:mt-3 md:text-[18px]">
            {lunch.allergens.join(', ')}
          </p>
        </div>
      </div>

      <img
        src={lasagneImage}
        alt="Lasagne med salat"
        className="h-[130px] w-full rounded-xl object-cover shadow-[0_12px_32px_rgba(20,35,28,0.14)] md:h-[360px]"
      />
    </section>
  )
}
