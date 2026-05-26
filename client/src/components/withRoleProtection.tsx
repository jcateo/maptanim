import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "wouter";
import DashboardLayout from "./DashboardLayout";
import { Loader2 } from "lucide-react";

export function withRoleProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: ("farmer" | "extension_officer" | "admin")[]
) {
  return function ProtectedComponent(props: P) {
    const { user, isLoading } = useAuth();
    const [, setLocation] = useLocation();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      if (!isLoading) {
        if (!user) {
          setLocation("/login");
          setIsAuthorized(false);
        } else if (!allowedRoles.includes(user.role)) {
          setLocation("/dashboard");
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      }
    }, [user, isLoading, setLocation]);

    if (isLoading || isAuthorized === null) {
      return (
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        </DashboardLayout>
      );
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
