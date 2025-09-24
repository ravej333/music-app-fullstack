import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from the .env file in the project's root
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// A crucial check to ensure your environment variables are loaded correctly.
// If these are missing, the app will fail with a clear error message.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Please check your .env file.");
}

// Create and export the Supabase client, which will be used in your models.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

