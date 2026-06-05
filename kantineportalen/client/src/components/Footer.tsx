function LeafGraphic() {
  return (
    <svg viewBox="0 0 130 110" aria-hidden="true" className="absolute bottom-0 left-6 h-[98px] w-[116px] text-[#2f8035] md:left-8 md:h-[100px] md:w-[122px]">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25">
        <path d="M4 108C27 79 40 47 38 13" />
        <path d="M39 14C61 26 68 45 62 66 44 55 37 37 39 14Z" />
        <path d="M22 82C39 73 57 75 73 88 53 99 36 96 22 82Z" />
        <path d="M34 63C45 48 60 42 80 45 67 62 51 69 34 63Z" />
        <path d="M9 104 47 73" />
      </g>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative mt-8 h-[100px] overflow-hidden bg-[#f1f4ec] md:mt-0 md:h-[115px]">
      <LeafGraphic />
      <div className="absolute bottom-0 left-0 h-[4px] w-full bg-[#2f8035]" />
      <div className="ml-[52%] flex h-full items-center gap-7 md:ml-[66%] md:gap-7">
        <div className="h-[44px] w-px bg-[#2f8035] md:h-[52px]" />
        <address className="not-italic text-[#0d3831]">
          <p className="text-[10px] font-black uppercase text-[#2f8035] md:text-[11px]">Kontakt</p>
          <a className="mt-3 block text-[11px] font-medium hover:underline md:text-[12px]" href="mailto:kantine@bedrift.no">kantine@bedrift.no</a>
          <a className="mt-2 block text-[11px] font-medium hover:underline md:text-[12px]" href="tel:+4712345678">12 34 56 78</a>
        </address>
      </div>
    </footer>
  )
}
