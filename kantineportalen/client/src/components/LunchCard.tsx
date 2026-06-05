import { Clock } from 'lucide-react'

import type { Lunch } from '@/types/menu'
import { FoodPlaceholder } from '@/components/FoodPlaceholder'

type LunchCardProps = {
  lunch: Lunch
}

export function LunchCard({ lunch }: LunchCardProps) {
  return (
    <section className="grid items-start gap-[24px] md:grid-cols-[0.82fr_1fr] md:gap-[74px]">
      <div className="md:pt-[43px]">
        <p className="mb-[8px] text-[12px] font-black uppercase leading-none tracking-[-0.01em] text-[#2c8335] md:mb-[17px] md:text-[17px]">
          I DAG
        </p>
        <h1 className="text-[30px] font-black leading-[0.98] tracking-[-0.065em] text-[#003f35] md:text-[58px]">
          DAGENS LUNSJ
        </h1>
        <p className="mt-[20px] text-[23px] font-medium leading-none tracking-[-0.055em] text-[#003f35] md:mt-[31px] md:text-[35px]">
          {lunch.title}
        </p>
        <div className="mt-[19px] h-[2px] w-[46px] bg-[#2c8335] md:mt-[32px] md:h-[3px] md:w-[74px]" />

        <div className="mt-[20px] flex items-center gap-[14px] text-[16px] font-bold tracking-[-0.04em] text-[#003f35] md:mt-[40px] md:gap-[22px] md:text-[24px]">
          <Clock className="h-[26px] w-[26px] stroke-[1.9] text-[#2c8335] md:h-[38px] md:w-[38px]" aria-hidden="true" />
          <span>{lunch.servingTime}</span>
        </div>

        <div className="mt-[24px] md:mt-[43px]">
          <p className="text-[10px] font-black uppercase leading-none tracking-[-0.01em] text-[#2c8335] md:text-[14px]">Allergener</p>
          <p className="mt-[8px] text-[14px] font-semibold tracking-[-0.04em] text-[#003f35] md:mt-[13px] md:text-[21px]">
            {lunch.allergens.join(', ')}
          </p>
        </div>
      </div>

      <FoodPlaceholder className="h-[118px] w-full md:h-[476px]" />
    </section>
  )
}
