import { Button } from "@/components/ui/button"
import ChatbotSection from "@/components/chatbot-section"
import { ArrowRight, Package, Users, BarChart3, Settings, Bell } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import Spline from "@splinetool/react-spline/next"

export default async function RegisteredUserHome() {
  // Check authentication - redirect if not logged in
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile with company info
  const { data: profile } = await supabase.from("user_profiles").select("company_name").eq("user_id", user.id).single()

  // Get recent activity counts
  const { count: inventoryCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: rosterCount } = await supabase
    .from("company_roster")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

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

      {/* Navigation Bar */}
      <nav className="relative z-20 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
            <span className="text-xl font-bold">Agent</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                Dashboard
              </Button>
            </Link>
            <Link href="/inventory">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                <Package className="w-4 h-4 mr-2" />
                Inventory
              </Button>
            </Link>
            <Link href="/roster">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Roster
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {user.email?.split("@")[0]}
            </span>
          </h1>
          {profile?.company_name && <p className="text-xl text-gray-300 mb-2">{profile.company_name}</p>}
          <p className="text-lg text-gray-400">Your personalized workspace is ready</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold">Inventory Items</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{inventoryCount || 0}</p>
            <p className="text-sm text-gray-400">Products managed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold">Team Members</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{rosterCount || 0}</p>
            <p className="text-sm text-gray-400">Employees registered</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold">Activity</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">Active</p>
            <p className="text-sm text-gray-400">System status</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/inventory" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Package className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Manage Inventory</h3>
              <p className="text-sm text-gray-400">Add, edit, and track products</p>
              <ArrowRight className="w-4 h-4 mt-3 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/roster" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Users className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Company Roster</h3>
              <p className="text-sm text-gray-400">Manage team members</p>
              <ArrowRight className="w-4 h-4 mt-3 text-green-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/utah-equipment-rental" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Settings className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Equipment Rental</h3>
              <p className="text-sm text-gray-400">Browse Utah equipment</p>
              <ArrowRight className="w-4 h-4 mt-3 text-orange-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/dashboard" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <BarChart3 className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Full Dashboard</h3>
              <p className="text-sm text-gray-400">Complete overview</p>
              <ArrowRight className="w-4 h-4 mt-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div>
                <p className="text-white">Welcome to your personalized workspace!</p>
                <p className="text-sm text-gray-400">Get started by managing your inventory or company roster</p>
              </div>
            </div>
          </div>
        </div>

        <ChatbotSection />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
