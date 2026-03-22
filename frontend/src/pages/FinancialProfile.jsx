import React, { useState, useMemo, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  X,
  ArrowUpRight,
  Banknote,
  Edit3,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { useFinanceProfile } from "../hooks/useFinanceProfile";
import { useDashboard } from "../hooks/useDashboard";

export default function FinancialProfile() {
  const { profile, updateProfile, createProfile, isLoading } =
    useFinanceProfile();
  const { metrics } = useDashboard();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ FIXED: correct field names
  const [formData, setFormData] = useState({
    cashAvailable: 0,
    totalInvestments: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
  });

  // ✅ FIXED: sync with backend fields
  useEffect(() => {
    if (profile) {
      setFormData({
        cashAvailable: Number(profile.cashAvailable || 0),
        totalInvestments: Number(profile.totalInvestments || 0),
        monthlyIncome: Number(profile.monthlyIncome || 0),
        monthlyExpenses: Number(profile.monthlyExpenses || 0),
      });
    }
  }, [profile, isModalOpen]);

  // ✅ FIXED: use correct fields
  const financialRows = useMemo(() => {
    if (!profile) return [];
    return [
      {
        id: "1",
        name: "Liquid Cash",
        value: profile.cashAvailable || 0,
        type: "Asset",
        icon: Wallet,
        color: "text-emerald-400",
      },
      {
        id: "2",
        name: "Investments",
        value: profile.totalInvestments || 0,
        type: "Asset",
        icon: TrendingUp,
        color: "text-blue-400",
      },
      {
        id: "3",
        name: "Monthly Income",
        value: profile.monthlyIncome || 0,
        type: "Cashflow",
        icon: Banknote,
        color: "text-brand-light",
      },
    ];
  }, [profile]);

  // ✅ FIXED: payload correct
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const payload = {
      cashAvailable: Number(formData.cashAvailable),
    };

    if (profile) {
      updateProfile(payload);
    } else {
      createProfile(payload);
    }

    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Financial Profile
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your net worth and liquid cash positions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-2xl font-bold"
        >
          <Edit3 className="w-5 h-5" />
          Update Finances
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cash */}
        <div className="glass-card p-6 rounded-[24px]">
          <div className="flex items-center gap-4 mb-4">
            <Wallet className="w-6 h-6 text-brand-light" />
            <div>
              <div className="text-xs text-slate-500">Total Cash</div>
              <div className="text-2xl text-white font-bold">
                ${(profile?.cashAvailable || 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Investments */}
        <div className="glass-card p-6 rounded-[24px]">
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <div>
              <div className="text-xs text-slate-500">Investments</div>
              <div className="text-2xl text-white font-bold">
                ${(profile?.totalInvestments || 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Net Worth */}
        <div className="glass-card p-6 rounded-[24px]">
          <div className="flex items-center gap-4 mb-4">
            <Banknote className="w-6 h-6 text-emerald-400" />
            <div>
              <div className="text-xs text-slate-500">Net Worth</div>
              <div className="text-2xl text-white font-bold">
                $
                {(
                  (profile?.cashAvailable || 0) +
                  (profile?.totalInvestments || 0)
                ).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <div
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 w-full max-w-lg">
              <div className="glass-card p-8 rounded-[40px]">
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl text-white">Update Profile</h2>
                  <X onClick={() => setIsModalOpen(false)} />
                </div>

                <form onSubmit={handleUpdateProfile}>
                  <input
                    type="number"
                    value={formData.cashAvailable}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cashAvailable: Number(e.target.value),
                      })
                    }
                    className="w-full mb-4 p-3 rounded-xl bg-white/5 text-white"
                  />

                  <button className="w-full bg-brand py-3 rounded-xl text-white">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
