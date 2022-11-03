import React from 'react'
import './App.css'

import { Header } from './components/Header'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
      </div>
    </QueryClientProvider>
  )
}

export default App
