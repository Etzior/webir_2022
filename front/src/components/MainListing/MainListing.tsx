import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { listMonitors } from '../../services/APIService'

import { Item } from '../Item/Item'

import { ItemLoading } from '../ItemLoading/ItemLoading'
import { Listing } from './MainListing.styles'
import { FilterContext } from '../../App'

export const MainListing = () => {
  const { filters } = React.useContext(FilterContext)
  const { data: apiResponse, isLoading, error } = useQuery({ queryKey: ['todos'], queryFn: () => listMonitors(filters) })


  console.log(filters)

  return (
    <Listing>
      {isLoading ? ([...new Array(10)].map(() => <ItemLoading />))
        : apiResponse.data.map((item, index) => (
          <Item monitor={item} key={`${item.model}${index}`} />
        ))}
    </Listing>
  )
}
