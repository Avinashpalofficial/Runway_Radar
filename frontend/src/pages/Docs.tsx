import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  ChevronRight,
  Search,
  Menu,
  X,
  ArrowRight,
  Zap,
  DollarSign,
  Activity,
  RefreshCw,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-navy-dark/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="w-6 h-6 bg-linear-to-tr from-brand to-blue-500 rounded-lg shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform" />
        <span className="text-lg font-bold tracking-tight text-white">
          Runway
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <Link to="/features" className="hover:text-white transition-colors">
          Features
        </Link>
        {/* <Link to="/pricing" className="hover:text-white transition-colors">
          Pricing
        </Link> */}
        <Link to="/docs" className="text-white transition-colors">
          Docs
        </Link>
        <Link to="/changelog" className="hover:text-white transition-colors">
          Changelog
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="bg-white text-navy-dark px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-all"
        >
          Start Free
        </Link>
      </div>
    </div>
  </nav>
);

const SidebarItem = ({ label, href, active, onClick }: any) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      "flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all group",
      active
        ? "bg-brand/10 text-brand-light border border-brand/20"
        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent",
    )}
  >
    {label}
    <ChevronRight
      className={cn(
        "w-4 h-4 transition-transform",
        active
          ? "translate-x-0 opacity-100"
          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
      )}
    />
  </a>
);

const DocSection = ({ id, title, children }: any) => (
  <section
    id={id}
    className="py-12 first:pt-0 border-b border-white/5 last:border-0"
  >
    <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
      {title}
    </h2>
    <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

export default function Docs() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "revenue", label: "Revenue Tracking", icon: DollarSign },
    { id: "expenses", label: "Expense Management", icon: Activity },
    { id: "subscriptions", label: "Subscriptions", icon: RefreshCw },
    { id: "calculation", label: "Runway Calculation", icon: Clock },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-navy-dark text-slate-100 selection:bg-brand/30">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-32 h-fit">
          <div className="mb-8 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-light transition-colors" />
            <input
              type="text"
              placeholder="Search docs..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
            />
          </div>
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">
              Documentation
            </div>
            {sections.map((section) => (
              <SidebarItem
                key={section.id}
                label={section.label}
                href={`#${section.id}`}
                active={activeSection === section.id}
                onClick={(e: any) => {
                  e.preventDefault();
                  handleNavClick(section.id);
                }}
              />
            ))}
          </nav>
        </aside>

        {/* Mobile Nav Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden flex items-center gap-2 text-sm font-bold text-brand-light mb-4"
        >
          <Menu className="w-5 h-5" /> Documentation Menu
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="fixed inset-y-0 left-0 w-72 bg-navy-dark border-r border-white/10 z-50 lg:hidden p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold text-white">Docs</span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <SidebarItem
                      key={section.id}
                      label={section.label}
                      href={`#${section.id}`}
                      active={activeSection === section.id}
                      onClick={(e: any) => {
                        e.preventDefault();
                        handleNavClick(section.id);
                      }}
                    />
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl">
          <DocSection id="getting-started" title="Getting Started">
            <p>
              Welcome to Runway Dashboard. Our platform is designed to give
              startup founders absolute clarity over their financial future.
              Follow these steps to get up and running in minutes.
            </p>

            <h3 className="text-white font-bold mt-8 mb-4">
              1. Create Your Account
            </h3>
            <p>
              Sign up using your work email. We recommend using a secure
              password or connecting via Google/GitHub for a seamless
              experience. Once logged in, you'll be guided through a quick
              onboarding wizard.
            </p>

            <h3 className="text-white font-bold mt-8 mb-4">
              2. Add Financial Data
            </h3>
            <p>There are three ways to populate your dashboard:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Direct Integration:</strong> Connect Stripe, Paddle, or
                your bank accounts via Plaid for real-time automated updates.
              </li>
              <li>
                <strong>CSV Import:</strong> Upload your historical data from
                spreadsheets or accounting software.
              </li>
              <li>
                <strong>Manual Entry:</strong> Add individual revenue and
                expense items directly through our management interfaces.
              </li>
            </ul>

            <div className="mt-8 p-6 bg-brand/5 border border-brand/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-brand-light" />
                <span className="font-bold text-white">Pro Tip</span>
              </div>
              <p className="text-sm">
                Connecting your bank account is the fastest way to get an
                accurate burn rate calculation automatically.
              </p>
            </div>
          </DocSection>

          <DocSection id="revenue" title="Revenue Tracking">
            <p>
              Revenue is the lifeblood of your startup. Runway Dashboard helps
              you track every cent coming in, categorized by source and type.
            </p>
            <p>
              Navigate to the <strong>Revenue</strong> tab in your dashboard to
              see a detailed breakdown of your income. You can filter by month,
              search for specific customers, and see your growth trends at a
              glance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="font-bold text-white mb-1">MRR Tracking</div>
                <p className="text-xs">
                  Automatically calculate your Monthly Recurring Revenue from
                  subscription data.
                </p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="font-bold text-white mb-1">One-time Deals</div>
                <p className="text-xs">
                  Track large enterprise contracts or service fees separately
                  from recurring income.
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection id="expenses" title="Expense Management">
            <p>
              Understanding your burn is critical for survival. Our expense
              management tools allow you to categorize spend and identify areas
              for optimization.
            </p>
            <p>
              We automatically tag common vendors like AWS, Google Ads, and
              Slack to their respective categories (Infrastructure, Marketing,
              SaaS), giving you an instant view of where your money is going.
            </p>
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <div className="font-bold text-white mb-1">
                  Ready to audit your spend?
                </div>
                <p className="text-sm">
                  View our guide on reducing SaaS waste.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-brand-light" />
            </div>
          </DocSection>

          <DocSection id="subscriptions" title="Subscription Tracking">
            <p>
              SaaS sprawl is a real problem for growing teams. The Subscriptions
              page provides a centralized view of every recurring tool your team
              is paying for.
            </p>
            <p>
              Track renewal dates, billing cycles (monthly vs. yearly), and
              identify "ghost" subscriptions that are no longer being used. Our
              AI insights will even suggest where you can save money by
              switching to annual billing.
            </p>
          </DocSection>

          <DocSection id="calculation" title="How Runway is Calculated">
            <p>
              Runway is the amount of time your startup can survive before
              running out of cash, assuming your current revenue and expenses
              remain constant.
            </p>
            <div className="my-8 p-8 bg-navy-dark border border-white/10 rounded-3xl text-center">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                The Formula
              </div>
              <div className="text-2xl md:text-3xl font-mono text-white tracking-tight">
                Runway = Total Cash / (Monthly Expenses - Monthly Revenue)
              </div>
            </div>
            <p>
              If your revenue exceeds your expenses, you are "Default Alive" and
              your runway is technically infinite. If your expenses exceed your
              revenue, you are "Default Dead" and need to either increase
              revenue, decrease expenses, or raise more capital before your
              runway hits zero.
            </p>

            <div className="mt-12 flex items-center justify-between p-8 bg-linear-to-r from-brand/20 to-blue-500/20 rounded-[32px] border border-white/10">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Need more help?
                </h4>
                <p className="text-slate-400 text-sm">
                  Our support team is available 24/7 for Pro members.
                </p>
              </div>
              <button className="px-6 py-3 bg-white text-navy-dark font-bold rounded-xl hover:bg-slate-200 transition-all">
                Contact Support
              </button>
            </div>
          </DocSection>

          {/* Footer */}
          <footer className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              © 2024 Runway Financial Inc.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
