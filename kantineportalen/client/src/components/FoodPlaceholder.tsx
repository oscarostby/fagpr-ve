type FoodPlaceholderProps = {
  className?: string
}

export function FoodPlaceholder({ className = '' }: FoodPlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[14px] bg-[#eef0eb] text-center text-[#6d8479] shadow-[inset_0_0_42px_rgba(8,61,52,0.035)] ${className}`}
      aria-label="Bildeplassholder for dagens mat"
    >
      <svg className="h-[50px] w-[50px] md:h-[104px] md:w-[104px]" viewBox="0 0 104 104" fill="none" aria-hidden="true">
        <rect x="19" y="18" width="66" height="66" rx="12" stroke="currentColor" strokeWidth="3" />
        <circle cx="36" cy="35" r="9" stroke="currentColor" strokeWidth="3" />
        <path d="M22 74L47 49L60 62L69 53L84 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="mt-3 text-[11px] font-medium tracking-[-0.02em] text-[#0d3831] md:mt-7 md:text-[18px]">
        Bildeplassholder for dagens mat
      </p>
    </div>
  )
}
