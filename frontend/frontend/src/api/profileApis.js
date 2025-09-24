// src/api/profileApis.js
import { supabase } from "../supabaseClient.js";

/**
 * Fetches the public profile for a user.
 * @param {object} user The user object from the Supabase session.
 * @returns {object|null} The user's profile data or null if not found.
 */
export const getProfile = async (user) => {
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }

  // Check if a profile was found.
  if (data && data.length > 0) {
    return data[0];
  }

  return null;
};

/**
 * Creates a new profile record for a user.
 * This is called when a new user signs up.
 * @param {object} user The user object from the Supabase session.
 * @returns {object} The newly created profile data.
 */
export const createProfile = async (user) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      // You can add other default values here (e.g., username)
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating new profile:", error);
    throw error;
  }

  return data;
};

/**
 * Updates the profile for the currently logged-in user.
 * This function is now more secure with Row Level Security (RLS) policies.
 * @param {object} updates An object containing the fields to update.
 */
export const updateProfile = async (updates) => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }

  return data;
};