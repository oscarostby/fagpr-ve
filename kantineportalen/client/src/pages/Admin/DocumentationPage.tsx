import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CookingPot,
  Image,
  Leaf,
  LogOut,
  Pencil,
  ShieldCheck,
  Sprout,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const guides = [
  {
    icon: CookingPot,
    title: 'Opprett en ny rett',
    description: 'Lag retten før du legger den inn i ukemenyen.',
    steps: [
      'Åpne Retter fra menyen.',
      'Fyll inn navn, beskrivelse og last opp et bilde.',
      'Velg allergier og kostholdsmerker som vegetar, vegansk, halal eller kosher.',
      'Trykk Opprett rett. Retten blir tilgjengelig i ukemenyen med en gang.',
    ],
    link: '/admin/retter',
    linkLabel: 'Gå til retter',
  },
  {
    icon: Image,
    title: 'Last opp bilder',
    description: 'Alle nye retter må ha et bilde før de kan lagres.',
    steps: [
      'Velg bildeområdet i Opprett rett-skjemaet.',
      'Velg en JPG-, PNG- eller WEBP-fil på maksimalt 5 MB.',
      'Kontroller forhåndsvisningen før retten lagres.',
      'Ved redigering beholdes det gamle bildet hvis du ikke velger et nytt.',
    ],
    link: '/admin/retter',
    linkLabel: 'Last opp bilde',
  },
  {
    icon: Sprout,
    title: 'Administrer allergier',
    description: 'Opprett allergier før de knyttes til en rett.',
    steps: [
      'Åpne Allergier fra menyen.',
      'Skriv navnet på allergien og trykk Opprett allergi.',
      'Bruk Rediger eller Slett på en registrert allergi ved behov.',
      'Gå deretter til Retter for å knytte allergien til riktige retter.',
    ],
    link: '/admin/allergier',
    linkLabel: 'Gå til allergier',
  },
  {
    icon: CalendarDays,
    title: 'Administrer ukemenyen',
    description: 'Velg hvilken rett som skal serveres hver ukedag.',
    steps: [
      'Åpne Hjem fra adminmenyen.',
      'Trykk på dagsboksen du vil endre.',
      'Velg en eksisterende rett, eller bruk Opprett ny rett nederst i listen.',
      'Valget lagres automatisk og vises på den offentlige forsiden.',
    ],
    link: '/admin',
    linkLabel: 'Gå til ukemenyen',
  },
  {
    icon: Pencil,
    title: 'Rediger eller slett innhold',
    description: 'Hold eksisterende retter og allergier oppdatert.',
    steps: [
      'Finn retten eller allergien i oversikten.',
      'Trykk Rediger for å hente informasjonen inn i skjemaet.',
      'Gjør endringene og lagre dem.',
      'Bruk Slett bare når innholdet ikke lenger skal være tilgjengelig.',
    ],
    link: '/admin/retter',
    linkLabel: 'Administrer innhold',
  },
]

const tips = [
  {
    icon: Image,
    title: 'Bruk tydelige bilder',
    text: 'Velg et lyst bilde hvor hele retten er synlig. JPG, PNG og WEBP støttes.',
  },
  {
    icon: ShieldCheck,
    title: 'Kontroller allergier',
    text: 'Sjekk alltid allergier før retten publiseres. Informasjonen vises til gjestene.',
  },
  {
    icon: Leaf,
    title: 'Merk kosthold riktig',
    text: 'Velg bare vegetar, vegansk, halal eller kosher når retten faktisk oppfyller kravet.',
  },
  {
    icon: CheckCircle2,
    title: 'Sjekk forsiden',
    text: 'Åpne den offentlige forsiden etter endringer for å kontrollere bilder og informasjon.',
  },
  {
    icon: LogOut,
    title: 'Logg ut etter bruk',
    text: 'Bruk Logg ut nederst i adminmenyen når du er ferdig, særlig på delte datamaskiner.',
  },
  {
    icon: Wrench,
    title: 'Ved feil',
    text: 'Oppdater siden og prøv igjen. Kontroller bildeformat og felt. Kontakt systemansvarlig hvis feilen fortsetter.',
  },
]

export function DocumentationPage() {
  return (
    <section className="documentation-admin">
      <header className="admin-page-heading">
        <div>
          <h1>Brukerveiledning</h1>
          <p>Hvordan bruke løsningen og administrere innhold i Kantineportalen</p>
        </div>
      </header>

      <div className="documentation-intro">
        <span className="documentation-intro-icon">
          <BookOpen aria-hidden="true" size={25} strokeWidth={1.8} />
        </span>
        <div>
          <h2>Hvordan bruke løsningen</h2>
          <p>
            Opprett nødvendige allergier og retter, og legg deretter rettene inn på riktige dager i ukemenyen.
            Endringene vises på den offentlige forsiden.
          </p>
        </div>
      </div>

      <div className="documentation-guide-grid">
        {guides.map((guide, guideIndex) => {
          const Icon = guide.icon

          return (
            <article className="documentation-guide" key={guide.title}>
              <div className="documentation-guide-heading">
                <span className="documentation-guide-icon">
                  <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                </span>
                <div>
                  <span className="admin-eyebrow">Del {guideIndex + 1}</span>
                  <h2>{guide.title}</h2>
                </div>
              </div>
              <p className="documentation-guide-description">{guide.description}</p>
              <ol className="documentation-steps">
                {guide.steps.map((step, stepIndex) => (
                  <li key={step}>
                    <span>{stepIndex + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
              <Link className="admin-secondary-button documentation-link" to={guide.link}>
                {guide.linkLabel}
              </Link>
            </article>
          )
        })}
      </div>

      <section className="documentation-tips" aria-labelledby="documentation-tips-heading">
        <div className="dish-library-heading">
          <div>
            <span className="admin-eyebrow">Husk dette</span>
            <h2 id="documentation-tips-heading">Gode rutiner</h2>
          </div>
        </div>
        <div className="documentation-tip-grid">
          {tips.map((tip) => {
            const Icon = tip.icon

            return (
              <article className="documentation-tip" key={tip.title}>
                <span className="documentation-tip-icon">
                  <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <h3>{tip.title}</h3>
                  <p>{tip.text}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </section>
  )
}
