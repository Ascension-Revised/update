-- Create company roster table for managing employees
CREATE TABLE IF NOT EXISTS public.company_roster (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  employee_email TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  hire_date DATE,
  phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE public.company_roster ENABLE ROW LEVEL SECURITY;

-- Users can only see their own company roster
CREATE POLICY "Users can view own company roster" ON public.company_roster
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own company roster entries
CREATE POLICY "Users can insert own company roster" ON public.company_roster
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own company roster entries
CREATE POLICY "Users can update own company roster" ON public.company_roster
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own company roster entries
CREATE POLICY "Users can delete own company roster" ON public.company_roster
  FOR DELETE USING (auth.uid() = user_id);
