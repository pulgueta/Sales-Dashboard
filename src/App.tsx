import { FC, lazy, useContext } from 'react'

import { Routes, Route, Outlet, useLocation } from 'react-router-dom'

import { UserContext } from '@/context'
import { PrivateRoute } from '@/components/auth'
import { Navbar } from '@/components'

// Lazy load components
const AdminNavbar = lazy(() => import('@/components/admin/Navbar'))
const LoggedUserRedirect = lazy(() => import('@/components/auth/LoggedUserRedirect'))
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'))
const LoggedUserNavbar = lazy(() => import('@/components/ui/LoggedUserNavbar'))
const ModNavbar = lazy(() => import('@/components/ui/ModNavbar'))
const Footer = lazy(() => import('@/components/Footer'))

// Public routes
const Home = lazy(() => import('@/pages/home/Home'))
const Products = lazy(() => import('@/pages/products/Products'))
const Product = lazy(() => import('@/pages/products/Product'))
const Cart = lazy(() => import('@/pages/cart/Cart'))
const Contact = lazy(() => import('@/pages/contact/Contact'))
const PrivacyPolicy = lazy(() => import('@/pages/privacyPolicy/PrivacyPolicy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Normal user routes
const UserProfile = lazy(() => import('@/pages/user/UserProfile'))
const UserInformation = lazy(() => import('@/pages/user/UserInformation'))

// Admin routes
const AddProduct = lazy(() => import('@/pages/admin/addProduct/AddProduct'))
const Dashboard = lazy(() => import('@/pages/admin/dashboard/Dashboard'))
const AdminProducts = lazy(() => import('@/pages/admin/products/Products'))
const Users = lazy(() => import('@/pages/admin/users/Users'))
const Backups = lazy(() => import('@/pages/admin/backups/Backups'))

const NavbarRenderer: FC = (): JSX.Element => {
  const { user, userRole } = useContext(UserContext)

  if (user) {
    if (userRole === 'admin') return <AdminNavbar isUser={user} />
    if (userRole === 'user') return <LoggedUserNavbar />
    if (userRole === 'moderator') return <ModNavbar />
  }

  return <Navbar />
}

export const App: FC = (): JSX.Element => {
  const { user, userRole } = useContext(UserContext)

  const { pathname } = useLocation()

  return (
    <>
      <NavbarRenderer />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/login' element={<LoggedUserRedirect />} />
        <Route path='/signup' element={<LoggedUserRedirect />} />

        <Route path='/user/profile' element={
          <PrivateRoute allowedRoles='user'>
            <Outlet />
          </PrivateRoute>
        }>
          <Route path=':uid' element={
            <PrivateRoute allowedRoles='user'>
              <UserProfile />
              <Outlet />
            </PrivateRoute>
          } />
          <Route path=':uid/purchases' element={<UserInformation />} />
          <Route path=':uid/information' element={<UserInformation />} />
          <Route path=':uid/security' element={<UserInformation />} />
          <Route path=':uid/cards' element={<UserInformation />} />
          <Route path=':uid/address' element={<UserInformation />} />
        </Route>

        <Route path='/admin' element={
          <PrivateRoute allowedRoles='admin'>
            <Outlet />
          </PrivateRoute>
        }>
          <Route path='backups' element={
            <PrivateRoute allowedRoles='admin'>
              <Backups />
            </PrivateRoute>
          } />
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
      {(!user || (user && userRole === 'user')) && <WhatsAppButton />}
      {((pathname !== '/login' && pathname !== '/signup')) && <Footer />}
    </>
  )
}