import { Container } from '@/components/Container'

export function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white py-10">
      <Container>
        <div className="flex flex-col gap-3 text-lg text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-black text-slate-950">Kontakt</p>
          <address className="flex flex-col gap-2 not-italic sm:flex-row sm:items-center sm:gap-6">
            <a className="font-bold hover:text-primary" href="mailto:kantine@y3.no">kantine@y3.no</a>
            <a className="font-bold hover:text-primary" href="tel:+4712345678">12 34 56 78</a>
          </address>
        </div>
      </Container>
    </footer>
  )
}
