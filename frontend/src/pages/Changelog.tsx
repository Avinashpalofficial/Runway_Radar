import React from "react";
import { motion } from "motion/react";
import {
  Rocket,
  Zap,
  ShieldCheck,
  Layout,
  DollarSign,
  Activity,
  RefreshCw,
  Clock,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-navy-dark/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="w-8 h-8 bg-linear-to-tr from-brand to-blue-500 rounded-lg shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform" />
        <span className="text-xl font-bold tracking-tight text-white">
          Runway
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <Link to="/features" className="hover:text-white transition-colors">
          Features
        </Link>
        <Link to="/pricing" className="hover:text-white transition-colors">
          Pricing
        </Link>
        <Link to="/docs" className="hover:text-white transition-colors">
          Docs
        </Link>
        <Link
          to="/changelog"
          className="text-white transition-colors relative group"
        >
          Changelog
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand" />
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
          className="bg-white text-navy-dark px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-all shadow-lg shadow-white/10"
        >
          Start Free
        </Link>
      </div>
    </div>
  </nav>
);

const ChangelogEntry = ({
  version,
  date,
  title,
  description,
  features,
  isLatest,
  delay,
}: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="relative pl-12 pb-20 last:pb-0"
  >
    {/* Timeline Line */}
    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/5" />

    {/* Timeline Dot */}
    <div
      className={cn(
        "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-navy-dark transition-all duration-500",
        isLatest
          ? "bg-brand text-white shadow-lg shadow-brand/40 scale-110"
          : "bg-white/5 text-slate-500 border-white/5",
      )}
    >
      {isLatest ? (
        <Rocket className="w-5 h-5" />
      ) : (
        <Clock className="w-5 h-5" />
      )}
    </div>

    <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-6">
      <div
        className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit",
          isLatest
            ? "bg-brand/20 text-brand-light border border-brand/30"
            : "bg-white/5 text-slate-500 border border-white/10",
        )}
      >
        Version {version} {isLatest && "— Latest"}
      </div>
      <div className="text-sm font-medium text-slate-500">{date}</div>
    </div>

    <div
      className={cn(
        "glass-card p-8 rounded-[32px] border-white/5 transition-all duration-500",
        isLatest ? "border-brand/30 bg-brand/[0.02]" : "hover:border-white/10",
      )}
    >
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 mb-8 leading-relaxed max-w-2xl">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature: any, i: number) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand/30 transition-colors">
              <feature.icon className="w-4 h-4 text-brand-light" />
            </div>
            <span className="text-sm font-medium text-slate-300">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function Changelog() {
  return (
    <div className="min-h-screen bg-navy-dark text-slate-100 selection:bg-brand/30">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 glow-mesh opacity-30" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-light text-xs font-bold mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3" /> What's New
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 gradient-text leading-tight"
          >
            Changelog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed"
          >
            Follow our journey as we build the ultimate financial control center
            for modern startups.
          </motion.p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="pb-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <ChangelogEntry
            version="1.0"
            date="February 26, 2024"
            title="The Official Launch"
            description="We're officially out of beta! Version 1.0 brings the complete suite of financial tools designed to give founders absolute clarity."
            isLatest
            delay={0}
            features={[
              { label: "Revenue Tracking", icon: DollarSign },
              { label: "Expense Management", icon: Activity },
              { label: "Subscription Module", icon: RefreshCw },
              { label: "Runway Calculation", icon: Zap },
            ]}
          />

          <ChangelogEntry
            version="0.9"
            date="January 15, 2024"
            title="Beta Release"
            description="Our initial beta release focused on the core infrastructure and authentication systems required for a secure financial platform."
            delay={0.1}
            features={[
              { label: "Initial Dashboard UI", icon: Layout },
              { label: "Authentication System", icon: ShieldCheck },
            ]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-16 md:p-32 rounded-[60px] border-brand/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-br from-brand/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 relative z-10 tracking-tighter text-white">
              Build Your Future.
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-lg mx-auto relative z-10">
              Stop guessing and start building with data-driven financial
              clarity.
            </p>

            <div className="relative z-10">
              <Link
                to="/signup"
                className="btn-glow inline-block px-12 py-6 bg-brand hover:bg-brand-dark text-white font-bold rounded-2xl shadow-2xl shadow-brand/40 transition-all text-xl cursor-pointer"
              >
                Start Free Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-navy-dark/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg" />
              <span className="text-xl font-bold tracking-tight text-white">
                Runway
              </span>
            </div>
            <div className="text-slate-600 text-xs font-medium">
              © 2024 Runway Financial Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
