import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    let query = supabase.from("products").select("*").eq("user_id", user.id).order("created_at", { ascending: false })

    // Add search functionality
    if (search) {
      query = query.or(`name.ilike.%${search}%,category.ilike.%${search}%`)
    }

    const { data: products, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { product_id, name, category, quantity, price } = body

    // Validate required fields
    if (!product_id || !name || !category || quantity === undefined || price === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if product_id already exists for this user
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product_id)
      .single()

    if (existing) {
      return NextResponse.json({ error: "Product ID already exists" }, { status: 409 })
    }

    const { data: product, error } = await supabase
      .from("products")
      .insert({
        product_id,
        name,
        category,
        quantity: Number.parseInt(quantity),
        price: Number.parseFloat(price),
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
