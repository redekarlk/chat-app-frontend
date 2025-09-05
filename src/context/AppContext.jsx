"use client";
import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  // ✅ Use NEXT_PUBLIC_ prefix
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  axios.defaults.baseURL = backendUrl;
  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch authentication state
  const getAuthState = async () => {
    try {
      const { data } = await axios.get("/api/user-auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  // Fetch user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/user-auth/user-data");
      if (data.success && data.user) {
        setUserData(data.user);
      } else {
        toast.error(data.message || "User data not found.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user data.");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = useMemo(
    () => ({
      backendUrl,
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      getUserData,
    }),
    [backendUrl, isLoggedIn, userData]
  );

  return (
    <AppContent.Provider value={value}>{children}</AppContent.Provider>
  );
};
