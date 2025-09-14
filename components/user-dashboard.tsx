"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogOut, User, Settings, Home, Package } from "lucide-react"
import { signOut } from "@/lib/actions"
import Link from "next/link"
import { useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface UserDashboardProps {
  user: SupabaseUser
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Welcome back, {user.email}</p>
        </div>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-gray-300">Manage your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email || ""}
                disabled
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-id" className="text-gray-200">
                User ID
              </Label>
              <Input
                id="user-id"
                value={user.id}
                disabled
                className="bg-white/10 border-white/20 text-white font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="created-at" className="text-gray-200">
                Member Since
              </Label>
              <Input
                id="created-at"
                value={new Date(user.created_at).toLocaleDateString()}
                disabled
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Account Settings
            </CardTitle>
            <CardDescription className="text-gray-300">Configure your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-200">Email Verified</Label>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${user.email_confirmed_at ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-white">{user.email_confirmed_at ? "Verified" : "Not Verified"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-200">Last Sign In</Label>
              <p className="text-white">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Never"}
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-300">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-20 flex-col"
              >
                <User className="h-6 w-6 mb-2" />
                Update Profile
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-20 flex-col"
              >
                <Settings className="h-6 w-6 mb-2" />
                Account Settings
              </Button>
              <Link href="/inventory" className="w-full">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-20 flex-col w-full"
                >
                  <Package className="h-6 w-6 mb-2" />
                  Inventory
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-20 flex-col w-full"
                >
                  <Home className="h-6 w-6 mb-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
