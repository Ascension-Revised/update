"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, CheckCircle, Users, Package, Truck, BarChart3 } from "lucide-react"
import Link from "next/link"
import Spline from "@splinetool/react-spline/next"
import { useState } from "react"

export default function DemoPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = ["All", "Heavy Equipment", "Aerial", "Concrete", "Power", "Compaction", "Specialty"]

  const allEquipment = [
    // Heavy Equipment
    {
      id: 1,
      name: "CAT 320 Excavator",
      category: "Heavy Equipment",
      price: "$450/day",
      weeklyPrice: "$2,700/week",
      location: "Salt Lake City",
      status: "Available",
      description: "Heavy-duty excavator for large construction projects",
      specs: "20-ton operating weight, 1.2 cubic yard bucket",
    },
    {
      id: 2,
      name: "JD 850K Bulldozer",
      category: "Heavy Equipment",
      price: "$520/day",
      weeklyPrice: "$3,120/week",
      location: "Provo",
      status: "Available",
      description: "Powerful dozer for earthmoving and grading",
      specs: "188 HP, 6-way blade, GPS ready",
    },
    {
      id: 3,
      name: "CAT 966M Wheel Loader",
      category: "Heavy Equipment",
      price: "$380/day",
      weeklyPrice: "$2,280/week",
      location: "Ogden",
      status: "Limited",
      description: "Versatile loader for material handling",
      specs: "261 HP, 4.0 cubic yard bucket",
    },

    // Aerial Equipment
    {
      id: 4,
      name: "Genie S-125 Telescopic Lift",
      category: "Aerial",
      price: "$380/day",
      weeklyPrice: "$2,280/week",
      location: "Ogden",
      status: "Available",
      description: "125ft telescopic boom lift for high-reach work",
      specs: "125ft working height, 500 lbs capacity",
    },
    {
      id: 5,
      name: "JLG 600S Scissor Lift",
      category: "Aerial",
      price: "$180/day",
      weeklyPrice: "$1,080/week",
      location: "Murray",
      status: "Available",
      description: "Electric scissor lift for indoor work",
      specs: "20ft platform height, 1,000 lbs capacity",
    },
    {
      id: 6,
      name: "Genie Z-60/34 Articulating Lift",
      category: "Aerial",
      price: "$320/day",
      weeklyPrice: "$1,920/week",
      location: "West Valley",
      status: "Available",
      description: "Articulating boom for up-and-over reach",
      specs: "60ft working height, 500 lbs capacity",
    },

    // Concrete Equipment
    {
      id: 7,
      name: "Concrete Mixer Truck",
      category: "Concrete",
      price: "$280/day",
      weeklyPrice: "$1,680/week",
      location: "West Valley",
      status: "Available",
      description: "10-yard capacity for concrete projects",
      specs: "10 cubic yard capacity, front discharge",
    },
    {
      id: 8,
      name: "Concrete Pump",
      category: "Concrete",
      price: "$450/day",
      weeklyPrice: "$2,700/week",
      location: "Salt Lake City",
      status: "Limited",
      description: "Truck-mounted concrete pump",
      specs: "32-meter reach, 150 cubic yards/hour",
    },
    {
      id: 9,
      name: "Concrete Saw",
      category: "Concrete",
      price: "$120/day",
      weeklyPrice: "$720/week",
      location: "Provo",
      status: "Available",
      description: "Walk-behind concrete saw",
      specs: "20 HP, 20-inch blade capacity",
    },

    // Power Equipment
    {
      id: 10,
      name: "Generator 100kW",
      category: "Power",
      price: "$180/day",
      weeklyPrice: "$1,080/week",
      location: "Layton",
      status: "Available",
      description: "Diesel generator for construction site power",
      specs: "100kW output, 125 gallon fuel tank",
    },
    {
      id: 11,
      name: "Light Tower",
      category: "Power",
      price: "$85/day",
      weeklyPrice: "$510/week",
      location: "Murray",
      status: "Available",
      description: "Portable lighting for night work",
      specs: "4x1000W metal halide, 30ft mast",
    },
    {
      id: 12,
      name: "Welder Generator",
      category: "Power",
      price: "$95/day",
      weeklyPrice: "$570/week",
      location: "Ogden",
      status: "Available",
      description: "Combination welder and generator",
      specs: "300A welding, 12kW generator",
    },

    // Compaction Equipment
    {
      id: 13,
      name: "Vibratory Roller",
      category: "Compaction",
      price: "$320/day",
      weeklyPrice: "$1,920/week",
      location: "Murray",
      status: "Limited",
      description: "Vibratory roller for asphalt and soil compaction",
      specs: "66-inch drum width, 3-ton operating weight",
    },
    {
      id: 14,
      name: "Plate Compactor",
      category: "Compaction",
      price: "$65/day",
      weeklyPrice: "$390/week",
      location: "Salt Lake City",
      status: "Available",
      description: "Walk-behind plate compactor",
      specs: "5,000 lbs compaction force, 21-inch plate",
    },
    {
      id: 15,
      name: "Jumping Jack Tamper",
      category: "Compaction",
      price: "$45/day",
      weeklyPrice: "$270/week",
      location: "Provo",
      status: "Available",
      description: "Rammer for trench compaction",
      specs: "2-stroke engine, 11-inch shoe",
    },

    // Utah Specialty Equipment
    {
      id: 16,
      name: "Snow Plow Attachment",
      category: "Specialty",
      price: "$150/day",
      weeklyPrice: "$900/week",
      location: "Park City",
      status: "Available",
      description: "Heavy-duty snow plow for winter construction",
      specs: "10ft blade, hydraulic angle control",
    },
    {
      id: 17,
      name: "Mining Drill",
      category: "Specialty",
      price: "$380/day",
      weeklyPrice: "$2,280/week",
      location: "Tooele",
      status: "Limited",
      description: "Pneumatic rock drill for mining operations",
      specs: "3.5-inch hole diameter, 20ft depth",
    },
    {
      id: 18,
      name: "Dewatering Pump",
      category: "Specialty",
      price: "$120/day",
      weeklyPrice: "$720/week",
      location: "West Jordan",
      status: "Available",
      description: "High-capacity pump for construction sites",
      specs: "6-inch discharge, 2,000 GPM capacity",
    },
  ]

  const filteredEquipment = allEquipment.filter((equipment) => {
    const matchesCategory = selectedCategory === "All" || equipment.category === selectedCategory
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
            <span className="text-xl font-bold">Agent</span>
          </Link>

          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Demo content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm">
              <Play className="w-4 h-4" />
              Live Demo
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              See Your{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Agent
              </span>{" "}
              in Action
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Experience the power of comprehensive inventory management and equipment rental system designed for Utah
              construction projects.
            </p>
          </div>

          {/* Features showcase */}
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/dashboard" className="block">
              <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6 space-y-4 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">User Management</h3>
                <p className="text-gray-400">
                  Company-based registration system with employee roster management and secure authentication.
                </p>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Company roster system
                </div>
              </div>
            </Link>

            <Link href="/utah-equipment-rental" className="block">
              <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-8 space-y-6 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Equipment Rental</h3>
                <p className="text-gray-400">
                  Utah construction equipment rental with excavators, bulldozers, and specialized machinery.
                </p>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Utah-specific catalog
                </div>
              </div>
            </Link>

            <a href="https://www.homedepot.com" target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6 space-y-4 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Home Depot Inventory</h3>
                <p className="text-gray-400">
                  Complete home improvement inventory system with real Home Depot products and pricing.
                </p>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Real product catalog
                </div>
              </div>
            </a>

            <div className="bg-white/5 border border-gray-600 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-center">Partner Rental Companies</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "United Rentals", url: "https://www.unitedrentals.com" },
                  { name: "Sunbelt Rentals", url: "https://www.sunbeltrentals.com" },
                  { name: "Herc Rentals", url: "https://www.hercrentals.com" },
                  { name: "Home Depot", url: "https://www.homedepot.com/c/tool_truck_rental" },
                  { name: "BigRentz", url: "https://www.bigrentz.com" },
                ].map((company) => (
                  <a
                    key={company.name}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 border border-gray-600 rounded-lg p-3 text-center text-sm font-medium transition-colors"
                  >
                    {company.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Experience the power of integrated business management with our comprehensive solution.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Secure Authentication</h3>
                  <p className="text-gray-400">
                    Enterprise-grade security with email verification and protected routes.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Smart Inventory</h3>
                  <p className="text-gray-400">Real-time inventory tracking with Home Depot product integration.</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
                  <p className="text-gray-400">Comprehensive insights and reporting for better decision making.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
