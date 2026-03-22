import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import RevenueManagement from "./pages/RevenueManagement";
import ExpenseManagement from "./pages/ExpenseManagement";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import Changelog from "./pages/Changelog";
import { useAuth } from "./hooks/useAuth";
import FinancialProfile from "./pages/FinancialProfile";
export default function App() {
  useAuth();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/changelog" element={<Changelog />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard/*"
        element={
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/revenue" element={<RevenueManagement />} />
              <Route path="/expenses" element={<ExpenseManagement />} />
              <Route
                path="/subscriptions"
                element={<SubscriptionManagement />}
              />
              <Route path="/finance-profile" element={<FinancialProfile />} />

              <Route path="*" element={<DashboardOverview />} />
            </Routes>
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
