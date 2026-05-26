import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Sprout, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { trpc } from "../lib/trpc";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      // Small delay then reload to let AuthContext pick up session
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      setError(err.message || "Invalid credentials");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  // Redirect if already logged in
  if (user) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-[#0f4c29] flex items-center justify-center px-4 py-12 relative overflow-hidden font-inter">
      {/* Decorative blurred circles */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-400 opacity-[0.07] blur-3xl rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-earth-500 opacity-[0.06] blur-3xl rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] rounded-3xl shadow-modal w-full max-w-md p-8 relative z-10">
        <div className="flex flex-col items-center">
          <Sprout className="w-[40px] h-[40px] text-brand-400" />
          <h1 className="text-2xl font-bold text-white mt-2">MapTanim</h1>
          <p className="text-xs text-brand-300 mt-1">West Negros University</p>
        </div>

        <h2 className="mt-7 text-center text-xl font-semibold text-white">Log in to your account</h2>
        <p className="text-sm text-brand-200 text-center mt-1">Enter your credentials to continue</p>

        {error && (
          <div className="mt-6 bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white/75 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-[16px] h-[16px] text-white/45 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                placeholder="magsasaka@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/75 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-[16px] h-[16px] text-white/45 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl pl-10 pr-10 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white/80 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full mt-7 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white py-3.5 rounded-xl text-base font-semibold shadow-green transition-all flex justify-center items-center"
          >
            {loginMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-white/50">
          Don't have an account?{" "}
          <Link href="/register">
            <span className="text-brand-300 font-medium underline hover:text-brand-200 cursor-pointer transition-colors">
              Register here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
