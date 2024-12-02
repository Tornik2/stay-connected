"use client";

import { useState, useEffect, createContext, useContext } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const profileData = await response.json();
        setProfile(profileData);
        console.log(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Create a custom hook to use the profile context
export function useProfile() {
  return useContext(ProfileContext);
}
