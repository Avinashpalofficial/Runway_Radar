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
  Wallet,
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
import { useDashboard } from "../hooks/useDashboard";
import { useSubscription } from "../hooks/useSubscription";
import { useExpense } from "../hooks/useExpense";
import { useFinanceProfile } from "../hooks/useFinanceProfile";

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
  const { metrics } = useDashboard();
  const { subscription } = useSubscription();
  const { data: expense } = useExpense();
  const { profile } = useFinanceProfile();
  const mrr = Number(metrics?.mrr || 0);
  const burn = Number(metrics?.burn || 0);
  const runway = Number(metrics?.runway || 0);
  const cashAvailable = Number(profile?.cashAvailable || 0);

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
          value={`$${Number(metrics?.mrr || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Monthly Burn"
          value={`$${burn.toLocaleString()}`}
          change="-2.4%"
          trend="down"
          icon={Activity}
        />
        <StatCard
          title="Runway Left"
          value={`${Number(metrics?.runway || 0).toFixed(1)} mo`}
          change="+0.5mo"
          trend="up"
          icon={Clock}
        />
        <StatCard
          title="Total Cash"
          value={`$${Number(profile?.cashAvailable || 0).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          )}`}
          change="+0%"
          trend="up"
          icon={Wallet}
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

// import React from "react";
// import {
//   TrendingUp,
//   Clock,
//   DollarSign,
//   Activity,
//   ArrowUpRight,
//   ArrowDownRight,
//   Calendar,
//   Wallet,
//   PieChart,
//   ArrowRight,
//   ChevronRight,
// } from "lucide-react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { motion } from "framer-motion";
// import { cn } from "../lib/utils";

// const chartData = [
//   { name: "Jan", revenue: 4500, burn: 2100 },
//   { name: "Feb", revenue: 5200, burn: 2300 },
//   { name: "Mar", revenue: 4800, burn: 4100 },
//   { name: "Apr", revenue: 6100, burn: 3200 },
//   { name: "May", revenue: 5900, burn: 3500 },
//   { name: "Jun", revenue: 7200, burn: 3100 },
// ];

// const StatCard = ({ title, value, change, trend, icon: Icon }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="glass-card p-6 rounded-[24px] relative overflow-hidden group border border-white/5 bg-white/[0.02]"
//   >
//     <div className="flex justify-between items-start mb-4">
//       <div className="p-3 rounded-xl bg-brand/10 border border-brand/20">
//         <Icon className="w-5 h-5 text-brand-light" />
//       </div>
//       <div
//         className={cn(
//           "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
//           trend === "up"
//             ? "bg-emerald-500/10 text-emerald-400"
//             : "bg-red-500/10 text-red-400",
//         )}
//       >
//         {trend === "up" ? (
//           <ArrowUpRight className="w-3 h-3" />
//         ) : (
//           <ArrowDownRight className="w-3 h-3" />
//         )}
//         {change}
//       </div>
//     </div>
//     <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
//       {title}
//     </div>
//     <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
//   </motion.div>
// );

// export default function DashboardUI() {
//   return (
//     <div className="p-8 space-y-10 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//         <div>
//           <h1 className="text-4xl font-black text-white tracking-tight">
//             Dashboard
//           </h1>
//           <p className="text-slate-400 mt-1 font-medium">
//             Real-time financial performance and asset allocation.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-slate-300 hover:bg-white/10 transition-all cursor-pointer">
//             <Calendar className="w-4 h-4" /> 2024 Overview
//           </button>
//           <button className="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-2xl text-sm font-bold shadow-xl shadow-brand/20 transition-all cursor-pointer">
//             Export PDF
//           </button>
//         </div>
//       </div>

//       {/* Primary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Revenue"
//           value="$128,430"
//           change="+14.2%"
//           trend="up"
//           icon={DollarSign}
//         />
//         <StatCard
//           title="Monthly Burn"
//           value="$12,200"
//           change="-2.1%"
//           trend="down"
//           icon={Activity}
//         />
//         <StatCard
//           title="Runway"
//           value="18.4 Mo"
//           change="+1.2"
//           trend="up"
//           icon={Clock}
//         />
//         <StatCard
//           title="Net Worth"
//           value="$450,000"
//           change="+5.4%"
//           trend="up"
//           icon={Wallet}
//         />
//       </div>

//       {/* Financial Profile Asset Allocation Row */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="glass-card p-8 rounded-[32px] border border-white/10 bg-gradient-to-r from-brand/5 to-transparent"
//       >
//         <div className="flex flex-col lg:flex-row items-center gap-10">
//           <div className="flex items-center gap-5 shrink-0">
//             <div className="w-16 h-16 rounded-3xl bg-brand/20 border border-brand/30 flex items-center justify-center">
//               <PieChart className="w-8 h-8 text-brand-light" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-white">Asset Allocation</h3>
//               <p className="text-slate-500 text-sm font-medium">
//                 Cash vs. Investments
//               </p>
//             </div>
//           </div>

//           <div className="flex-1 w-full space-y-3">
//             <div className="flex justify-between items-end mb-1">
//               <div className="flex flex-col">
//                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
//                   Liquid Cash
//                 </span>
//                 <span className="text-lg font-bold text-white">$150,000</span>
//               </div>
//               <div className="flex flex-col items-end">
//                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
//                   Portfolio Value
//                 </span>
//                 <span className="text-lg font-bold text-white">$300,000</span>
//               </div>
//             </div>
//             <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex p-1">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: "33%" }}
//                 className="h-full bg-brand rounded-full shadow-[0_0_15px_rgba(124,58,237,0.4)]"
//               />
//               <div className="w-1" />
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: "67%" }}
//                 className="h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)]"
//               />
//             </div>
//           </div>

//           <button className="group flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold text-white transition-all whitespace-nowrap">
//             Financial Profile{" "}
//             <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </motion.div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Revenue Chart */}
//         <div className="lg:col-span-2 glass-card p-8 rounded-[32px] border border-white/5">
//           <div className="flex items-center justify-between mb-10">
//             <div>
//               <h3 className="text-xl font-bold text-white">Revenue vs Burn</h3>
//               <p className="text-slate-500 text-xs font-medium mt-1">
//                 Cashflow trajectory for the current year.
//               </p>
//             </div>
//             <div className="flex gap-6">
//               <div className="flex items-center gap-2">
//                 <div className="w-2.5 h-2.5 rounded-full bg-brand" />
//                 <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
//                   Revenue
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
//                 <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
//                   Burn
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={chartData}>
//                 <defs>
//                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
//                   </linearGradient>
//                   <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="rgba(255,255,255,0.03)"
//                   vertical={false}
//                 />
//                 <XAxis
//                   dataKey="name"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#475569", fontSize: 12, fontWeight: 600 }}
//                   dy={10}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#475569", fontSize: 12, fontWeight: 600 }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#0f172a",
//                     border: "1px solid rgba(255,255,255,0.1)",
//                     borderRadius: "20px",
//                     padding: "12px",
//                   }}
//                   itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke="#7c3aed"
//                   strokeWidth={4}
//                   fillOpacity={1}
//                   fill="url(#colorRev)"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="burn"
//                   stroke="#3b82f6"
//                   strokeWidth={4}
//                   fillOpacity={1}
//                   fill="url(#colorBurn)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Categories / Expenses Breakdown */}
//         <div className="glass-card p-8 rounded-[32px] border border-white/5 flex flex-col">
//           <h3 className="text-xl font-bold text-white mb-2">Spending</h3>
//           <p className="text-slate-500 text-xs font-medium mb-8">
//             Top expense categories this month.
//           </p>

//           <div className="flex-1 space-y-7">
//             {[
//               {
//                 label: "Infrastructure",
//                 value: "$12,400",
//                 progress: 75,
//                 color: "bg-brand",
//               },
//               {
//                 label: "Marketing",
//                 value: "$8,200",
//                 progress: 45,
//                 color: "bg-blue-500",
//               },
//               {
//                 label: "Team Payroll",
//                 value: "$45,000",
//                 progress: 90,
//                 color: "bg-emerald-500",
//               },
//               {
//                 label: "SaaS Tools",
//                 value: "$2,100",
//                 progress: 25,
//                 color: "bg-amber-500",
//               },
//             ].map((item, i) => (
//               <div key={i} className="space-y-3">
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-slate-300 font-bold">{item.label}</span>
//                   <span className="text-white font-black">{item.value}</span>
//                 </div>
//                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${item.progress}%` }}
//                     transition={{ duration: 1.5, ease: "easeOut" }}
//                     className={cn("h-full rounded-full", item.color)}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button className="mt-10 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest">
//             View Reports
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
