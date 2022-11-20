import React from 'react'
import './App.css'

import { Header } from './components/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainListing } from './components/MainListing/MainListing'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
export const FilterContext = React.createContext({} as Record<string, any>)

const theme = createTheme({
  palette: {
    primary: {
      main: '#4aa873',
    },
  },
  status: {
    danger: 'red',
  },
})

function App() {
  const [filters, setFilters] = React.useState({})

  return (
    <QueryClientProvider client={queryClient}>
      <FilterContext.Provider value={{ filters, setFilters }}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Header />
            <MainListing />
          </div>
        </ThemeProvider>
      </FilterContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
