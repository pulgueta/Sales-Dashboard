import { FC } from 'react'

import { Button, ButtonGroup, createIcon } from '@chakra-ui/react'
import { loginWithProvider } from '@/utils'

const GoogleIcon = createIcon({
    displayName: 'GoogleIcon',
    path: (
        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
            />
            <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
            />
            <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
            />
            <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
            />
        </g>
    ),
})

const FacebookIcon = createIcon({
    displayName: 'FacebookIcon',
    viewBox: "0 0 24 24",
    path: (
        <path
            fill='#3b5998'
            d="M13.99 23.99v-8.01h3.01l.45-3.5h-3.46v-2.23c0-1.02.28-1.72 1.76-1.72h1.87v-3.01c-.31-.04-1.38-.13-2.63-.13-2.6 0-4.39 1.59-4.39 4.51v2.51H8v3.5h3.01V24l2.98-.01z"
        />
    ),
})

const TwitterIcon = createIcon({
    displayName: 'TwitterIcon',
    path: (
        <path
            fill="#03A9F4"
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
        />
    ),
})


export const ProviderButtons: FC = (): JSX.Element => {
    return (
        <ButtonGroup variant="outline" spacing="4" width="full">
            <Button
                onClick={() => loginWithProvider('Google')}
                bgColor={['white', 'transparent']}
                borderColor='gray.200'
                w='full'
            >
                <GoogleIcon />
            </Button>
            <Button
                onClick={() => loginWithProvider('Facebook')}
                bgColor={['white', 'transparent']}
                borderColor='gray.200'
                w='full'
            >
                <FacebookIcon />
            </Button>
            <Button
                onClick={() => loginWithProvider('Twitter')}
                bgColor={['white', 'transparent']}
                borderColor='gray.200'
                w='full'
            >
                <TwitterIcon />
            </Button>
        </ButtonGroup>
    )
}
