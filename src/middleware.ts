// /src/middleware.ts

import { withAuth } from 'next-auth/middleware';  

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            console.log("Token:", token);
            return !!token;
        },
    },
    pages: {
        signIn: '/signin',
    },
});

export const config = {
    matcher: ['/create', '/setting'],
};
