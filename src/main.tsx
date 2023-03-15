import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import { App } from '@/App'
import { UserProvider } from '@/context/auth'
import { ErrorBoundaryComponent, ErrorBoundary } from '@/components/errors'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider>
      <ErrorBoundary fallback={<ErrorBoundaryComponent />}>
        <HelmetProvider>
          <UserProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </ChakraProvider>
  </StrictMode>
)
