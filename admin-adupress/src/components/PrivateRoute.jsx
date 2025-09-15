import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) {
    // đang load dữ liệu từ localStorage → có thể hiển thị spinner
    return <div>Loading...</div>;
  }

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
