import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  RefreshCw,
  Zap,
  Lightbulb,
  LayoutGrid,
  ArrowRight,
  ChevronRight,
  DollarSign,
  Activity,
  PieChart,
  ShieldCheck,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

// --- Mock Data ---
const revenueHistory = [
  { month: "Sep", value: 32000 },
  { month: "Oct", value: 35000 },
  { month: "Nov", value: 38000 },
  { month: "Dec", value: 42000 },
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 48240 },
];

const burnHistory = [
  { month: "Sep", value: 30000 },
  { month: "Oct", value: 31000 },
  { month: "Nov", value: 31500 },
  { month: "Dec", value: 32000 },
  { month: "Jan", value: 32500 },
  { month: "Feb", value: 32800 },
];

const runwayProjection = [
  { month: "Feb", actual: 14.3, projected: 14.3 },
  { month: "Mar", projected: 14.8 },
  { month: "Apr", projected: 15.4 },
  { month: "May", projected: 16.1 },
  { month: "Jun", projected: 17.0 },
  { month: "Jul", projected: 18.2 },
];

const subGrowth = [
  { month: "Sep", value: 85 },
  { month: "Oct", value: 92 },
  { month: "Nov", value: 104 },
  { month: "Dec", value: 112 },
  { month: "Jan", value: 121 },
  { month: "Feb", value: 128 },
];

const analyticsData = [
  { name: "Jan", revenue: 42000, expenses: 31000, projection: 45000 },
  { name: "Feb", revenue: 45000, expenses: 32000, projection: 48000 },
  { name: "Mar", revenue: 48240, expenses: 32800, projection: 52000 },
  { name: "Apr", revenue: 51000, expenses: 33500, projection: 56000 },
  { name: "May", revenue: 55000, expenses: 34000, projection: 61000 },
  { name: "Jun", revenue: 60000, expenses: 35000, projection: 68000 },
];

// --- Components ---

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-navy-dark/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="w-8 h-8 bg-linear-to-tr from-brand to-blue-500 rounded-lg shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform" />
        <span className="text-xl font-bold tracking-tight">Runway</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <Link
          to="/features"
          className="hover:text-white transition-colors relative group"
        >
          Features
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full" />
        </Link>
        <Link
          to="/pricing"
          className="hover:text-white transition-colors relative group"
        >
          Pricing
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full" />
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

