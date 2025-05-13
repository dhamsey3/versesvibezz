import { createClient } from "@supabase/supabase-js"

// Create a singleton for client-side usage to prevent multiple instances
let clientSupabaseClient: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientSupabaseClient) return clientSupabaseClient

  // Hardcoded values from the provided environment variables
  const supabaseUrl = "https://igqagttxvzwodkybogpm.supabase.co"
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlncWFndHR4dnp3b2RreWJvZ3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjg2NDIsImV4cCI6MjA2MjY0NDY0Mn0.x27SXysRTcn22T-adfnU0sfh48gWbRFgSvsqe6btZsE"

  clientSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return clientSupabaseClient
}

// Create a server-side Supabase client
export const createServerSupabaseClient = () => {
  // Hardcoded values from the provided environment variables
  const supabaseUrl = "https://igqagttxvzwodkybogpm.supabase.co"
  const supabaseServiceKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlncWFndHR4dnp3b2RreWJvZ3BtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzA2ODY0MiwiZXhwIjoyMDYyNjQ0NjQyfQ.Z0g0MEeloaxEv4Re7vgm1cB2zURQtZfrR2jq_aEoR14"

  return createClient(supabaseUrl, supabaseServiceKey)
}
