import { FC, lazy, Suspense, useContext } from 'react'

import { Box, Spinner, VStack } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route, Navigate } from 'react-router-dom'

import { DashboardTitle } from './components/admin'
import { Navbar as AdminNavbar } from './components/admin'
import { Home } from './pages/home'
import { Products } from './pages/products'
import { AddProduct } from './pages/admin/addProduct'
import { Dashboard } from './pages/admin/dashboard'
import { UserContext } from './context/auth'
import { PrivateRoute } from './components/auth'
import { Navbar } from './components'

const Login = lazy(() => import('./pages/auth/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminProducts = lazy(() => import('./pages/admin/products/Products'))
const Footer = lazy(() => import('./components/Footer'))

const Loader: FC = (): JSX.Element => (
  <VStack minH='100vh' alignItems='center' justifyContent='center'>
    <Spinner />
  </VStack>
)

export const App: FC = (): JSX.Element => {

  const { user } = useContext(UserContext)

  return (
    <Suspense fallback={<Loader />}>
      <HelmetProvider>
        <Box overflowX='hidden'>
          {user ? <AdminNavbar isUser={user} /> : <Navbar />}

          <Routes>
            <Route index element={<Home />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/admin/products' replace />} />
            <Route path='/products' element={<Products />} />

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
          {!user && <Footer />}
        </Box>
      </HelmetProvider>
    </Suspense>
  )
}