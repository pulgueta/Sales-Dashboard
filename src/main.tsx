import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

import { ChakraProvider, Spinner } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

const App = lazy(() => import('./App'))

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Spinner size='xl' />}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
