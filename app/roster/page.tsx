import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import CompanyRoster from "@/components/company-roster"
import Spline from "@splinetool/react-spline/next"

export default async function RosterPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Spline
        scene="https://prod.spline.design/664Yv8BWgvJ6BoU5/scene.splinecode"
        width={1440}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="relative z-10">
        <nav className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold">Agent</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="text-white/80 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/inventory" className="text-white/80 hover:text-white transition-colors">
              Inventory
            </a>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Company Roster</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Manage your company's employee roster and team information
              </p>
            </div>

            <CompanyRoster />
          </div>
        </div>
      </div>
    </div>
  )
}
