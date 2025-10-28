import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextValue";
import { account, ID } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in when app starts
  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.warn("No active session:", error);
        setUser(null);
      }
    };
    getUser();
  }, []);

  //  Login with email & password
  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials!");
    }
  };

  //  Logout current user
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Register new user
  const register = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password); // auto-login after registration
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed! Try again.");
    }
  };

  const value = { user, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
