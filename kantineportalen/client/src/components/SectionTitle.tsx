import styled from 'styled-components'

type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
}

const Wrapper = styled.div.attrs({
  className: 'space-y-3',
})``

const Eyebrow = styled.p.attrs({
  className: 'text-sm font-black uppercase tracking-[0.28em] text-primary',
})``

const Content = styled.div.attrs({
  className: 'space-y-4',
})``

const Title = styled.h2.attrs({
  className: 'text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl',
})``

const Description = styled.p.attrs({
  className: 'max-w-2xl text-lg leading-8 text-slate-600',
})``

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <Wrapper>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Content>
        <Title>{title}</Title>
        {description ? <Description>{description}</Description> : null}
      </Content>
    </Wrapper>
  )
}
