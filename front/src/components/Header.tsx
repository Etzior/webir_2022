import React from 'react'
import styled from 'styled-components'
import { OutlinedInput, Card, IconButton } from '@mui/material'
import { Search, Filter } from 'react-feather'

import { FilterModal } from './FilterModal'
import { FilterContext } from '../App'

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  padding: 16px;
`

export const Header = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const { filters, setFilters } = React.useContext(FilterContext)
  const [search, setSearch] = React.useState('')
  return (
    <Card sx={{ marginBottom: '32px' }}>
      <HeaderContent>
        <IconButton
          onClick={() => {
            setFilters({ ...filters, search })
          }}
          aria-label="delete"
          size="large"
        >
          <Search />
        </IconButton>
        <OutlinedInput
          sx={{ backgroundColor: 'white', height: '36px' }}
          onChange={(evt) => {
            setSearch(evt.target.value)
          }}
        />
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => setModalOpen(true)}
        >
          <Filter />
        </IconButton>
      </HeaderContent>
      <FilterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onApplyFilters={(filters) => setFilters(filters)}
      />
    </Card>
  )
}
