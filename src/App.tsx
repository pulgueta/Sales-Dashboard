import { FC } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Navbar } from './components'
import { Home } from './views/home'
import { Login } from './views/auth'
import { AddProduct } from './views/addProduct'
import { Products } from './views/products'
import { NotFound } from './views'

const App: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/admin' element={null}>
          <Route path='/add' element={<AddProduct />} />

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;