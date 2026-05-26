import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import {
  Sprout,
  LayoutDashboard,
  Activity,
  Grid3X3,
  LayoutTemplate,
  BookOpen,
  GitMerge,
  FlaskConical,
  MessageSquare,
  ClipboardCheck,
  Shield,
  Users,
  BarChart3,
  Server,
  Users2,
  Search,
  Menu,
  X,
  LogOut,
  Globe,
  Briefcase,
  FileText,
  Globe2
} from "lucide-react";
import NotificationBell from "./NotificationBell"; // Assume this component will be updated separately

type NavSection = {
  label: string;
  items: { name: string; href: string; icon: React.ElementType }[];
};

const getNavigation = (role: string): NavSection[] => {
  if (role === "farmer") {
    return [
      {
        label: "MAIN",
        items: [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "Monitoring Hub", href: "/monitoring", icon: Activity },
        ],
      },
      {
        label: "FARM TOOLS",
        items: [
          { name: "Planting Plans", href: "/planting-plans", icon: Grid3X3 },
          { name: "Layout Builder", href: "/layout-builder", icon: LayoutTemplate },
        ],
      },
      {
        label: "KNOWLEDGE",
        items: [
          { name: "Crop Library", href: "/crops", icon: BookOpen },
          { name: "Companion Planting", href: "/companion-planting", icon: GitMerge },
          { name: "Research Data", href: "/research", icon: FlaskConical },
        ],
      },
      {
        label: "COMMUNITY",
        items: [
          { name: "Community Forum", href: "/community", icon: MessageSquare },
        ],
      },
      {
        label: "ADVANCED",
        items: [
          { name: "Land Explorer", href: "/land-explorer", icon: Globe },
          { name: "Farm Operations", href: "/farm-operations", icon: Briefcase },
          { name: "Reports", href: "/reports", icon: FileText },
        ],
      },
      {
        label: "SETTINGS",
        items: [
          { name: "Language & Access", href: "/settings", icon: Globe2 },
          { name: "Team", href: "/team", icon: Users },
          { name: "Ecosystem Dashboard", href: "/ecosystem", icon: LayoutDashboard },
        ],
      },
    ];
  }

  if (role === "extension_officer") {
    return [
      {
        label: "MAIN",
        items: [
          { name: "Officer Dashboard", href: "/dashboard", icon: ClipboardCheck },
        ],
      },
      {
        label: "KNOWLEDGE",
        items: [
          { name: "Crop Library", href: "/crops", icon: BookOpen },
          { name: "Companion Planting", href: "/companion-planting", icon: GitMerge },
          { name: "Research Data", href: "/research", icon: FlaskConical },
        ],
      },
      {
        label: "COMMUNITY",
        items: [
          { name: "Community Forum", href: "/community", icon: MessageSquare },
        ],
      },
    ];
  }

  if (role === "admin") {
    return [
      {
        label: "ADMINISTRATION",
        items: [
          { name: "System Overview", href: "/dashboard", icon: Shield },
          { name: "Manage Users", href: "/admin/users", icon: Users },
          { name: "Platform Analytics", href: "/admin/analytics", icon: BarChart3 },
          { name: "System Health", href: "/admin/system", icon: Server },
        ],
      },
      {
        label: "TOOLS",
        items: [
          { name: "Collaboration", href: "/admin/collaboration", icon: Users2 },
          { name: "Ecosystem Dashboard", href: "/ecosystem", icon: LayoutDashboard },
        ],
      },
    ];
  }

  return [];
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  const navigationSections = getNavigation(user.role);

  const getPageTitle = () => {
    if (location.startsWith('/farms/new')) return "New Farm Setup";
    if (location.startsWith('/farms/')) return "Farm Control Center";
    if (location.startsWith('/verify/')) return "Zone Verification";

    // Find matching nav item
    for (const section of navigationSections) {
      for (const item of section.items) {
        if (location === item.href) return item.name;
      }
    }
    return "Dashboard";
  };

  const SidebarContent = () => (
    <>
      <div className="h-16 px-6 flex items-center gap-3 shrink-0">
        <Sprout className="w-[28px] h-[28px] text-brand-400" />
        <span className="text-white text-lg font-bold">MapTanim</span>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {navigationSections.map((section, idx) => (
          <div key={section.label}>
            <div className="text-xs uppercase tracking-widest px-4 mt-5 mb-1 text-brand-400 font-medium">
              {section.label}
            </div>
            <div className="space-y-1 px-3">
              {section.items.map((item) => {
                const isActive = location === item.href || location.startsWith(item.href + '/');
                return (
                  <Link key={item.name} href={item.href}>
                    <a className={`flex items-center gap-2.5 px-4 h-[44px] rounded-lg transition-all duration-150 ${isActive ? 'bg-brand-700 text-white font-semibold border-l-3 border-brand-400' : 'text-brand-300 hover:bg-brand-800 hover:text-white group'}`}>
                      <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-brand-300 group-hover:text-white transition-colors duration-150'}`} />
                      <span className="text-sm">{item.name}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
            {idx < navigationSections.length - 1 && (
              <div className="border-t border-brand-800 mx-4 my-3"></div>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t border-brand-800 p-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-full bg-brand-800 text-white flex items-center justify-center font-semibold text-sm shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-brand-300 capitalize truncate">{user.role.replace('_', ' ')}</p>
          </div>
          <button onClick={logout} className="text-brand-300 hover:text-white flex items-center gap-1 transition-colors" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-inter">
      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-brand-900 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Mobile close button */}
        <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 text-brand-300 hover:text-white lg:hidden">
          <X className="w-6 h-6" />
        </button>

        <SidebarContent />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER TOP BAR */}
        <header className="h-[64px] bg-white border-b border-gray-200 shadow-sm px-6 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 truncate">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="w-[15px] h-[15px] text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-56 pl-9 pr-4 py-2 bg-gray-100 border-none focus:bg-white focus:ring-2 focus:ring-brand-500 rounded-full text-sm text-gray-600 outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            <NotificationBell />

            <div className="w-[36px] h-[36px] rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold text-sm shrink-0 ml-1">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="page-enter">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
