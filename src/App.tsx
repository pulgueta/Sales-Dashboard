import { FC } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Navbar } from './components'
import { Home } from './pages/home'
import { Login } from './pages/auth'
import { AddProduct } from './pages/admin/addProduct'
import { Products } from './pages/products'
import { NotFound } from './pages'

import { Dashboard } from './pages/admin/dashboard'
import { DashboardTitle } from './components/admin'

const App: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        
        <Route path='/admin' element={<DashboardTitle />}>
          <Route path='add' element={<AddProduct />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;