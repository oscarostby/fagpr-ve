import type { WeeklyMenuItem } from '@/types/menu'
import { MenuIcon } from '@/components/MenuIcon'

type WeeklyMenuCardProps = {
  item: WeeklyMenuItem
  isToday?: boolean
}

export function WeeklyMenuCard({ item, isToday = false }: WeeklyMenuCardProps) {
  return (
    <article
      className={
        isToday
          ? 'flex min-h-[58px] items-center justify-between rounded-[7px] border border-[#2f8035] bg-[#f7f8f2] px-3 py-2 text-[#0d3831] md:min-h-[151px] md:flex-col md:justify-start md:rounded-[6px] md:px-5 md:py-[19px]'
          : 'flex min-h-[58px] items-center justify-between rounded-[7px] border border-transparent bg-[#f1f3ed] px-3 py-2 text-[#0d3831] md:min-h-[151px] md:flex-col md:justify-start md:rounded-[6px] md:px-5 md:py-[19px]'
      }
    >
      <div className="min-w-0 md:text-center">
        <p className="text-[8px] font-black uppercase leading-none text-[#2f8035] md:text-[10px]">{item.day}</p>
        <h3 className="mt-[7px] max-w-[190px] text-[10px] font-semibold leading-[1.22] tracking-[-0.02em] md:mt-4 md:max-w-[104px] md:text-[15px] md:leading-[1.25]">
          {item.title}
        </h3>
      </div>
      <MenuIcon type={item.icon} className="h-10 w-10 shrink-0 text-[#2f8035] md:mt-auto md:h-[52px] md:w-[52px]" />
    </article>
  )
}
