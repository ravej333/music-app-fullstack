import { createClient } from '@supabase/supabase-js';

// Get the URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the variables are set before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing. Please check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);