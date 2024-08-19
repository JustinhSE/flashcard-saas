import { http } from 'msw'

export const handlers = [
    http.post('/login', async ({ request }) => {
        // Persist user's authentication in the session
        sessionStorage.setItem('is-authenticated', 'true')
        return new Response(null, { status: 200 })
    }),

    http.get('/user', async ({ request }) => {
        // Check if the user is authenticated in this session
        const isAuthenticated = sessionStorage.getItem('is-authenticated')
        if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return new Response(null, { status: 403 })
        }

        // If authenticated, return a mocked user details
        return new Response(
            JSON.stringify({
                username: 'admin',
            })
        )
    }),
]