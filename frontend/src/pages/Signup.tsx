import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAuth } from "../hooks/useAuth";
import { SignupData } from "../types/auth.types";

export default function Signup() {
  const { signup, isLoading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phoneNumber?: string;
      password?: string;
    } = {};

    if (!formData.name) newErrors.name = "Full name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter valid 10-digit number";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      signup(formData); // 🔥 API call
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-navy-dark">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 blur-[120px] rounded-full animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-float"
        style={{ animationDelay: "-5s" }}
      />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <Link to="/" className="inline-flex items-center gap-2 group mb-12">
            <div className="w-12 h-12 bg-linear-to-tr from-brand to-blue-500 rounded-xl shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform" />
            <span className="text-3xl font-bold tracking-tight text-white">
              Runway
            </span>
          </Link>

          <h1 className="text-5xl font-extrabold text-white tracking-tighter leading-tight mb-8">
            Start building your <br /> financial future today.
          </h1>

          <div className="space-y-6">
            {[
              "Real-time burn rate monitoring",
              "Automated revenue tracking",
              "Investor-ready financial reports",
              "AI-powered runway forecasting",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="w-6 h-6 text-brand-light" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="glass-card p-8 rounded-[32px] border-white/10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Create an account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={cn(
                  "w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white",
                  errors.name && "border-red-500",
                )}
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-red-400 text-xs">{errors.name}</p>
              )}

              {/* EMAIL */}
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={cn(
                  "w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white",
                  errors.email && "border-red-500",
                )}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email}</p>
              )}

              {/* PHONE */}
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: e.target.value,
                  })
                }
                className={cn(
                  "w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white",
                  errors.phoneNumber && "border-red-500",
                )}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs">{errors.phoneNumber}</p>
              )}

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white",
                    errors.password && "border-red-500",
                  )}
                  placeholder="Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-slate-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password}</p>
              )}

              {/* ERROR */}
              {error && (
                <p className="text-red-400 text-sm text-center">
                  Signup failed. Try again.
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-glow w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-brand/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isLoading ? "Creating..." : "Create Account"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-center mt-8 text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand-light font-bold hover:text-white"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
