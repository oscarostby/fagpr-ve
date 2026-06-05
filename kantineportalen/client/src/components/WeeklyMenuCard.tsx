import type { WeeklyMenuItem } from '@/types/menu'

type WeeklyMenuCardProps = {
  item: WeeklyMenuItem
  isToday?: boolean
}

export function WeeklyMenuCard({ item, isToday = false }: WeeklyMenuCardProps) {
  return (
    <article
      className={
        isToday
          ? 'rounded-[1.5rem] border-2 border-primary bg-white p-5 shadow-xl shadow-sky-900/10'
          : 'rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-lg shadow-slate-900/5'
      }
    >
      <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">{item.day}</p>
      <h3 className="mt-4 text-2xl font-extrabold leading-tight text-slate-950">{item.title}</h3>
      {isToday ? (
        <p className="mt-5 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-bold text-slate-700">
          Dagens meny
        </p>
      ) : null}
    </article>
  )
}
