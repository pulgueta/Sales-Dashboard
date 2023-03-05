import { FC, useState, useEffect, lazy, Suspense } from 'react'

import { Spinner, VStack } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { DashboardTitle } from './components/admin'
import { Navbar } from './components/admin'
import { Home } from './pages/home'
import { Products } from './pages/products'
import { AddProduct } from './pages/admin/addProduct'
import { Dashboard } from './pages/admin/dashboard'
import { auth } from './firebase'

const Login = lazy(() => import('./pages/auth/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminProducts = lazy(() => import('./pages/admin/products/Products'))

const Loader: FC = (): JSX.Element => (
  <VStack minH='100vh' alignItems='center' justifyContent='center'>
    <Spinner />
  </VStack>
)

export const App: FC = (): JSX.Element => {
  const [isUser, setIsUser] = useState<boolean>(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true)
      } else {
        setIsUser(false)
      }
    });
  }, [isUser])

  return (
    <Suspense fallback={<Loader />}>
      <HelmetProvider>
        {
          isUser && (
            <Navbar isUser={isUser} />
          )
        }
        <Routes>
          <Route index element={<Home />} />

          <Route path='/admin' element={<DashboardTitle />}>
            <Route path='add' element={<AddProduct />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='products/:id' element={<AdminProducts />} />

            <Route path='/admin/' element={<Navigate to={isUser ? '/login' : '/admin/add'} />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Products />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </HelmetProvider>
    </Suspense>
  )
}