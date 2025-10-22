import React from 'react'
import { Route, Routes } from 'react-router'
import PageHome from './pages/PageHome'
import PageCreateBill from './pages/PageCreateBill'
import PageBill from './pages/PageBill'
import PageBills from './pages/PageBills'
import Navigation from './components/common/Navigation'

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<PageHome />} />
        <Route path='/create' element={<PageCreateBill />} />
        <Route path='/bills' element={<PageBills />} />
        <Route path='/bill/:id' element={<PageBill />} />
      </Routes>
    </div>
  )
}

export default App