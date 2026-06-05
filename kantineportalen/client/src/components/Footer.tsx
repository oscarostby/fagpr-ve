function LeafGraphic() {
  return (
    <svg viewBox="0 0 150 150" aria-hidden="true" className="absolute bottom-[-8px] left-8 h-[116px] w-[116px] text-[#2c8335] md:left-10">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45">
        <path d="M10 148C40 106 57 65 53 13" />
        <path d="M54 14C81 30 90 56 82 86 58 70 49 44 54 14Z" />
        <path d="M31 112C54 99 79 103 101 121 73 137 50 133 31 112Z" />
        <path d="M47 84C64 63 86 56 116 62 96 85 72 96 47 84Z" />
        <path d="M16 142 68 99" />
      </g>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative mt-0 h-[120px] overflow-hidden bg-[#f1f4ec]">
      <LeafGraphic />
      <div className="absolute bottom-0 left-0 h-[4px] w-full bg-[#2c8335]" />
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-end gap-8 px-8 md:gap-10">
        <div className="h-[72px] w-px bg-[#2c8335]" />
        <address className="w-[210px] not-italic text-[#003f35]">
          <p className="text-[14px] font-bold uppercase leading-none text-[#2c8335]">Kontakt</p>
          <a className="mt-4 block text-[15px] font-semibold tracking-[-0.035em] hover:underline" href="mailto:kantine@bedrift.no">kantine@bedrift.no</a>
          <a className="mt-2 block text-[15px] font-semibold tracking-[-0.035em] hover:underline" href="tel:+4712345678">12 34 56 78</a>
        </address>
      </div>
    </footer>
  )
}
