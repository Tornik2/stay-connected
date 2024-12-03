"use client";

import { useState, useEffect, createContext, useContext } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logout = () => {
    setProfile(null);
  };
  //Function to fetch the user data
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
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Fetch the profile data when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profile, loading, error, logout, fetchProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

// Create a custom hook to use the profile context
export function useProfile() {
  return useContext(ProfileContext);
}
