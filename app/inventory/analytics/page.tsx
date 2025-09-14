import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import InventoryAnalytics from "@/components/inventory-analytics"
import Spline from "@splinetool/react-spline/next"

export default async function InventoryAnalyticsPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/664Yv8BWgvJ6BoU5/scene.splinecode" width={1440} height={1080} />
      </div>

      <div className="relative z-10 backdrop-blur-sm bg-white/10">
        <div className="container mx-auto px-4 py-8">
          <InventoryAnalytics />
        </div>
      </div>
    </div>
  )
}
