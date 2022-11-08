import React from 'react'
import './App.css'

import { Header } from './components/Header'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MainListing } from './components/MainListing/MainListing'

const queryClient = new QueryClient()
export const FilterContext = React.createContext({} as Record<string, any>);

function App() {
  const [filters, setFilters] = React.useState({});

  return (
    <QueryClientProvider client={queryClient}>
      <FilterContext.Provider value={{ filters, setFilters }}>
        <div className="App">
          <Header />
          <MainListing />
        </div>
      </FilterContext.Provider>
    </QueryClientProvider>
  )
}

export default App
