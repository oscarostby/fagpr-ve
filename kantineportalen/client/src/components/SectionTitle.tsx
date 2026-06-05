type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-sm font-black uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      ) : null}
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description ? <p className="max-w-2xl text-lg leading-8 text-slate-600">{description}</p> : null}
      </div>
    </div>
  )
}
