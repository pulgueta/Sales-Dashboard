import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { UserProvider } from './context/auth'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
