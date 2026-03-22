import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  // ✅ FIXED
  const { login, isLoading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      login({ email, password }); // 🔥 API call
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="w-10 h-10 bg-linear-to-tr from-brand to-blue-500 rounded-xl shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold tracking-tight text-white">
              Runway
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-400 mt-2">
            Enter your credentials to access your dashboard
          </p>
        </div>

        <div className="glass-card p-8 rounded-[32px] border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all",
                    errors.email && "border-red-500/50 focus:ring-red-500/50",
                  )}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-2 ml-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all",
                    errors.password &&
                      "border-red-500/50 focus:ring-red-500/50",
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-2 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-400 text-sm text-center">
                Login failed. Try again.
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-glow w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-brand/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* SOCIAL */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-navy-dark px-4 text-slate-500 font-bold tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-2xl transition-all cursor-pointer">
              <Chrome className="w-5 h-5" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-2xl transition-all cursor-pointer">
              <Github className="w-5 h-5" /> GitHub
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-brand-light font-bold hover:text-white transition-colors"
          >
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
