import React from 'react'
import './App.css'

import { Header } from './components/Header'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MainListing } from './components/MainListing/MainListing'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <MainListing />
      </div>
    </QueryClientProvider>
  )
}

export default App
