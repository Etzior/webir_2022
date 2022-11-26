import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { listMonitors } from '../../services/APIService'

import { Item } from '../../components/Item/Item'

import { ItemLoading } from '../../components/ItemLoading/ItemLoading'
import { Listing } from './MainListing.styles'
import { FilterContext } from '../../App'
import { Typography } from '@mui/material'

export const MainListing = () => {
  const { filters } = React.useContext(FilterContext)
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60,
    queryKey: [filters],
    queryFn: () => listMonitors(filters),
  })

  if (error) {
    return <div>error</div>
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: '12px' }}>{apiResponse?.data.length || 0} resultados</Typography>
      <Listing>
        {isLoading
          ? [...new Array(10)].map((_, index) => (
            <ItemLoading key={`loading${index}`} />
          ))
          : apiResponse?.data.map((item, index) => (
            <Item monitor={item} key={`${item.name}${index}`} />
          ))}
      </Listing>
    </>
  )
}
