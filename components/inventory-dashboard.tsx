"use client"

import { useState } from "react"
import { InventoryForm } from "./inventory-form"
import { InventoryList } from "./inventory-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3 } from "lucide-react"
import Link from "next/link"

export function InventoryDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleProductAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/inventory/analytics">
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <InventoryForm onProductAdded={handleProductAdded} />
        </div>
        <div>
          <InventoryList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  )
}
