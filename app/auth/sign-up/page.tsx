import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SignUpForm from "@/components/sign-up-form"
import Spline from "@splinetool/react-spline/next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function SignUpPage() {
  // If Supabase is not configured, show setup message directly
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/664Yv8BWgvJ6BoU5/scene.splinecode"
            width={1440}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>

        <nav className="relative z-20 container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
              <span className="text-xl font-bold">Agent</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative z-20 flex items-center justify-center min-h-[80vh]">
          <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    )
  }

  // Check if user is already logged in
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is logged in, redirect to home page
  if (session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/664Yv8BWgvJ6BoU5/scene.splinecode"
          width={1440}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <nav className="relative z-20 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
            <span className="text-xl font-bold">Agent</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex items-center justify-center min-h-[80vh]">
          <SignUpForm />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
