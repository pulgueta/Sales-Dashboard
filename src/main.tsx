import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { Spinner } from './components/loading'

const App = lazy(() => import('./App'))

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
