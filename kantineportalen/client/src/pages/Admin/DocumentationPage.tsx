import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CookingPot,
  Image,
  Leaf,
  ShieldCheck,
  Sprout,
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
    icon: CalendarDays,
    title: 'Sett opp ukemenyen',
    description: 'Velg hvilken rett som skal serveres hver ukedag.',
    steps: [
      'Åpne Hjem fra menyen.',
      'Trykk på boksen for dagen du vil endre.',
      'Velg en rett fra listen.',
      'Valget lagres automatisk. Bildet vises som forhåndsvisning i dagsboksen.',
    ],
    link: '/admin',
    linkLabel: 'Gå til ukemenyen',
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
]

export function DocumentationPage() {
  return (
    <section className="documentation-admin">
      <header className="admin-page-heading">
        <div>
          <h1>Dokumentasjon</h1>
          <p>En enkel guide til hvordan Kantineportalen administreres</p>
        </div>
      </header>

      <div className="documentation-intro">
        <span className="documentation-intro-icon">
          <BookOpen aria-hidden="true" size={25} strokeWidth={1.8} />
        </span>
        <div>
          <h2>Kom raskt i gang</h2>
          <p>
            Start med å opprette allergier og retter. Deretter kan rettene legges inn på riktige dager i ukemenyen.
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
