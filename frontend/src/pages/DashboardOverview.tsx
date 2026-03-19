import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const data = [
  { name: "Jan", revenue: 4000, burn: 2400 },
  { name: "Feb", revenue: 3000, burn: 1398 },
  { name: "Mar", revenue: 2000, burn: 9800 },
  { name: "Apr", revenue: 2780, burn: 3908 },
  { name: "May", revenue: 1890, burn: 4800 },
  { name: "Jun", revenue: 2390, burn: 3800 },
  { name: "Jul", revenue: 3490, burn: 4300 },
];

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 rounded-[24px] relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand/30 transition-colors">
        <Icon className="w-5 h-5 text-brand-light" />
      </div>
      <div
        className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          trend === "up"
            ? "bg-green-500/10 text-green-400"
            : "bg-red-500/10 text-red-400",
        )}
      >
        {trend === "up" ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        {change}
      </div>
    </div>
    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
      {title}
    </div>
    <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
  </motion.div>
);

export default function DashboardOverview() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Financial Overview
          </h1>
          <p className="text-slate-400 mt-1">
            Welcome back, Alex. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all cursor-pointer">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button className="px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-brand/20 transition-all cursor-pointer">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$128,430"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Monthly Burn"
          value="$32,800"
          change="-2.4%"
          trend="down"
          icon={Activity}
        />
        <StatCard
          title="Runway Left"
          value="14.3 mo"
          change="+0.5mo"
          trend="up"
          icon={Clock}
        />
        <StatCard
          title="Active Subs"
          value="1,240"
          change="+8.2%"
          trend="up"
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-[32px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Revenue vs Burn</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Revenue
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Burn
                </span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
                  }}
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
                  dataKey="burn"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBurn)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[32px] flex flex-col">
          <h3 className="text-lg font-bold mb-8">Expense Breakdown</h3>
          <div className="flex-1 space-y-6">
            {[
              {
                label: "Cloud Infrastructure",
                value: "$12,400",
                progress: 75,
                color: "bg-brand",
              },
              {
                label: "SaaS Subscriptions",
                value: "$8,200",
                progress: 50,
                color: "bg-blue-500",
              },
              {
                label: "Marketing & Ads",
                value: "$5,400",
                progress: 35,
                color: "bg-emerald-500",
              },
              {
                label: "Payroll & Benefits",
                value: "$45,000",
                progress: 90,
                color: "bg-amber-500",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">
                    {item.label}
                  </span>
                  <span className="text-white font-bold">{item.value}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            View All Expenses
          </button>
        </div>
      </div>
    </div>
  );
}
