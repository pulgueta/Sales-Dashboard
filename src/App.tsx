import { FC, lazy, Suspense, useContext } from 'react'

import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import { Navbar as AdminNavbar } from '@/components/admin'
import { AddProduct } from '@/pages/admin/addProduct'
import { Dashboard } from '@/pages/admin/dashboard'
import { UserContext } from '@/context/auth'
import { PrivateRoute } from '@/components/auth'
import { Navbar } from '@/components'
import { Spinner } from '@/components/loading'

// Public routes
const Home = lazy(() => import('@/pages/home/Home'))
const Products = lazy(() => import('@/pages/products/Products'))
const Product = lazy(() => import('@/pages/products/Product'))
const Contact = lazy(() => import('@/pages/contact/Contact'))
const PrivacyPolicy = lazy(() => import('@/pages/privacyPolicy/PrivacyPolicy'))
const Login = lazy(() => import('@/pages/auth/Login'))
const Signup = lazy(() => import('@/pages/auth/Signup'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Normal user routes
const UserProfile = lazy(() => import('@/pages/user/UserProfile'))
const UserInformation = lazy(() => import('@/pages/user/UserInformation'))

// Admin routes
const AdminProducts = lazy(() => import('@/pages/admin/products/Products'))
const Users = lazy(() => import('@/pages/admin/users/Users'))
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'))

export const App: FC = (): JSX.Element => {

  const { user, userRole } = useContext(UserContext)

  return (
    <>
      {user ? <AdminNavbar isUser={user} /> : <Navbar />}
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/login' element={
            !user
              ?
              <Login />
              :
              userRole === 'user'
                ?
                <Navigate to={`/user/profile/${user?.uid}`} replace />
                :
                userRole === 'admin'
                  ?
                  <Navigate to='/admin/products' replace />
                  :
                  userRole === 'moderator' && <Navigate to='/moderator/' replace />
          } />
          <Route path='/signup' element={
            !user
              ?
              <Signup />
              :
              userRole === 'user'
                ?
                <Navigate to={`/user/profile/${user?.uid}`} replace />
                :
                userRole === 'admin'
                  ?
                  <Navigate to='/admin/products' replace />
                  :
                  userRole === 'moderator' && <Navigate to='/moderator/' replace />
          } />

          <Route path='/user' element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }>
            <Route path='profile/:uid' element={
              <PrivateRoute>
                <UserProfile />
                <Outlet />
              </PrivateRoute>
            } />
            <Route path='profile/:uid/information' element={<UserInformation />} />
          </Route>

          <Route path='/admin' element={
            <PrivateRoute>
              <Outlet />
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
            <Route path='user' element={
              <PrivateRoute>
                <Users />
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