import { Button } from '@/components/ui/button'
import './styles/global.css'

function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-8 text-foreground">
      <section className="w-full max-w-3xl rounded-3xl border bg-card p-8 shadow-2xl shadow-slate-900/10 sm:p-14">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Fagprøveprosjekt
        </p>
        <h1 className="text-5xl font-black tracking-tight text-card-foreground sm:text-7xl">
          Kantineportalen
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Startpunkt for en React- og Vite-basert kantineportal med Tailwind CSS,
          lokal Inter-font og shadcn/ui-struktur klar for videre utvikling.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button>Kom i gang</Button>
          <Button variant="outline">Se struktur</Button>
        </div>
      </section>
    </main>
  )
}

export default App
