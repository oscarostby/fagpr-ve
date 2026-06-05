import styled from 'styled-components'
import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ContainerProps = {
  children: ReactNode
  className?: string
}

const StyledContainer = styled.div.attrs<Pick<ContainerProps, 'className'>>(({ className }) => ({
  className: cn('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10', className),
}))``

export function Container({ children, className }: ContainerProps) {
  return <StyledContainer className={className}>{children}</StyledContainer>
}
