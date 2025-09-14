import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

export async function updateSession(request: NextRequest) {
  try {
    // If Supabase is not configured, just continue without auth
    if (!isSupabaseConfigured) {
      return NextResponse.next({
        request,
      })
    }

    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
          },
        },
      },
    )

    // Check if this is an auth callback
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (code) {
      try {
        // Exchange the code for a session
        await supabase.auth.exchangeCodeForSession(code)
        // Redirect to home page after successful auth
        return NextResponse.redirect(new URL("/", request.url))
      } catch (authError) {
        console.error("Auth code exchange failed:", authError)
        // Continue without auth if exchange fails
        return NextResponse.next({ request })
      }
    }

    try {
      // Refresh session if expired - required for Server Components
      await supabase.auth.getSession()
    } catch (sessionError) {
      console.error("Session refresh failed:", sessionError)
      // Continue without session refresh if it fails
    }

    return supabaseResponse
  } catch (error) {
    console.error("Middleware error:", error)
    // Return a basic response to prevent deployment failures
    return NextResponse.next({
      request,
    })
  }
}
