import React from 'react'
import styled from 'styled-components'

import { Card } from './Card'


export const Header = () => {
  return (
    <Card>
      <div className="h-16 flex items-center justify-center">
        <p className="m-2">Búsqueda</p>
        <input className="border-2 rounded-md" />
      </div>
    </Card>
  )
}
