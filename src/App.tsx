import { FC, lazy, Suspense, useContext } from 'react'

import { Spinner, VStack } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { DashboardTitle } from '@/components/admin'
import { Navbar as AdminNavbar } from '@/components/admin'
import { Home } from '@/pages/home'
import { AddProduct } from '@/pages/admin/addProduct'
import { Dashboard } from '@/pages/admin/dashboard'
import { UserContext } from '@/context/auth'
import { PrivateRoute } from '@/components/auth'
import { Navbar } from '@/components'

const Products = lazy(() => import('@/pages/products/Products'))
const Product = lazy(() => import('@/pages/products/Product'))
const Login = lazy(() => import('@/pages/auth/Login'))
const Signup = lazy(() => import('@/pages/auth/Signup'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const AdminProducts = lazy(() => import('@/pages/admin/products/Products'))
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'))

const Loader: FC = (): JSX.Element => (
  <VStack minH='100vh' alignItems='center' justifyContent='center'>
    <Spinner />
  </VStack>
)

export const App: FC = (): JSX.Element => {

  const { user } = useContext(UserContext)

  return (
    <>
      {user ? <AdminNavbar isUser={user} /> : <Navbar />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/admin/products' replace />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/admin/products' replace />} />

          <Route path='/admin' element={
            <PrivateRoute>
              <DashboardTitle />
            </PrivateRoute>
          }>
            <Route path='add' element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            } />
            <Route path='dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path='products' element={
              <PrivateRoute>
                <AdminProducts />
              </PrivateRoute>
            } />
            <Route path='products/:id' element={
              <PrivateRoute>
                <AdminProducts />
              </PrivateRoute>
            } />

            <Route path='/admin/' element={<NotFound />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      {!user && <WhatsAppButton />}
    </>
  )
}