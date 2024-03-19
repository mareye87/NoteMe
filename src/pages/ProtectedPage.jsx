import React from "react";
import Layout from "./Layout";
import { useAuth } from "../components/authProvider";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedPage = () => {
  const { user } = useAuth();

  // console.log("user at protectedPage: ", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

export default ProtectedPage;
