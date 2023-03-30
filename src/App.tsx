import { FC, lazy, Suspense, useContext } from 'react'

import { Routes, Route, Outlet } from 'react-router-dom'

import { Navbar as AdminNavbar } from '@/components/admin'
import { AddProduct } from '@/pages/admin/addProduct'
import { Dashboard } from '@/pages/admin/dashboard'
import { UserContext } from '@/context/auth'
import { PrivateRoute } from '@/components/auth'
import { Navbar } from '@/components'
import { Spinner } from '@/components/loading'

// Lazy load components
const LoggedUserRedirect = lazy(() => import('@/components/auth/LoggedUserRedirect'))

// Public routes
const Home = lazy(() => import('@/pages/home/Home'))
const Products = lazy(() => import('@/pages/products/Products'))
const Product = lazy(() => import('@/pages/products/Product'))
const Contact = lazy(() => import('@/pages/contact/Contact'))
const PrivacyPolicy = lazy(() => import('@/pages/privacyPolicy/PrivacyPolicy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Normal user routes
const UserProfile = lazy(() => import('@/pages/user/UserProfile'))
const UserInformation = lazy(() => import('@/pages/user/UserInformation'))

// Admin routes
const AdminProducts = lazy(() => import('@/pages/admin/products/Products'))
const Users = lazy(() => import('@/pages/admin/users/Users'))
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'))

const NavbarRenderer: FC = (): JSX.Element => {
  const { user, userRole } = useContext(UserContext)

  if (user) {
    if (userRole === 'admin') return <AdminNavbar isUser={user} />
    // if (userRole === 'user') return <UserNavbar />
    // if (userRole === 'moderator') return <ModNavbar />
  }

  return <Navbar />
}

export const App: FC = (): JSX.Element => {

  const { user, userRole } = useContext(UserContext)

  return (
    <>
      <NavbarRenderer />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/login' element={<LoggedUserRedirect />} />
          <Route path='/signup' element={<LoggedUserRedirect />} />

          <Route path='/user' element={
            <PrivateRoute allowedRoles='user'>
              <Outlet />
            </PrivateRoute>
          }>
            <Route path='profile/:uid' element={
              <PrivateRoute allowedRoles='user'>
                <UserProfile />
                <Outlet />
              </PrivateRoute>
            } />
            <Route path='profile/:uid/information' element={<UserInformation />} />
          </Route>

          <Route path='/admin' element={
            <PrivateRoute allowedRoles='admin'>
              <Outlet />
            </PrivateRoute>
          }>
            <Route path='add' element={
              <PrivateRoute allowedRoles='admin'>
                <AddProduct />
              </PrivateRoute>
            } />
            <Route path='dashboard' element={
              <PrivateRoute allowedRoles='admin'>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path='products' element={
              <PrivateRoute allowedRoles='admin'>
                <AdminProducts />
              </PrivateRoute>
            } />
            <Route path='products/:id' element={
              <PrivateRoute allowedRoles='admin'>
                <AdminProducts />
              </PrivateRoute>
            } />
            <Route path='user' element={
              <PrivateRoute allowedRoles='admin'>
                <Users />
              </PrivateRoute>
            } />

            <Route path='/admin/' element={<NotFound />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      {(!user || (user && userRole === 'user')) && <WhatsAppButton />}
    </>
  )
}