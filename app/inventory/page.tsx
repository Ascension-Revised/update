import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { InventoryDashboard } from "@/components/inventory-dashboard"
import Spline from "@splinetool/react-spline/next"

export default async function InventoryPage() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/664Yv8BWgvJ6BoU5/scene.splinecode" width={1440} height={1080} />
      </div>

      <div className="relative z-10 backdrop-blur-sm bg-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Inventory Management
            </h1>
            <p className="text-gray-600">Manage your products and track inventory levels</p>
          </div>
          <InventoryDashboard />
        </div>
      </div>
    </div>
  )
}
