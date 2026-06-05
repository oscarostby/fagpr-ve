import { MenuIcon } from '@/components/MenuIcon'
import type { WeeklyMenuItem } from '@/types/menu'

type WeeklyMenuCardProps = {
  item: WeeklyMenuItem
  isToday?: boolean
}

export function WeeklyMenuCard({ item, isToday = false }: WeeklyMenuCardProps) {
  return (
    <article
      className={`flex h-[46px] items-center justify-between rounded-[7px] bg-[#f1f3ee] px-3 text-[#003f35] md:h-[165px] md:flex-col md:justify-start md:rounded-xl md:px-5 md:py-6 ${
        isToday ? 'border border-[#2c8335]' : 'border border-[#e7eae2]'
      }`}
    >
      <div className="min-w-0 md:text-center">
        <p className="text-[8px] font-bold uppercase leading-none text-[#2c8335] md:text-[12px]">{item.day}</p>
        <h3 className="mt-1.5 max-w-[220px] text-[10px] font-bold leading-[1.15] tracking-[-0.04em] md:mt-5 md:max-w-[150px] md:text-[16px] md:leading-[1.2]">
          {item.title}
        </h3>
      </div>
      <MenuIcon type={item.icon} className="h-8 w-8 shrink-0 text-[#2c8335] md:mt-auto md:h-[50px] md:w-[50px]" />
    </article>
  )
}
