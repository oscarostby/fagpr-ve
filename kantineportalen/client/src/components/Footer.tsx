function LeafGraphic() {
  return (
    <svg viewBox="0 0 150 160" aria-hidden="true" className="absolute bottom-[-6px] left-[25px] h-[126px] w-[128px] text-[#2c8335] md:bottom-[-8px] md:left-[50px] md:h-[162px] md:w-[158px]">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45">
        <path d="M10 158C41 112 58 68 54 12" />
        <path d="M55 13C83 31 93 58 84 90 59 73 50 45 55 13Z" />
        <path d="M32 117C56 104 82 108 104 128 75 144 51 140 32 117Z" />
        <path d="M48 88C65 66 88 58 119 64 99 88 74 100 48 88Z" />
        <path d="M16 152 69 104" />
      </g>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative h-[144px] overflow-hidden bg-[#f1f4ec] md:h-[184px]">
      <LeafGraphic />
      <div className="absolute bottom-0 left-0 h-[5px] w-full bg-[#2c8335]" />
      <div className="ml-[54%] flex h-full items-center gap-[28px] md:ml-[75%] md:gap-[46px]">
        <div className="h-[72px] w-px bg-[#2c8335] md:h-[99px]" />
        <address className="not-italic text-[#003f35]">
          <p className="text-[11px] font-black uppercase leading-none text-[#2c8335] md:text-[14px]">Kontakt</p>
          <a className="mt-[19px] block text-[12px] font-semibold tracking-[-0.04em] hover:underline md:text-[15px]" href="mailto:kantine@y3.no">kantine@y3.no</a>
          <a className="mt-[12px] block text-[12px] font-semibold tracking-[-0.04em] hover:underline md:text-[15px]" href="tel:+4712345678">12 34 56 78</a>
        </address>
      </div>
    </footer>
  )
}
