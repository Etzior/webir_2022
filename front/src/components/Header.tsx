import React from 'react'
import styled from 'styled-components'

import { Card } from './Card'

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 32px;
`


export const Header = () => {
  return (
    <Card>
      <HeaderContent>
        <p>Búsqueda</p>
        <input />
      </HeaderContent>
    </Card>
  )
}
