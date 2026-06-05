import lightLogo from '@/assets/images/logosommer.png'

export function Header() {
  return (
    <header className="relative h-[88px] overflow-hidden rounded-t-[14px] bg-[#003f35] text-white md:h-[126px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(90deg,#003f35_0%,#00473c_58%,#00382f_100%)]" />
      <div className="absolute bottom-[-1px] left-[55%] hidden h-[33px] w-[92px] -translate-x-1/2 rounded-tl-[48px] bg-[#fbfaf6] md:block" />
      <div className="absolute bottom-[-1px] left-[76%] h-[18px] w-[58px] -translate-x-1/2 rounded-tl-[34px] bg-[#fbfaf6] md:hidden" />

      <a href="/" aria-label="Kantineportalen forside" className="relative z-10 flex h-full items-center gap-[14px] px-[26px] md:gap-[22px] md:px-[40px]">
        <img src={lightLogo} alt="Kantineportalen logo" className="h-[46px] w-[46px] object-contain md:h-[64px] md:w-[64px]" />
        <span className="text-[19px] font-black tracking-[-0.055em] md:text-[30px]">Kantineportalen</span>
      </a>
    </header>
  )
}
