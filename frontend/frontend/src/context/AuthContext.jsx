import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { getProfile, createProfile } from "../api/profileApis.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async (currentUser) => {
      try {
        let profileData = await getProfile(currentUser);
        if (!profileData) {
          profileData = await createProfile(currentUser);
        }
        setProfile(profileData);
      } catch (error) {
        console.error("Error loading profile:", error.message);
        setProfile(null);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (event === "SIGNED_IN" && currentUser) {
          setLoading(true);
          await loadProfile(currentUser);
          setLoading(false);
        }

        if (event === "SIGNED_OUT") {
          setProfile(null);
        }
      }
    );

    // initial session check
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) await loadProfile(currentUser);
      setLoading(false);
    })();

    return () => subscription?.unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, profile, loading }), [user, profile, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
