import { FC, lazy, Suspense, useContext } from 'react'

import { Box, IconButton, Spinner, Tooltip, VStack } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route, Navigate } from 'react-router-dom'

import { DashboardTitle } from '@/components/admin'
import { Navbar as AdminNavbar } from '@/components/admin'
import { Home } from '@/pages/home'
import { Products } from '@/pages/products'
import { AddProduct } from '@/pages/admin/addProduct'
import { Dashboard } from '@/pages/admin/dashboard'
import { UserContext } from '@/context/auth'
import { PrivateRoute } from '@/components/auth'
import { Navbar } from '@/components'
import { FaWhatsapp } from 'react-icons/fa'

const Login = lazy(() => import('@/pages/auth/Login'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const AdminProducts = lazy(() => import('@/pages/admin/products/Products'))

const Loader: FC = (): JSX.Element => (
  <VStack minH='100vh' alignItems='center' justifyContent='center'>
    <Spinner />
  </VStack>
)

const WhatsAppButton: FC = (): JSX.Element => (
  <Box position='fixed' bottom={6} right={6}>
    <Tooltip label='Hablar en nuestro WhatsApp' placement='left' hasArrow rounded='sm'>
      <IconButton
        colorScheme='whatsapp'
        aria-label='whatsapp-btn'
        isRound
        size='lg'
        fontSize='32px'
        icon={<FaWhatsapp />}
        onClick={() => window.location.assign(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`)}
      />
    </Tooltip>
  </Box>
)

export const App: FC = (): JSX.Element => {

  const { user } = useContext(UserContext)

  return (
    <Suspense fallback={<Loader />}>
      <HelmetProvider>
        {user ? <AdminNavbar isUser={user} /> : <Navbar />}
        <Routes>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/admin/products' replace />} />

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
        {!user && <WhatsAppButton />}
      </HelmetProvider>
    </Suspense>
  )
}