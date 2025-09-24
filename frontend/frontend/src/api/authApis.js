import { supabase } from "../supabaseClient.js";

// Sign up new user
export const signupUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

// Login with email/password
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

// Logout user
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Login with Google OAuth
export const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin, // redirect back to app after login
    },
  });
  if (error) throw error;
};