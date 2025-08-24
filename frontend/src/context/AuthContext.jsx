import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const safeParse = (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item || item === "undefined" || item === "null") return null;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  };

  const [user, setUser] = useState(safeParse("user"));
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const register = (userData, tokenValue, navigate) => {
    setUser(userData);
    setToken(tokenValue);
    // ✅ Sau khi đăng ký thành công → chuyển về login
    if (navigate) navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