const MetricCard = ({
  title,
  value,
  icon: Icon,
  data,
  trend,
  trendValue,
  color,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-6 rounded-[24px] group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-brand/10 transition-colors" />

    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand/30 transition-colors">
        <Icon className="w-5 h-5 text-brand-light" />
      </div>
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
          trend === "up"
            ? "bg-green-500/10 text-green-400"
            : "bg-red-500/10 text-red-400",
        )}
      >
        {trend === "up" ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {trendValue}
      </div>
    </div>

    <div className="relative z-10">
      <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">
        {title}
      </span>
      <div className="text-3xl font-bold mt-1 tracking-tight">{value}</div>
    </div>

    <div className="h-16 w-full mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#color-${title})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

const FeatureItem = ({ icon: Icon, title, benefit }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-8 rounded-[32px] group hover:translate-y-[-8px] transition-all duration-500"
  >
    <div className="w-14 h-14 bg-linear-to-br from-brand/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:border-brand/50 transition-colors">
      <Icon className="w-7 h-7 text-brand-light group-hover:scale-110 transition-transform" />
    </div>
    <h4 className="text-xl font-bold mb-3 group-hover:text-brand-light transition-colors">
      {title}
    </h4>
    <p className="text-slate-400 leading-relaxed text-sm">{benefit}</p>
    <div className="mt-6 flex items-center gap-2 text-brand-light text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
      Learn more <ArrowRight className="w-3 h-3" />
    </div>
  </motion.div>
);

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen selection:bg-brand/30 selection:text-white">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 glow-mesh opacity-40 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 blur-[120px] rounded-full animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-float"
          style={{ animationDelay: "-5s" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-light text-xs font-bold mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 bg-brand rounded-full animate-ping" />
            Trusted by 2,500+ high-growth startups
          </motion.div>

          <motion.h1
            style={{ opacity, scale }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 gradient-text leading-[1.05]"
          >
            Know Your Runway <br className="hidden md:block" /> Before You
            Crash.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed"
          >
            Real-time revenue, burn rate, and runway insights for modern
            startups. Get the clarity you need to scale with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/signup"
              className="btn-glow w-full sm:w-auto px-10 py-5 bg-brand hover:bg-brand-dark text-white font-bold rounded-2xl shadow-2xl shadow-brand/40 transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2">
                Start Free{" "}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all cursor-pointer backdrop-blur-md">
              View Live Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Live Metrics Preview */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Monthly Revenue"
              value="$48,240"
              icon={DollarSign}
              data={revenueHistory}
              trend="up"
              trendValue="+12.4%"
              color="#a78bfa"
            />
            <MetricCard
              title="Monthly Burn"
              value="$32,800"
              icon={Activity}
              data={burnHistory}
              trend="down"
              trendValue="-2.1%"
              color="#ef4444"
            />
            <MetricCard
              title="Runway Left"
              value="14.3 months"
              icon={Clock}
              data={runwayProjection.map((p) => ({ value: p.projected }))}
              trend="up"
              trendValue="+0.5mo"
              color="#3b82f6"
            />
            <MetricCard
              title="Active Subscriptions"
              value="128"
              icon={Users}
              data={subGrowth}
              trend="up"
              trendValue="+8.2%"
              color="#10b981"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Precision Financial Control
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Everything you need to manage your startup's capital without
              opening a spreadsheet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureItem
              icon={RefreshCw}
              title="Automated Revenue Tracking"
              benefit="Direct integration with Stripe, Paddle, and App Store to pull every cent in real-time."
            />
            <FeatureItem
              icon={Zap}
              title="Real-Time Burn Monitoring"
              benefit="Sync with your bank accounts and credit cards to see exactly where your cash is flowing."
            />
            <FeatureItem
              icon={PieChart}
              title="Subscription Analytics"
              benefit="Identify duplicate SaaS tools and ghost subscriptions that are draining your capital."
            />
            <FeatureItem
              icon={LayoutGrid}
              title="Smart Expense Categorization"
              benefit="AI-powered tagging of expenses to departments, projects, or cost centers automatically."
            />
          </div>
        </div>
      </section>

      {/* Analytics Showcase */}
      <section className="py-32 bg-linear-to-b from-transparent to-brand/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-light text-sm font-bold uppercase tracking-widest mb-4 block">
              The Platform
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Clarity at Every Stage
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-2 rounded-[40px] border-white/5 ring-1 ring-white/10 shadow-3xl"
          >
            <div className="bg-navy-dark rounded-[38px] p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                  <div className="h-[400px] w-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">
                        Revenue Growth vs Expenses
                      </h3>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-brand" />
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                            Revenue
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                            Expenses
                          </span>
                        </div>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient
                            id="colorRev"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#7c3aed"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#7c3aed"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorExp"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3b82f6"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3b82f6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.05)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0a0f1e",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "16px",
                            padding: "12px",
                          }}
                          itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#7c3aed"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorRev)"
                        />
                        <Area
                          type="monotone"
                          dataKey="expenses"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorExp)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-brand/30 transition-colors">
                    <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">
                      Runway Projection
                    </h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={runwayProjection}>
                          <Bar dataKey="projected" radius={[4, 4, 0, 0]}>
                            {runwayProjection.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  index === 0
                                    ? "#7c3aed"
                                    : "rgba(124, 58, 237, 0.3)"
                                }
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-between items-end">
                      <div>
                        <div className="text-2xl font-bold">18.2 mo</div>
                        <div className="text-[10px] text-green-400 font-bold">
                          +3.9 months projected
                        </div>
                      </div>
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-brand/10 border border-brand/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-brand/20 rounded-xl">
                        <Lightbulb className="w-5 h-5 text-brand-light" />
                      </div>
                      <h4 className="text-sm font-bold">AI Insight</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Reducing SaaS spend by 12% would extend your runway by an
                      additional 1.4 months without affecting growth."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Runway Dashboard */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                Built for Founders <br /> Who Move Fast.
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "No Spreadsheets",
                    desc: "Stop wasting hours manually updating rows and columns. Everything is automated.",
                    icon: LayoutGrid,
                  },
                  {
                    title: "Instant Clarity",
                    desc: "Get a real-time view of your cash position the moment you log in.",
                    icon: Zap,
                  },
                  {
                    title: "Investor-Ready Reports",
                    desc: "Export beautiful, professional PDF reports for your board with a single click.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Simple Financial Forecasting",
                    desc: 'Run "what-if" scenarios for hiring, pivot strategies, or pricing changes.',
                    icon: Activity,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="w-12 h-12 shrink-0 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                      <item.icon className="w-6 h-6 text-brand-light" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative glass-card p-8 rounded-[40px] border-white/10"
              >
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-bold">Scenario Planner</h4>
                  <div className="px-3 py-1 rounded-full bg-brand/20 text-brand-light text-[10px] font-bold uppercase tracking-widest">
                    Active
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>New Hires</span>
                      <span>+3 Engineering</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-brand" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>Ad Spend</span>
                      <span>+$5k / mo</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold">
                        Impact on Runway
                      </span>
                      <span className="text-red-400 font-bold">
                        -2.4 months
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-brand/20 blur-[120px] rounded-full" />

            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 relative z-10 tracking-tighter">
              Stop Guessing. <br /> Start Knowing.
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-lg mx-auto relative z-10">
              Join the next generation of founders who build with data, not
              intuition.
            </p>

            <div className="relative z-10">
              <Link
                to="/signup"
                className="btn-glow inline-block px-12 py-6 bg-brand hover:bg-brand-dark text-white font-bold rounded-2xl shadow-2xl shadow-brand/40 transition-all text-xl cursor-pointer"
              >
                Create Your Free Account
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand rounded-lg" />
                <span className="text-xl font-bold tracking-tight">Runway</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                The financial intelligence platform for modern startups. Built
                by founders, for founders.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-6">Product</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-6">Company</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
            <div className="text-slate-600 text-xs font-medium">
              © 2024 Runway Financial Inc. All rights reserved.
            </div>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-600 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
