import { MenuIcon } from '@/components/MenuIcon'
import type { WeeklyMenuItem } from '@/types/menu'

type WeeklyMenuCardProps = {
  item: WeeklyMenuItem
}

export function WeeklyMenuCard({ item }: WeeklyMenuCardProps) {
  return (
    <article className="flex h-[58px] items-center justify-between rounded-xl border border-[#e7eae2] bg-[#f1f3ee] px-4 text-[#003f35] md:h-[220px] md:flex-col md:justify-start md:px-5 md:py-8">
      <div className="min-w-0 md:text-center">
        <p className="text-[10px] font-bold uppercase leading-none text-[#2c8335] md:text-[14px]">{item.day}</p>
        <h3 className="mt-2 max-w-[220px] text-[12px] font-bold leading-[1.15] tracking-[-0.04em] md:mt-7 md:max-w-[160px] md:text-[20px] md:leading-[1.15]">
          {item.title}
        </h3>
      </div>
      <MenuIcon type={item.icon} className="h-10 w-10 shrink-0 text-[#2c8335] md:mt-auto md:h-[64px] md:w-[64px]" />
    </article>
  )
}
