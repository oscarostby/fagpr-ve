import lightLogo from '@/assets/images/logosommer.png'

export function Header() {
  return (
    <header className="relative h-[78px] overflow-hidden bg-[#083d34] text-white md:h-[78px]">
      <div className="absolute bottom-0 left-[270px] hidden h-5 w-16 rounded-tl-[28px] bg-[#fbfbf7] md:block" />
      <div className="absolute bottom-0 left-[92px] h-3 w-12 rounded-tl-[22px] bg-[#fbfbf7] md:hidden" />
      <a href="/" aria-label="Kantineportalen forside" className="relative z-10 flex h-full items-center gap-4 px-8 md:px-10">
        <img src={lightLogo} alt="Kantineportalen logo" className="h-11 w-11 object-contain md:h-12 md:w-12" />
        <span className="text-[18px] font-extrabold tracking-[-0.03em] md:text-[19px]">Kantineportalen</span>
      </a>
    </header>
  )
}
