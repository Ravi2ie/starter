// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export default clerkMiddleware((auth, req) => {
//     // const url = req.nextUrl.pathname;

//     // const { userId } = auth();

//     // // Protect /dashboard and sub-routes
//     // if (!userId && url.startsWith("/dashboard")) {
//     //     return NextResponse.redirect(new URL("/dashboard", req.url));
//     // }

//     // // Redirect authenticated users away from auth routes
//     // if (userId && (url.startsWith("/dashboard") || url.startsWith("/auth/sign-up"))) {
//     //     return NextResponse.redirect(new URL("/dashboard", req.url));
//     // }
// });

// export const config = {
//     matcher: [
//         "/((?!.*\\..*|_next).*)",
//         "/(api|trpc)(.*)",
//         "/dashboard(.*)",
//         "/",
//         "/dashboard",
//         "/auth/sign-up",
//     ],
// };


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { isPagesAPIRouteMatch } from 'next/dist/server/future/route-matches/pages-api-route-match'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up','/','/changelog','/features',
    '/features/link-shortening',
    '/features/password-protection',
    '/features/analytics',
    '/features/qr-codes',
    '/pricing',
    '/enterprise',
    '/resources',
    '/resources/blog',
    '/resources/help','privacy','terms'])
const isPublicApiRoute = createRouteMatcher(["/api(/.*)?"]);


export default clerkMiddleware((auth, request) => {

    const currenturl = new URL(request.url)
    const { userId } = auth()

    const isaccessingdashboard = currenturl.pathname === '/dashboard'
    const isApiRequest=currenturl.pathname.startsWith('/api') 
    const isAccessingHome = currenturl.pathname === '/'
    
    if(userId && isPublicRoute(request) && !isaccessingdashboard){
        if(isAccessingHome){
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        console.log('redirecting to dashboard')
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    //not logged in
    if(!userId){
      if(isaccessingdashboard){
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
      if(!isPublicRoute(request) && !isPublicApiRoute(request)){
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }

      if(isApiRequest && !isPublicApiRoute(request)){
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
    }

    return NextResponse.next()
})




// const user = userId
//   // Redirect authenticated users away from auth routes

// if (userId && (url.startsWith("/dashboard") || url.startsWith("/sign-up"))) {
//         return NextResponse.redirect(new URL("/dashboard", request.url));
// }

// if (!isPublicRoute(request)) {
//     return NextResponse.redirect(new URL('/sign-up', request.url))
//   }
// })

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"],
}

