import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from "wouter";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { queryClient, trpcClient, trpc } from "./lib/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import OfficerDashboard from "./pages/dashboards/OfficerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import DashboardLayout from "./components/DashboardLayout";
import NewFarm from "./pages/farms/NewFarm";
import FarmDetail from "./pages/farms/FarmDetail";
import NewZone from "./pages/farms/NewZone";
import CropLibrary from "./pages/crops/CropLibrary";
import CropDetail from "./pages/crops/CropDetail";
import Community from "./pages/community/Community";
import NewPost from "./pages/community/NewPost";
import Monitoring from "./pages/farmer/Monitoring";
import PlantingPlans from "./pages/farmer/PlantingPlans";
import PlantingCalendar from "./pages/farmer/PlantingCalendar";
import ZoneVerifications from "./pages/officer/ZoneVerifications";
import VerifyZone from "./pages/officer/VerifyZone";
import ManageUsers from "./pages/admin/ManageUsers";
import SystemHealth from "./pages/admin/SystemHealth";
import Analytics from "./pages/admin/Analytics";
import CompanionPlanting from "./pages/shared/CompanionPlanting";
import LayoutBuilder from "./pages/farmer/LayoutBuilder";
import Research from "./pages/shared/Research";
import Collaboration from "./pages/admin/Collaboration";
import LandExplorer from "./pages/farmer/LandExplorer";
import Reports from "./pages/shared/Reports";
import Settings from "./pages/shared/Settings";
import Team from "./pages/farmer/Team";
import Ecosystem from "./pages/dashboards/Ecosystem";
import NotFound from "./pages/NotFound";

import { Globe, Briefcase, FileText, Globe2, Users, LayoutDashboard, Clock } from 'lucide-react';

function ComingSoon({ phase, title, description, icon: Icon }: any) {
  return (
    <DashboardLayout>
      <div className="page-enter p-6 max-w-5xl mx-auto text-center py-20">
        <Icon className="w-[64px] h-[64px] text-gray-200 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-700 mt-4">{title}</h2>
        <div className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full inline-block mt-2">
          Phase {phase}
        </div>
        <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-lg mx-auto">
          {description}
        </p>
        <div className="bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1 mt-5">
          <Clock className="w-[12px] h-[12px]" />
          In Development
        </div>
      </div>
    </DashboardLayout>
  );
}

function RoleAwareDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation('/login');
    }
  }, [user, setLocation]);

  if (!user) return null;

  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'extension_officer') return <OfficerDashboard />;
  return <FarmerDashboard />;
}

function RedirectAuth({ component: Component }: { component: React.ComponentType }) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      setLocation('/dashboard');
    }
  }, [user, setLocation]);

  if (user) return null;
  return <Component />;
}

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <div className="min-h-screen bg-neutral-50 text-neutral-600 font-sans">
              <Switch>
                <Route path="/" component={Landing} />
                <Route path="/login"><RedirectAuth component={Login} /></Route>
                <Route path="/register"><RedirectAuth component={Register} /></Route>
                
                {/* Role-aware Dashboard */}
                <Route path="/dashboard" component={RoleAwareDashboard} />
                
                {/* Farmer Routes */}
                <Route path="/farms" component={RoleAwareDashboard} />
                <Route path="/farms/new" component={NewFarm} />
                <Route path="/farms/:id/zones/new" component={NewZone} />
                <Route path="/farms/:id" component={FarmDetail} />
                <Route path="/monitoring" component={Monitoring} />
                <Route path="/planting-plans" component={PlantingPlans} />
                <Route path="/calendar" component={PlantingCalendar} />
                <Route path="/layout-builder" component={LayoutBuilder} />

                {/* Officer Routes */}
                <Route path="/verify/zones" component={ZoneVerifications} />
                <Route path="/verify/:id" component={VerifyZone} />

                {/* Admin Routes */}
                <Route path="/admin/users" component={ManageUsers} />
                <Route path="/admin/system" component={SystemHealth} />
                <Route path="/admin/analytics" component={Analytics} />
                <Route path="/admin/collaboration" component={Collaboration} />

                {/* Shared Routes */}
                <Route path="/crops/:id" component={CropDetail} />
                <Route path="/crops" component={CropLibrary} />
                <Route path="/companion-planting" component={CompanionPlanting} />
                <Route path="/community/new" component={NewPost} />
                <Route path="/community" component={Community} />
                <Route path="/research" component={Research} />

                {/* Advanced Features (Phases 9-15) */}
                <Route path="/land-explorer" component={LandExplorer} />
                {/* Backwards-compatible route */}
                <Route path="/farm-operations" component={PlantingCalendar} />
                <Route path="/reports" component={Reports} />
                <Route path="/settings" component={Settings} />
                <Route path="/team" component={Team} />
                <Route path="/ecosystem" component={Ecosystem} />

                {/* 404 Route */}
                <Route path="/:rest*" component={NotFound} />
              </Switch>
              <Toaster position="top-right" richColors />
            </div>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
