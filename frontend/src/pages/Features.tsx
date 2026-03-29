import React from "react";
import { motion } from "motion/react";
import {
  RefreshCw,
  Zap,
  PieChart,
  LayoutGrid,
  TrendingUp,
  ShieldCheck,
  Activity,
  ChevronRight,
  ArrowRight,
  BarChart3,
  LineChart,
  FileText,
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
        <Link
          to="/features"
          className="text-white transition-colors relative group"
        >
          Features
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand" />
        </Link>

        <Link
          to="/docs"
          className="hover:text-white transition-colors relative group"
        >
          Docs
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full" />
        </Link>
        <Link
          to="/changelog"
          className="hover:text-white transition-colors relative group"
        >
          Changelog
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-slate-400 hover:text-white text-sm font-medium transition-colors cursor-pointer"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="bg-white text-navy-dark px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-all cursor-pointer shadow-lg shadow-white/10"
        >
          Start Free
        </Link>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass-card p-8 rounded-[32px] group hover:translate-y-[-8px] transition-all duration-500 border-white/5 hover:border-brand/30"
  >
    <div className="w-14 h-14 bg-linear-to-br from-brand/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:border-brand/50 transition-colors">
      <Icon className="w-7 h-7 text-brand-light group-hover:scale-110 transition-transform" />
    </div>
    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-light transition-colors">
      {title}
    </h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const InsightItem = ({ icon: Icon, title, description }: any) => (
  <div className="flex gap-6">
    <div className="w-12 h-12 shrink-0 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
      <Icon className="w-6 h-6 text-brand-light" />
    </div>
    <div>
      <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function Features() {
  return (
    <div className="min-h-screen bg-navy-dark text-slate-100 selection:bg-brand/30 selection:text-white">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 glow-mesh opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 blur-[120px] rounded-full animate-float" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-light text-xs font-bold mb-8 backdrop-blur-md"
          >
            Powerful Features
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 gradient-text leading-tight"
          >
            Everything You Need to <br /> Control Your Runway
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed"
          >
            Stop guessing and start growing. Runway Dashboard provides the
            financial clarity modern startups need to scale without the fear of
            running out of cash.
          </motion.p>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={RefreshCw}
              title="Automated Revenue Tracking"
              description="Direct integration with all major payment providers to pull every cent in real-time."
              delay={0}
            />
            <FeatureCard
              icon={Zap}
              title="Real-Time Burn Monitoring"
              description="Sync with your bank accounts to see exactly where your cash is flowing every second."
              delay={0.1}
            />
            <FeatureCard
              icon={PieChart}
              title="Subscription Analytics"
              description="Identify duplicate tools and ghost subscriptions that are draining your capital."
              delay={0.2}
            />
            <FeatureCard
              icon={LayoutGrid}
              title="Smart Expense Categorization"
              description="AI-powered tagging of expenses to departments and projects automatically."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Advanced Insights Section */}
      <section className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-white">
                Advanced Financial <br /> Intelligence
              </h2>
              <div className="space-y-10">
                <InsightItem
                  icon={TrendingUp}
                  title="Runway Projection"
                  description="Dynamic forecasting that adjusts based on your real-time burn and revenue trends."
                />
                <InsightItem
                  icon={LineChart}
                  title="Financial Forecasting"
                  description="Run 'what-if' scenarios for hiring, marketing spend, or pricing changes."
                />
                <InsightItem
                  icon={FileText}
                  title="Investor-Ready Summaries"
                  description="Generate professional board reports and financial summaries in one click."
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full" />
              <div className="relative glass-card p-8 rounded-[40px] border-white/10 overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand" />
                    <span className="text-sm font-bold text-white">
                      Projection Engine
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                    v2.4 Active
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-40 w-full bg-white/5 rounded-2xl flex items-end justify-between p-4 gap-2">
                    {[40, 60, 45, 70, 85, 65, 90].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1 }}
                        className="w-full bg-brand/40 rounded-t-lg"
                      />
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl bg-brand/10 border border-brand/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">
                        Confidence Score
                      </span>
                      <span className="text-brand-light font-bold">98.4%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-brand" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-16 md:p-32 rounded-[60px] border-brand/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-br from-brand/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-brand/20 blur-[120px] rounded-full" />

            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 relative z-10 tracking-tighter text-white">
              Take Control of Your <br /> Startup Finances
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-lg mx-auto relative z-10">
              Join the founders who build with data, not intuition. Start your
              journey today.
            </p>

            <div className="relative z-10">
              <Link
                to="/signup"
                className="btn-glow inline-block px-12 py-6 bg-brand hover:bg-brand-dark text-white font-bold rounded-2xl shadow-2xl shadow-brand/40 transition-all text-xl cursor-pointer"
              >
                Start Free
              </Link>
              <p className="mt-8 text-sm text-slate-500 font-medium">
                No credit card required. 14-day full access trial.
              </p>
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
