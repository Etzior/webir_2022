import React from 'react'
import styled from 'styled-components'
import { OutlinedInput, Card, IconButton } from '@mui/material';
import { Search, Filter } from 'react-feather'

import { FilterModal } from './FilterModal'

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  padding: 16px;
`


export const Header = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <Card sx={{ marginBottom: '32px' }}>
      <HeaderContent>
        <IconButton aria-label="delete" size="large">
          <Search />
        </IconButton>
        <OutlinedInput sx={{ backgroundColor: 'white', height: "36px" }} />
        <IconButton aria-label="delete" size="large" onClick={() => setModalOpen(true)}>
          <Filter />
        </IconButton>
      </HeaderContent>
      <FilterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </Card>
  )
}
