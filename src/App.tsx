import { FC } from 'react'

import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route, Navigate } from 'react-router-dom'

import { DashboardTitle } from './components/admin'
import { Navbar } from './components'
import { Home } from './pages/home'
import { Login } from './pages/auth'
import { Products } from './pages/products'
import { NotFound } from './pages'
import { AddProduct } from './pages/admin/addProduct'
import { Dashboard } from './pages/admin/dashboard'
import { Products as AdminProducts } from './pages/admin/products'
import { AdminLogin } from './pages/admin/login'

export const App: FC = (): JSX.Element => {
  return (
    <HelmetProvider>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />

        <Route path='/admin' element={<DashboardTitle />}>
          <Route path='login' element={<AdminLogin />} />
          <Route path='add' element={<AddProduct />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='products/:id' element={<AdminProducts />} />

          <Route path='/admin/' element={<Navigate to='login' />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </HelmetProvider>
  )
}