import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Zap,
  Calendar,
  X,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Clock,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { useSubscription } from "../hooks/useSubscription";
import { useDashboard } from "../hooks/useDashboard";

interface SubscriptionUI {
  id: string;
  name: string;
  amount: number;
  billingCycle: "Monthly" | "Yearly";
  nextBilling: string;
  status: "Active" | "Paused" | "Cancelled";
  category: string;
}

export default function SubscriptionManagement() {
  const { subscription, createSubs, isLoading } = useSubscription();
  const { metrics } = useDashboard();
  console.log("metrics:", metrics);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newSub, setNewSub] = useState({
    name: "",
    amount: "",
    billingCycle: "Monthly" as SubscriptionUI["billingCycle"],
    category: "SaaS",
    nextBilling: new Date().toISOString().split("T")[0],
  });

  // 🔥 Backend → UI mapping
  const subscriptions: SubscriptionUI[] = useMemo(() => {
    if (!subscription) return [];

    return subscription.map((sub) => ({
      id: sub.id,
      name: sub.name,
      amount: sub.price,
      billingCycle: sub.billingType === "MONTHLY" ? "Monthly" : "Yearly",
      nextBilling: sub.createdAt,
      status:
        sub.status === "ACTIVE"
          ? "Active"
          : sub.status === "CANCELLED"
            ? "Cancelled"
            : "Paused",
      category: "SaaS",
    }));
  }, [subscription]);

  const filteredSubs = useMemo(() => {
    return subscriptions.filter((sub) =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [subscriptions, searchQuery]);

  const activeCount = useMemo(() => {
    return subscriptions.filter((s) => s.status === "Active").length;
  }, [subscriptions]);

  const mrr = Number(metrics?.mrr) || 0;
  console.log("merr:", mrr);

  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();

    createSubs({
      name: newSub.name,
      price: Number(newSub.amount),
      currency: "USD",
      billingType: newSub.billingCycle === "Monthly" ? "MONTHLY" : "YEARLY",
    });

    setIsModalOpen(false);

    setNewSub({
      name: "",
      amount: "",
      billingCycle: "Monthly",
      category: "SaaS",
      nextBilling: new Date().toISOString().split("T")[0],
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
            Subscription Management
          </h1>
          <p className="text-slate-400 mt-1">
            Audit and optimize your recurring SaaS spend.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand hover:bg-brand-dark text-white rounded-2xl font-bold shadow-lg shadow-brand/20 transition-all cursor-pointer group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add Subscription
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-[24px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 blur-2xl rounded-full -mr-12 -mt-12" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-brand/10 border border-brand/20">
              <Zap className="w-6 h-6 text-brand-light" />
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Monthly Recurring
              </div>
              <div className="text-2xl font-bold text-white">
                ${mrr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-green-400">
            <ArrowUpRight className="w-4 h-4" />
            +4.2% from last month
          </div>
        </div>

        <div className="glass-card p-6 rounded-[24px] relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Active Subs
              </div>
              <div className="text-2xl font-bold text-white">
                {activeCount} Tools
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Across 5 departments
          </div>
        </div>

        <div className="glass-card p-6 rounded-[24px] relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <RefreshCw className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Annual Spend
              </div>
              <div className="text-2xl font-bold text-white">
                $
                {(mrr * 12).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Projected for 2024
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-light transition-colors" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium hover:bg-white/10 transition-all cursor-pointer">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Subscriptions Table */}
      <div className="glass-card rounded-[32px] overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Service
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Billing
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Next Billing
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
                {filteredSubs.map((sub) => (
                  <motion.tr
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand/30 transition-colors">
                          <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-brand-light transition-colors" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">
                            {sub.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            {sub.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-300">
                          {sub.billingCycle}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-400">
                          {new Date(sub.nextBilling).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" },
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-white">
                      ${sub.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-5">
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          sub.status === "Active"
                            ? "bg-green-500/10 text-green-400"
                            : sub.status === "Paused"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-red-500/10 text-red-400",
                        )}
                      >
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            sub.status === "Active"
                              ? "bg-green-400"
                              : sub.status === "Paused"
                                ? "bg-amber-400"
                                : "bg-red-400",
                          )}
                        />
                        {sub.status}
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
      </div>

      {/* Add Subscription Modal */}
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
                    Add Subscription
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddSubscription} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                      Service Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Slack, AWS, GitHub"
                      value={newSub.name}
                      onChange={(e) =>
                        setNewSub({ ...newSub, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        Price ($)
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
                        Billing Cycle
                      </label>
                      <select
                        value={newSub.billingCycle}
                        onChange={(e) =>
                          setNewSub({
                            ...newSub,
                            billingCycle: e.target.value as any,
                          })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SaaS"
                        value={newSub.category}
                        onChange={(e) =>
                          setNewSub({ ...newSub, category: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        Next Billing
                      </label>
                      <input
                        required
                        type="date"
                        value={newSub.nextBilling}
                        onChange={(e) =>
                          setNewSub({ ...newSub, nextBilling: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all"
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
                      Save Subscription
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
