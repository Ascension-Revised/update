"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users, Building } from "lucide-react"

interface Employee {
  id: string
  employee_name: string
  employee_email: string
  position: string
  department: string
  hire_date: string
  phone: string
  status: "active" | "inactive"
  company_name: string
}

export default function CompanyRoster() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_email: "",
    position: "",
    department: "",
    hire_date: "",
    phone: "",
    status: "active" as "active" | "inactive",
    company_name: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("company_roster")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setEmployees(data || [])
    } catch (error) {
      console.error("Error fetching employees:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingEmployee) {
        const { error } = await supabase.from("company_roster").update(formData).eq("id", editingEmployee.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("company_roster").insert([formData])

        if (error) throw error
      }

      await fetchEmployees()
      resetForm()
    } catch (error) {
      console.error("Error saving employee:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return

    try {
      const { error } = await supabase.from("company_roster").delete().eq("id", id)

      if (error) throw error
      await fetchEmployees()
    } catch (error) {
      console.error("Error deleting employee:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      employee_name: "",
      employee_email: "",
      position: "",
      department: "",
      hire_date: "",
      phone: "",
      status: "active",
      company_name: "",
    })
    setShowForm(false)
    setEditingEmployee(null)
  }

  const startEdit = (employee: Employee) => {
    setFormData({
      employee_name: employee.employee_name,
      employee_email: employee.employee_email,
      position: employee.position,
      department: employee.department,
      hire_date: employee.hire_date,
      phone: employee.phone,
      status: employee.status,
      company_name: employee.company_name,
    })
    setEditingEmployee(employee)
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/60">Loading roster...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold">Team Roster</span>
          </div>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            {employees.filter((e) => e.status === "active").length} Active
          </Badge>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {showForm && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>{editingEmployee ? "Edit Employee" : "Add New Employee"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Company Name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
              />
              <Input
                placeholder="Employee Name"
                value={formData.employee_name}
                onChange={(e) => setFormData({ ...formData, employee_name: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.employee_email}
                onChange={(e) => setFormData({ ...formData, employee_email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
              />
              <Input
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
              />
              <Input
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                type="date"
                placeholder="Hire Date"
                value={formData.hire_date}
                onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <div className="md:col-span-2 flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingEmployee ? "Update" : "Add"} Employee
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white">{employee.employee_name}</h3>
                  <p className="text-sm text-white/60">{employee.position}</p>
                </div>
                <Badge
                  variant={employee.status === "active" ? "default" : "secondary"}
                  className={
                    employee.status === "active" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                  }
                >
                  {employee.status}
                </Badge>
              </div>

              <div className="space-y-1 text-sm text-white/80 mb-4">
                <p>
                  <Building className="w-3 h-3 inline mr-1" />
                  {employee.company_name}
                </p>
                <p>📧 {employee.employee_email}</p>
                {employee.department && <p>🏢 {employee.department}</p>}
                {employee.phone && <p>📞 {employee.phone}</p>}
                {employee.hire_date && <p>📅 Hired: {new Date(employee.hire_date).toLocaleDateString()}</p>}
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(employee)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(employee.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No employees added yet</h3>
          <p className="text-white/60 mb-4">Start building your company roster by adding your first employee.</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add First Employee
          </Button>
        </div>
      )}
    </div>
  )
}
