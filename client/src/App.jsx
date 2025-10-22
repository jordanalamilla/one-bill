import React from 'react'
import { Route, Routes } from 'react-router'
import PageHome from './pages/PageHome'
import PageCreateOrder from './pages/PageCreateOrder'
import PageOrder from './pages/PageOrder'
import PageOrders from './pages/PageOrders'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PageHome />} />
        <Route path='/create' element={<PageCreateOrder />} />
        <Route path='/orders' element={<PageOrders />} />
        <Route path='/order/:id' element={<PageOrder />} />
      </Routes>
    </div>
  )
}

export default App