"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, AlertTriangle, TrendingUp, PieChart } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  quantity: number
  price: number
  material: string
}

interface CategoryStats {
  category: string
  count: number
  totalValue: number
}

interface MaterialStats {
  material: string
  count: number
  totalQuantity: number
}

const materialColors: Record<string, string> = {
  Steel: "bg-gray-500",
  Wood: "bg-amber-600",
  Concrete: "bg-stone-500",
  Aluminum: "bg-slate-400",
  Copper: "bg-orange-600",
  PVC: "bg-blue-500",
  Glass: "bg-cyan-400",
  Ceramic: "bg-red-500",
  Composite: "bg-purple-500",
  Other: "bg-gray-400",
}

export default function InventoryAnalytics() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([])
  const [materialStats, setMaterialStats] = useState<MaterialStats[]>([])
  const [lowStockItems, setLowStockItems] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/inventory")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
        calculateStats(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (products: Product[]) => {
    // Category statistics
    const categoryMap = new Map<string, { count: number; totalValue: number }>()
    products.forEach((product) => {
      const existing = categoryMap.get(product.category) || { count: 0, totalValue: 0 }
      categoryMap.set(product.category, {
        count: existing.count + 1,
        totalValue: existing.totalValue + product.price * product.quantity,
      })
    })
    setCategoryStats(
      Array.from(categoryMap.entries()).map(([category, stats]) => ({
        category,
        ...stats,
      })),
    )

    // Material statistics
    const materialMap = new Map<string, { count: number; totalQuantity: number }>()
    products.forEach((product) => {
      const existing = materialMap.get(product.material) || { count: 0, totalQuantity: 0 }
      materialMap.set(product.material, {
        count: existing.count + 1,
        totalQuantity: existing.totalQuantity + product.quantity,
      })
    })
    setMaterialStats(
      Array.from(materialMap.entries()).map(([material, stats]) => ({
        material,
        ...stats,
      })),
    )

    // Low stock items (quantity < 10)
    setLowStockItems(products.filter((product) => product.quantity < 10))
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const averageValue = totalProducts > 0 ? totalValue / totalProducts : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white">Loading analytics...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Inventory Analytics</h1>
          <p className="text-blue-200">Comprehensive overview of your construction inventory</p>
        </div>
        <Link href="/inventory">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Inventory
          </Button>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/10 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Products</CardTitle>
            <Package className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalProducts}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Average Value</CardTitle>
            <PieChart className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${averageValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{lowStockItems.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Category Breakdown</CardTitle>
          <CardDescription className="text-blue-200">Product distribution and value by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((stat) => (
              <div key={stat.category} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                    {stat.category}
                  </Badge>
                  <span className="text-sm text-blue-200">{stat.count} items</span>
                </div>
                <div className="text-lg font-semibold text-white">${stat.totalValue.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Material Usage */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Material Usage</CardTitle>
          <CardDescription className="text-blue-200">Construction materials in your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materialStats.map((stat) => (
              <div key={stat.material} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${materialColors[stat.material] || "bg-gray-400"} text-white`}>
                    {stat.material}
                  </Badge>
                  <span className="text-sm text-blue-200">{stat.count} products</span>
                </div>
                <div className="text-lg font-semibold text-white">{stat.totalQuantity} units</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Low Stock Alert
            </CardTitle>
            <CardDescription className="text-red-200">Items with quantity below 10 units</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div>
                    <span className="text-white font-medium">{item.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                        {item.category}
                      </Badge>
                      <Badge className={`${materialColors[item.material]} text-white`}>{item.material}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-semibold">{item.quantity} units</div>
                    <div className="text-sm text-blue-200">${item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
