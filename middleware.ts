import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

const isProtectedRoute = createRouteMatcher(["/(.*)/dashboard(.*)"]);

const intlMiddleware = createMiddleware({
  locales: ["en", "fr", "ar"],
  defaultLocale: "fr",
});

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting

    return auth().redirectToSignIn();
  }
  if (!req.nextUrl.pathname.startsWith("/api")) {
    return intlMiddleware(req);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
