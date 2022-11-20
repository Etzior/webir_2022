import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Header } from './components/Header'
import { Detail } from './screens/Detail/Detail'
import { MainListing } from './screens/MainListing/MainListing'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <MainListing />
      </>
    ),
  },
  {
    path: '/details/:id',
    element: (
      <>
        <Header />
        <Detail />
      </>
    ),
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
