import lightLogo from '@/assets/images/logosommer.png'

export function Header() {
  return (
    <header className="relative h-16 w-full overflow-hidden bg-[#003f35] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(90deg,#00382f_0%,#00493d_50%,#00372f_100%)]" />
      <div className="absolute bottom-[-1px] left-1/2 h-3 w-[60px] -translate-x-1/2 rounded-tl-[22px] bg-[#fbfaf6]" />

      <a href="/" aria-label="Kantineportalen forside" className="relative z-10 flex h-full items-center gap-4 pl-6">
        <img src={lightLogo} alt="Kantineportalen logo" className="h-10 w-10 object-contain" />
        <span className="text-[22px] font-bold tracking-[-0.05em] text-white">Kantineportalen</span>
      </a>
    </header>
  )
}
