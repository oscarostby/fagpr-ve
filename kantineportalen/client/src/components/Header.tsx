import { Container } from '@/components/Container'
import lightLogo from '@/assets/images/logosommer.png'
import darkLogo from '@/assets/images/logosommer1.png'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-sky-100/80 bg-white/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4 sm:h-24">
        <a className="flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4" href="/" aria-label="Kantineportalen forside">
          <picture>
            <source srcSet={darkLogo} media="(prefers-color-scheme: dark)" />
            <img className="h-12 w-12 rounded-2xl object-cover shadow-md sm:h-14 sm:w-14" src={lightLogo} alt="Kantineportalen logo" />
          </picture>
          <span className="text-xl font-black tracking-tight text-slate-950 sm:text-3xl">Kantineportalen</span>
        </a>
        <div className="hidden rounded-full bg-sky-50 px-5 py-3 text-base font-bold text-slate-700 sm:block">
          Lunsj 11:00 - 13:00
        </div>
      </Container>
    </header>
  )
}
