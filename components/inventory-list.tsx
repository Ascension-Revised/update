"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, Trash2 } from "lucide-react"
import { EditProductDialog } from "./edit-product-dialog"

interface Product {
  id: string
  product_id: string
  name: string
  category: string
  quantity: number
  price: number
  construction_material: string // Added construction material field
  created_at: string
}

interface InventoryListProps {
  refreshTrigger: number
}

export function InventoryList({ refreshTrigger }: InventoryListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const fetchProducts = async () => {
    try {
      const url = searchTerm ? `/api/inventory?search=${encodeURIComponent(searchTerm)}` : "/api/inventory"
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error("Failed to delete product:", error)
    }
  }

  const handleSearch = () => {
    fetchProducts()
  }

  const getMaterialBadgeColor = (material: string) => {
    const colors: { [key: string]: string } = {
      Steel: "bg-gray-100 text-gray-800",
      Concrete: "bg-stone-100 text-stone-800",
      Wood: "bg-amber-100 text-amber-800",
      Aluminum: "bg-slate-100 text-slate-800",
      Copper: "bg-orange-100 text-orange-800",
      PVC: "bg-blue-100 text-blue-800",
      Fiberglass: "bg-green-100 text-green-800",
      Ceramic: "bg-red-100 text-red-800",
      Glass: "bg-cyan-100 text-cyan-800",
      Composite: "bg-purple-100 text-purple-800",
      Rubber: "bg-yellow-100 text-yellow-800",
    }
    return colors[material] || "bg-gray-100 text-gray-800"
  }

  useEffect(() => {
    fetchProducts()
  }, [refreshTrigger])

  if (isLoading) {
    return <div className="text-center py-8">Loading inventory...</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Inventory ({products.length} items)
        </CardTitle>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products by name, category, or material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "No products found matching your search." : "No products in inventory yet."}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge className={getMaterialBadgeColor(product.construction_material)}>
                        {product.construction_material}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">ID:</span> {product.product_id}
                      </div>
                      <div>
                        <span className="font-medium">Quantity:</span> {product.quantity}
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> ${product.price.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Total Value:</span> $
                        {(product.quantity * product.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={fetchProducts}
        />
      )}
    </Card>
  )
}
