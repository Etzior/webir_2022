import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div<CardProps>`
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ flex }) => flex && 'display: flex;'}
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
`

interface CardProps {
  width?: string;
  height?: string;
  flex?: boolean;
  children?: React.ReactNode
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <StyledCard {...props} >{props.children}</StyledCard>
  )
}
