import React, { useState } from "react";
import {
  LayoutGrid,
  DollarSign,
  Activity,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
}) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
      active
        ? "bg-brand/10 text-brand-light border border-brand/20 shadow-lg shadow-brand/5"
        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent",
    )}
  >
    <Icon
      className={cn(
        "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
        active && "text-brand-light",
      )}
    />
    {!collapsed && (
      <span className="font-medium text-sm tracking-wide">{label}</span>
    )}
    {active && !collapsed && (
      <motion.div
        layoutId="active-pill"
        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-brand-light shadow-[0_0_8px_rgba(167,139,250,0.8)]"
      />
    )}
    {collapsed && (
      <div className="absolute left-full ml-4 px-2 py-1 bg-navy-dark border border-white/10 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
        {label}
      </div>
    )}
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutGrid, label: "Overview", href: "/dashboard" },
    { icon: DollarSign, label: "Revenue", href: "/dashboard/revenue" },
    { icon: Activity, label: "Expenses", href: "/dashboard/expenses" },
    { icon: Users, label: "Subscriptions", href: "/dashboard/subscriptions" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-navy-dark text-slate-100 flex overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-white/5 bg-navy-dark/50 backdrop-blur-xl transition-all duration-500 relative z-20",
          isSidebarCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="h-20 flex items-center px-6 mb-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-linear-to-tr from-brand to-blue-500 rounded-lg shadow-lg shadow-brand/20 shrink-0" />
            {!isSidebarCollapsed && (
              <span className="text-xl font-bold tracking-tight text-white animate-fade-in">
                Runway
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location.pathname === item.href}
              collapsed={isSidebarCollapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <ChevronRight
              className={cn(
                "w-5 h-5 transition-transform duration-500",
                !isSidebarCollapsed && "rotate-180",
              )}
            />
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium">Collapse</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-navy-dark border-r border-white/10 z-50 lg:hidden flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-linear-to-tr from-brand to-blue-500 rounded-lg" />
                  <span className="text-xl font-bold text-white">Runway</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={location.pathname === item.href}
                  />
                ))}
              </nav>
              <div className="pt-6 border-t border-white/5">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Navbar */}
        <header className="h-20 border-b border-white/5 bg-navy-dark/30 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="max-w-md w-full hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-light transition-colors" />
                <input
                  type="text"
                  placeholder="Search analytics, reports..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border-2 border-navy-dark" />
            </button>

            <div className="h-8 w-px bg-white/5 mx-2 hidden sm:block" />

            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white group-hover:text-brand-light transition-colors">
                  Alex Rivers
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Founder Plan
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-brand/20 to-blue-500/20 border border-white/10 flex items-center justify-center group-hover:border-brand/50 transition-all">
                <User className="w-5 h-5 text-brand-light" />
              </div>
              <button className="p-2 text-slate-500 hover:text-red-400 transition-colors hidden sm:block">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
