import styled from 'styled-components'

import leavesImage from '@/assets/images/blader.png'

const LeafCrop = styled.span.attrs({
  className: 'absolute bottom-[-6px] left-7 block h-[122px] w-[142px] overflow-hidden md:left-[42px] md:h-[128px] md:w-[150px]',
})``

const LeafImage = styled.img.attrs({
  className: 'absolute left-[-134px] top-[-44px] h-[235px] w-[353px] max-w-none object-contain mix-blend-multiply',
})``

const SiteFooter = styled.footer.attrs({
  className: 'relative mt-8 h-[122px] shrink-0 overflow-hidden bg-[#f1f4ec] md:mt-0 md:h-[125px]',
})``

const BottomRule = styled.div.attrs({
  className: 'absolute bottom-0 left-0 h-[4px] w-full bg-[#2c8335]',
})``

const FooterInner = styled.div.attrs({
  className: 'flex h-full w-full items-center justify-end gap-8 px-8 md:gap-10 md:px-[42px]',
})``

const Divider = styled.div.attrs({
  className: 'h-[72px] w-px bg-[#2c8335] md:h-[86px]',
})``

const ContactAddress = styled.address.attrs({
  className: 'w-[210px] not-italic text-[#003f35] md:w-[270px]',
})``

const ContactHeading = styled.p.attrs({
  className: 'text-[13px] font-extrabold uppercase leading-none text-[#2c8335] md:text-[14px]',
})``

const EmailLink = styled.a.attrs({
  className: 'mt-4 block text-[14px] font-semibold tracking-[-0.02em] hover:underline md:text-[15px]',
})``

const PhoneLink = styled.a.attrs({
  className: 'mt-2 block text-[14px] font-semibold tracking-[-0.02em] hover:underline md:text-[15px]',
})``

function LeafGraphic() {
  return (
    <LeafCrop aria-hidden="true">
      <LeafImage src={leavesImage} alt="" />
    </LeafCrop>
  )
}

export function Footer() {
  return (
    <SiteFooter>
      <LeafGraphic />
      <BottomRule />
      <FooterInner>
        <Divider />
        <ContactAddress>
          <ContactHeading>Kontakt</ContactHeading>
          <EmailLink href="mailto:kantine@bedrift.no">kantine@bedrift.no</EmailLink>
          <PhoneLink href="tel:+471****5678">12 34 56 78</PhoneLink>
        </ContactAddress>
      </FooterInner>
    </SiteFooter>
  )
}
