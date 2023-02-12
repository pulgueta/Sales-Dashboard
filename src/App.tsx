import { FC } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Navbar } from './components'
import { Home } from './views/home'
import { Login } from './views/auth'
import { AddProduct } from './views/addProduct'


const App: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add' element={<AddProduct />} />
      </Routes>
    </>
  )
}

export default App;