import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

import FarmerDashboard from "./dashboards/FarmerDashboard";
import OfficerDashboard from "./dashboards/OfficerDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  switch (user.role) {
    case "farmer":
      return <FarmerDashboard />;
    case "extension_officer":
      return <OfficerDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <div>Unknown role</div>;
  }
}
