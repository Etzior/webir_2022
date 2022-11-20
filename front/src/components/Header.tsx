import React from 'react'
import styled from 'styled-components'
import { OutlinedInput, Card, IconButton } from '@mui/material'
import { Search, Filter } from 'react-feather'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const { filters, setFilters } = React.useContext(FilterContext)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  // TODO: stringify?
  React.useEffect(() => {
    navigate('/')
  }, [JSON.stringify(filters)])

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
