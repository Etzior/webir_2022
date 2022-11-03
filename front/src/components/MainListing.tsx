import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { listMonitors } from '../services/APIService'

export const MainListing = () => {
    const { data, isLoading, error } = useQuery({ queryKey: ['todos'], queryFn: listMonitors })
  return (
    <div>MainListing</div>
  )
}
