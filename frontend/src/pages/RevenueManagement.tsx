import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  X,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { useDashboard } from "../hooks/useDashboard";
import { useSubscription } from "../hooks/useSubscription";

interface RevenueEntry {
  id: string;
  source: string;
  amount: number;
  date: string;
  category: "Subscription" | "One-time" | "Service" | "Other";
  status: "Completed" | "Pending";
}

export default function RevenueManagement() {
  const { metrics } = useDashboard();
  const { subscription, createSubs, isLoading } = useSubscription();

  // 🔥 Dynamic entries from backend (NO MOCK DATA)
  const entries: RevenueEntry[] =
    subscription?.map((sub) => ({
      id: sub.id,
      source: sub.name,
      amount: Number(sub.price),
      date: sub.createdAt,
      category: "Subscription",
      status: "Completed",
    })) || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterMonth, setFilterMonth] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [newSub, setNewSub] = useState({
    source: "",
    amount: "",
    category: "Subscription" as RevenueEntry["category"],
    date: new Date().toISOString().split("T")[0],
  });

  // 🔍 Filter logic
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch = entry.source
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesMonth =
        filterMonth === "All" || entry.date.startsWith(filterMonth);
      return matchesSearch && matchesMonth;
    });
  }, [entries, searchQuery, filterMonth]);

  // 💰 Selected Total (frontend)
  const selectedTotal = useMemo(() => {
    return filteredEntries.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredEntries]);

  // 🔁 Recurring Revenue (backend)
  const recurringRevenue = metrics?.mrr || 0;

  // 🌐 Active Sources (frontend)
  const activeSources = entries.length;

  const handleAddRevenue = (e: React.FormEvent) => {
    e.preventDefault();

    createSubs({
      name: newSub.source, // ✅ FIX
      price: Number(newSub.amount),
      currency: "USD",
      billingType: "MONTHLY", // ✅ simple fix (ya default)
    });

    setIsModalOpen(false);

    setNewSub({
      source: "",
      amount: "",
      category: "Subscription",
      date: new Date().toISOString().split("T")[0],
    });
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Revenue Management
          </h1>
          <p className="text-slate-400 mt-1">
            Track and manage your startup's incoming capital.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand hover:bg-brand-dark text-white rounded-2xl font-bold shadow-lg shadow-brand/20 transition-all cursor-pointer group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add Revenue
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-[24px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 blur-2xl rounded-full -mr-12 -mt-12" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-brand/10 border border-brand/20">
              <DollarSign className="w-6 h-6 text-brand-light" />
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Selected Total
              </div>
              <div className="text-2xl font-bold text-white">
                ${selectedTotal.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-green-400">
            <ArrowUpRight className="w-4 h-4" />
            +14.2% from last period
          </div>
        </div>

        <div className="glass-card p-6 rounded-[24px] relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Recurring Revenue
              </div>
              <div className="text-2xl font-bold text-white">
                ${recurringRevenue.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            72% of total revenue
          </div>
        </div>

        <div className="glass-card p-6 rounded-[24px] relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Active Sources
              </div>
              <div className="text-2xl font-bold text-white">
                {activeSources.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Stripe, Paddle, App Store...
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-light transition-colors" />
          <input
            type="text"
            placeholder="Search by source..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-10 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Months</option>
              <option value="2024-02">February 2024</option>
              <option value="2024-01">January 2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="glass-card rounded-[32px] overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Source
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Category
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Date
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Amount
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredEntries.map((entry) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand/30 transition-colors">
                          <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-brand-light transition-colors" />
                        </div>
                        <span className="text-sm font-bold text-white">
                          {entry.source}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-400 font-medium">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-white">
                      ${entry.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-5">
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          entry.status === "Completed"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-amber-500/10 text-amber-400",
                        )}
                      >
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            entry.status === "Completed"
                              ? "bg-green-400"
                              : "bg-amber-400",
                          )}
                        />
                        {entry.status}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-slate-500 hover:text-white transition-colors cursor-pointer">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filteredEntries.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-white">No entries found</h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Add Revenue Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-6"
            >
              <div className="glass-card p-8 rounded-[40px] border-white/10 shadow-3xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Add Revenue Entry
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddRevenue} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                      Revenue Source
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Stripe - Monthly Subs"
                      value={newSub.source}
                      onChange={(e) =>
                        setNewSub({ ...newSub, source: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        Amount ($)
                      </label>
                      <input
                        required
                        type="number"
                        placeholder="0.00"
                        value={newSub.amount}
                        onChange={(e) =>
                          setNewSub({ ...newSub, amount: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        Category
                      </label>
                      <select
                        value={newSub.category}
                        onChange={(e) =>
                          setNewSub({
                            ...newSub,
                            category: e.target.value as any,
                          })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="Subscription">Subscription</option>
                        <option value="One-time">One-time</option>
                        <option value="Service">Service</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        required
                        type="date"
                        value={newSub.date}
                        onChange={(e) =>
                          setNewSub({ ...newSub, date: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-2xl shadow-xl shadow-brand/20 transition-all cursor-pointer"
                    >
                      Save Entry
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
