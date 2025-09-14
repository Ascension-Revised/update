import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Truck } from "lucide-react"
import Spline from "@splinetool/react-spline/next"

export default async function UtahEquipmentRentalPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/664Yv8BWgvJ6BoU5/scene.splinecode"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <Link href="/demo" className="flex items-center gap-2 text-white hover:text-gray-300">
          <ArrowLeft className="w-5 h-5" />
          Back to Demo
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Utah Construction Equipment Rental</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive equipment rental catalog featuring Utah's most trusted construction equipment for projects
            across the Wasatch Front and beyond.
          </p>
          <div className="pt-4">
            <Link href="/utah-equipment-rental/demo">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                View Interactive Demo
              </Button>
            </Link>
            <Link href="/utah-equipment-rental/info" className="ml-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                Rental Information
              </Button>
            </Link>
          </div>
        </div>

        {/* Equipment Catalog */}
        <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-8 space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Heavy Equipment */}
            <div className="bg-white/5 border border-gray-600 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-orange-400 flex items-center gap-2 text-lg">
                <div className="w-3 h-3 bg-orange-400 rounded-full" />
                Heavy Equipment
              </h4>
              <div className="space-y-3">
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Caterpillar 320 Excavator</div>
                      <div className="text-sm text-gray-400">Daily: $450 | Weekly: $1,800</div>
                    </div>
                  </div>
                  <a
                    href="https://www.unitedrentals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    United Rentals - Salt Lake City
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">John Deere 850K Bulldozer</div>
                      <div className="text-sm text-gray-400">Daily: $650 | Weekly: $2,600</div>
                    </div>
                  </div>
                  <a
                    href="https://www.homedepot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Home Depot Tool Rental - Utah
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Komatsu PC210 Track Hoe</div>
                      <div className="text-sm text-gray-400">Daily: $520 | Weekly: $2,080</div>
                    </div>
                  </div>
                  <a
                    href="https://www.bigrentz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    BigRentz - Statewide Utah
                  </a>
                </div>
              </div>
            </div>

            {/* Aerial Equipment */}
            <div className="bg-white/5 border border-gray-600 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-blue-400 flex items-center gap-2 text-lg">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                Aerial Equipment
              </h4>
              <div className="space-y-3">
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Genie S-65 Boom Lift</div>
                      <div className="text-sm text-gray-400">Daily: $285 | Weekly: $1,140</div>
                    </div>
                  </div>
                  <a
                    href="https://www.sunbeltrentals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Sunbelt Rentals - Provo
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">JLG 2630ES Scissor Lift</div>
                      <div className="text-sm text-gray-400">Daily: $165 | Weekly: $660</div>
                    </div>
                  </div>
                  <a
                    href="https://www.herc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Herc Rentals - Ogden
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Manitou MT 1440 Telehandler</div>
                      <div className="text-sm text-gray-400">Daily: $320 | Weekly: $1,280</div>
                    </div>
                  </div>
                  <a
                    href="https://www.unitedrentals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    United Rentals - Park City
                  </a>
                </div>
              </div>
            </div>

            {/* Concrete Equipment */}
            <div className="bg-white/5 border border-gray-600 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-green-400 flex items-center gap-2 text-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                Concrete Equipment
              </h4>
              <div className="space-y-3">
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Multiquip MC94SH8 Mixer</div>
                      <div className="text-sm text-gray-400">Daily: $85 | Weekly: $340</div>
                    </div>
                  </div>
                  <a
                    href="https://www.lowes.com/l/tool-equipment-rental"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Lowe's Tool Rental - Utah
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Weber MT CF4 Trowel</div>
                      <div className="text-sm text-gray-400">Daily: $45 | Weekly: $180</div>
                    </div>
                  </div>
                  <a
                    href="https://www.equipmentshare.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    EquipmentShare - Salt Lake Valley
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Husqvarna FS 400 LV Saw</div>
                      <div className="text-sm text-gray-400">Daily: $95 | Weekly: $380</div>
                    </div>
                  </div>
                  <a
                    href="https://www.bigrentz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    BigRentz - Utah County
                  </a>
                </div>
              </div>
            </div>

            {/* Power & Lighting */}
            <div className="bg-white/5 border border-gray-600 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-yellow-400 flex items-center gap-2 text-lg">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                Power & Lighting
              </h4>
              <div className="space-y-3">
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Generac MDG25DF4 Generator</div>
                      <div className="text-sm text-gray-400">Daily: $125 | Weekly: $500</div>
                    </div>
                  </div>
                  <a
                    href="https://www.sunbeltrentals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Sunbelt Rentals - West Valley
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Magnum MLT3060M Light Tower</div>
                      <div className="text-sm text-gray-400">Daily: $75 | Weekly: $300</div>
                    </div>
                  </div>
                  <a
                    href="https://www.herc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Herc Rentals - Murray
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Lincoln Vantage 400 Welder</div>
                      <div className="text-sm text-gray-400">Daily: $65 | Weekly: $260</div>
                    </div>
                  </div>
                  <a
                    href="https://www.homedepot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Home Depot Tool Rental - Midvale
                  </a>
                </div>
              </div>
            </div>

            {/* Compaction Equipment */}
            <div className="bg-white/5 border border-gray-600 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-purple-400 flex items-center gap-2 text-lg">
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
                Compaction Equipment
              </h4>
              <div className="space-y-3">
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Wacker Neuson BPU2540A Plate</div>
                      <div className="text-sm text-gray-400">Daily: $55 | Weekly: $220</div>
                    </div>
                  </div>
                  <a
                    href="https://www.unitedrentals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    United Rentals - Layton
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Bomag BW 120 AD-5 Roller</div>
                      <div className="text-sm text-gray-400">Daily: $385 | Weekly: $1,540</div>
                    </div>
                  </div>
                  <a
                    href="https://www.equipmentshare.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    EquipmentShare - Orem
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Multiquip MTX-60HD Rammer</div>
                      <div className="text-sm text-gray-400">Daily: $45 | Weekly: $180</div>
                    </div>
                  </div>
                  <a
                    href="https://www.bigrentz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    BigRentz - St. George
                  </a>
                </div>
              </div>
            </div>

            {/* Utah Specialty Equipment */}
            <div className="bg-white/5 border border-gray-600 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-red-400 flex items-center gap-2 text-lg">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                Utah Specialty
              </h4>
              <div className="space-y-3">
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Snow Removal Equipment</div>
                      <div className="text-sm text-gray-400">Daily: $195 | Weekly: $780</div>
                    </div>
                  </div>
                  <a
                    href="https://www.sunbeltrentals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Sunbelt Rentals - Park City
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">High-Altitude Compressors</div>
                      <div className="text-sm text-gray-400">Daily: $145 | Weekly: $580</div>
                    </div>
                  </div>
                  <a
                    href="https://www.herc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Herc Rentals - Alta/Snowbird
                  </a>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Rock Breakers & Hammers</div>
                      <div className="text-sm text-gray-400">Daily: $225 | Weekly: $900</div>
                    </div>
                  </div>
                  <a
                    href="https://www.unitedrentals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    United Rentals - Mining Division
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-700 space-y-4">
            <p className="text-gray-400 mb-4">
              Serving Salt Lake City, Provo, Ogden, Park City, and all major Utah construction sites
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <a href="https://www.unitedrentals.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  United Rentals
                </Button>
              </a>
              <a href="https://www.sunbeltrentals.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  Sunbelt Rentals
                </Button>
              </a>
              <a href="https://www.herc.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  Herc Rentals
                </Button>
              </a>
              <a href="https://www.homedepot.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  Home Depot Rental
                </Button>
              </a>
              <a href="https://www.bigrentz.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  BigRentz
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
