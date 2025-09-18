"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InventoryFormProps {
  onProductAdded: () => void
}

const homeDepotProducts = [
  { id: "HD001", name: "2x4x8 Pressure Treated Lumber", category: "Lumber", material: "Wood", price: "8.97" },
  {
    id: "HD002",
    name: "1/2 in. x 4 ft. x 8 ft. Plywood Sheathing",
    category: "Lumber",
    material: "Wood",
    price: "42.98",
  },
  { id: "HD003", name: "16d Common Nails (50 lb. Box)", category: "Hardware", material: "Steel", price: "89.98" },
  { id: "HD004", name: "Quikrete 80 lb. Concrete Mix", category: "Concrete", material: "Concrete", price: "4.48" },
  { id: "HD005", name: "12-2 Romex Wire (250 ft.)", category: "Electrical", material: "Copper", price: "89.97" },
  { id: "HD006", name: "1/2 in. PVC Pipe (10 ft.)", category: "Plumbing", material: "PVC", price: "3.97" },
  {
    id: "HD007",
    name: "Owens Corning R-13 Insulation",
    category: "Insulation",
    material: "Fiberglass",
    price: "44.98",
  },
  {
    id: "HD008",
    name: "Architectural Shingles (33.3 sq. ft.)",
    category: "Roofing",
    material: "Composite",
    price: "98.97",
  },
  {
    id: "HD009",
    name: "Ceramic Floor Tile 12x12 (Box of 20)",
    category: "Flooring",
    material: "Ceramic",
    price: "24.98",
  },
  { id: "HD010", name: "Galvanized Steel Angle Bracket", category: "Hardware", material: "Steel", price: "2.47" },
]

export function InventoryForm({ onProductAdded }: InventoryFormProps) {
  const [formData, setFormData] = useState({
    product_id: "",
    name: "",
    category: "",
    quantity: "",
    price: "",
    construction_material: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleProductSelect = (productId: string) => {
    const product = homeDepotProducts.find((p) => p.id === productId)
    if (product) {
      setFormData({
        product_id: product.id,
        name: product.name,
        category: product.category,
        quantity: "1",
        price: product.price,
        construction_material: product.material,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add product")
      }

      // Reset form
      setFormData({
        product_id: "",
        name: "",
        category: "",
        quantity: "",
        price: "",
        construction_material: "",
      })
      onProductAdded()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Add Home Depot Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preset-products">Quick Add Home Depot Products</Label>
            <Select onValueChange={handleProductSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Home Depot product" />
              </SelectTrigger>
              <SelectContent>
                {homeDepotProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - ${product.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product_id">Product ID</Label>
              <Input
                id="product_id"
                value={formData.product_id}
                onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                placeholder="Enter Home Depot SKU"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lumber">Lumber</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Roofing">Roofing</SelectItem>
                  <SelectItem value="Flooring">Flooring</SelectItem>
                  <SelectItem value="Insulation">Insulation</SelectItem>
                  <SelectItem value="Concrete">Concrete</SelectItem>
                  <SelectItem value="Paint">Paint</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="construction_material">Material</Label>
              <Select
                value={formData.construction_material}
                onValueChange={(value) => setFormData({ ...formData, construction_material: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wood">Wood</SelectItem>
                  <SelectItem value="Steel">Steel</SelectItem>
                  <SelectItem value="Concrete">Concrete</SelectItem>
                  <SelectItem value="Aluminum">Aluminum</SelectItem>
                  <SelectItem value="Copper">Copper</SelectItem>
                  <SelectItem value="PVC">PVC</SelectItem>
                  <SelectItem value="Fiberglass">Fiberglass</SelectItem>
                  <SelectItem value="Ceramic">Ceramic</SelectItem>
                  <SelectItem value="Composite">Composite</SelectItem>
                  <SelectItem value="Vinyl">Vinyl</SelectItem>
                  <SelectItem value="Brick">Brick</SelectItem>
                  <SelectItem value="Stone">Stone</SelectItem>
                  <SelectItem value="Glass">Glass</SelectItem>
                  <SelectItem value="Drywall">Drywall</SelectItem>
                  <SelectItem value="Insulation">Insulation</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Enter quantity"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" disabled={isLoading} className="w-full bg-orange-600 hover:bg-orange-700">
            {isLoading ? "Adding Product..." : "Add to Inventory"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
