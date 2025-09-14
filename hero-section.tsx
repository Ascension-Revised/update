import { Button } from "@/components/ui/button"
import ChatbotSection from "./components/chatbot-section"
import { ArrowRight, Sparkles, User, LogOut, Package } from "lucide-react"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { signOut } from "@/lib/actions"
import Link from "next/link"
import Spline from "@splinetool/react-spline/next"

export default async function Component() {
  // Check authentication status
  let user = null
  if (isSupabaseConfigured) {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
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
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
            <span className="text-xl font-bold">Agent</span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              // Authenticated user menu
              <div className="flex items-center gap-4">
                <Link href="/inventory">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                    <Package className="w-4 h-4 mr-2" />
                    Inventory
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-black-600 text-white hover:bg-black-800 bg-transparent">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <form action={signOut} className="inline">
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-black-600 text-white hover:bg-black-800 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </form>
              </div>
            ) : (
              // Guest user menu
              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <Button variant="outline" className="border-black-600 text-white hover:bg-black-800 bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex items-center justify-center min-h-[80vh]">
          {/* Centered text content */}
          <div className="space-y-8 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm">
              <Sparkles className="w-4 h-4" />
              Ascension Revised
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                {user ? (
                  <>
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      {user.email?.split("@")[0]}
                    </span>
                  </>
                ) : (
                  <>
                    Your personal{" "}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      agent
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                {user
                  ? "Continue your journey with our agents that can guide you to the crew of your choice to get what you need done."
                  : "Experience the future of productivity with our agents that understands you, and gets what you need done as accurately as possible."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              {user ? (
                <>
                  <Link href="/home">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full group"
                    >
                      Go to Home
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/inventory">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-600 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full bg-transparent group"
                    >
                      <Package className="mr-2 w-5 h-5" />
                      Manage Inventory
                    </Button>
                  </Link>
                </>
              ) : (
                // Guest user actions
                <>
                  <Link href="/auth/sign-up">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full group"
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-600 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full bg-transparent"
                    >
                      Watch Demo
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available 24/7
              </div>
              <div>No setup required</div>
              <div>{user ? "Inventory ready" : "Enterprise ready"}</div>
            </div>
          </div>
        </div>

        {/* Add the chatbot section */}
        <ChatbotSection />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
