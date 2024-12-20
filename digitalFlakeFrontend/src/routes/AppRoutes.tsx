import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import Category from "../components/Category/Category";
import Subcategory from "../components/Subcategory/Subcategory";
import Products from "../components/Products/Products";
import LayoutWrapper from "../pages/LayoutWrapper";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/home"
          element={
            <LayoutWrapper>
              <Dashboard />
            </LayoutWrapper>
          }
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/category"
          element={
            <LayoutWrapper>
              <Category />
            </LayoutWrapper>
          }
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route
          path="/subcategory"
          element={
            <LayoutWrapper>
              <Subcategory />
            </LayoutWrapper>
          }
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route
          path="/products"
          element={
            <LayoutWrapper>
              <Products />
            </LayoutWrapper>
          }
        />
      </Route>
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
