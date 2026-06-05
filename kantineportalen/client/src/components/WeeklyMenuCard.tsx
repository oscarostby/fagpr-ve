import type { WeeklyMenuItem } from '@/types/menu'
import { MenuIcon } from '@/components/MenuIcon'

type WeeklyMenuCardProps = {
  item: WeeklyMenuItem
}

export function WeeklyMenuCard({ item }: WeeklyMenuCardProps) {
  return (
    <article className="flex h-[55px] items-center justify-between rounded-[8px] bg-[#f1f3ee] px-[14px] text-[#003f35] md:h-[310px] md:flex-col md:justify-start md:rounded-[10px] md:px-[24px] md:py-[40px]">
      <div className="min-w-0 md:text-center">
        <p className="text-[8px] font-black uppercase leading-none text-[#2c8335] md:text-[13px]">{item.day}</p>
        <h3 className="mt-[7px] max-w-[210px] text-[11px] font-bold leading-[1.15] tracking-[-0.04em] md:mt-[34px] md:max-w-[160px] md:text-[22px] md:leading-[1.18]">
          {item.title}
        </h3>
      </div>
      <MenuIcon type={item.icon} className="h-[39px] w-[39px] shrink-0 text-[#2c8335] md:mt-auto md:h-[62px] md:w-[62px]" />
    </article>
  )
}
