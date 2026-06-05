import styled from 'styled-components'

import vaarLogo from '@/assets/images/logovaar1.png'

const SiteHeader = styled.header.attrs({
  className:
    'relative h-[112px] shrink-0 overflow-hidden bg-[#1b332e] text-white',
})``

const HeaderGradient = styled.div.attrs({
  className:
    'absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(42,80,70,0.52),transparent_36%),linear-gradient(90deg,#15332d_0%,#1b332e_52%,#15302b_100%)]',
})``

const LightBottomBand = styled.div.attrs({
  className:
    'absolute bottom-0 left-[125px] right-0 z-0 flex h-[32px] md:left-[355px] md:h-[36px]',
})``

const CurveSvg = styled.svg.attrs({
  className:
    'h-full w-[95px] shrink-0 text-[#fbfaf6] md:w-[145px]',
})``

const LightBandFill = styled.div.attrs({
  className: 'h-full flex-1 bg-[#fbfaf6]',
})``

const HomeLink = styled.a.attrs({
  className:
    'relative z-10 flex h-full items-center gap-4 pl-[30px] md:gap-5 md:pl-[42px]',
})``

const LogoCrop = styled.span.attrs({
  className:
    'relative block h-[60px] w-[58px] shrink-0 overflow-hidden',
})``

const LogoImage = styled.img.attrs({
  className:
    'absolute left-[-58px] top-[-20px] h-[110px] w-[165px] max-w-none object-contain brightness-[0.98] saturate-[0.82] contrast-[1.05]',
})``

const BrandName = styled.span.attrs({
  className:
    'text-[18px] font-extrabold leading-none tracking-[-0.04em] text-[#f5f6f2] md:text-[24px]',
})``

export function Header() {
  return (
    <SiteHeader>
      <HeaderGradient />

      <LightBottomBand>
        <CurveSvg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M100 0 C54 0 48 100 0 100 H100 Z"
          />
        </CurveSvg>

        <LightBandFill />
      </LightBottomBand>

      <HomeLink href="/" aria-label="Kantineportalen forside">
        <LogoCrop aria-hidden="true">
          <LogoImage src={vaarLogo} alt="" />
        </LogoCrop>

        <BrandName>Kantineportalen</BrandName>
      </HomeLink>
    </SiteHeader>
  )
}