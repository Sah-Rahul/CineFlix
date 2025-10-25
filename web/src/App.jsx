import React from 'react'
import AppRoute from './Route/AppRoute'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <AppRoute />
      <Toaster />
    </div>
  )
}

export default App
