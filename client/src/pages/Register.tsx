import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Sprout, Mail, Lock, User, MapPin, Tractor, ClipboardCheck, Loader2 } from "lucide-react";
import { trpc } from "../lib/trpc";
import { useAuth } from "../contexts/AuthContext";

const MUNICIPALITIES = [
  "Bacolod City", "Bago City", "Cadiz City", "Escalante City", "Himamaylan City",
  "Isabela City", "Kabankalan City", "La Carlota City", "La Castellana", "Manapla",
  "Moises Padilla", "Murcia", "Pontevedra", "Pulupandan", "Sagay City",
  "Salvador Benedicto", "San Carlos City", "San Enrique", "Silay City",
  "Sipalay City", "Talisay City", "Toboso", "Valladolid", "Victorias City",
  "Don Salvador Benedicto", "Enrique B. Magalona", "Ilog"
];

export default function Register() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer" as "farmer" | "extension_officer",
    municipality: "",
    barangay: "",
  });
  const [error, setError] = useState("");

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      setError(err.message || "Registration failed");
    }
  });

  if (user) {
    setLocation("/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.municipality || !formData.barangay) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    registerMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-[#0f4c29] flex items-center justify-center px-4 py-12 relative overflow-hidden font-inter">
      {/* Decorative blurred circles */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-400 opacity-[0.07] blur-3xl rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-earth-500 opacity-[0.06] blur-3xl rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] rounded-3xl shadow-modal w-full max-w-md p-8 relative z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center">
          <Sprout className="w-[40px] h-[40px] text-brand-400" />
          <h1 className="text-2xl font-bold text-white mt-2">MapTanim</h1>
          <p className="text-xs text-brand-300 mt-1">West Negros University</p>
        </div>

        <h2 className="mt-7 text-center text-xl font-semibold text-white">Create your account</h2>
        <p className="text-sm text-brand-200 text-center mt-1">Join MapTanim and start planning your farm</p>

        {error && (
          <div className="mt-6 bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form className="mt-8" onSubmit={handleSubmit}>
          {/* SECTION 1 - Personal Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/75 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-[16px] h-[16px] text-white/45 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                  placeholder="Juan Dela Cruz"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-[16px] h-[16px] text-white/45 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                  placeholder="juan@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-[16px] h-[16px] text-white/45 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="w-[16px] h-[16px] text-white/45 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2 - Role Selection */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-white/75 mb-3">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`rounded-xl p-4 text-center cursor-pointer transition-all ${formData.role === 'farmer' ? 'border-2 border-brand-400 bg-brand-500/25' : 'border border-white/20 bg-white/5 hover:bg-white/10'}`}
                onClick={() => setFormData({ ...formData, role: 'farmer' })}
              >
                <Tractor className="w-[28px] h-[28px] text-white mx-auto" />
                <div className="text-sm font-semibold text-white mt-2">Farmer</div>
                <div className="text-xs text-white/60">Vegetable grower</div>
              </div>
              <div
                className={`rounded-xl p-4 text-center cursor-pointer transition-all ${formData.role === 'extension_officer' ? 'border-2 border-brand-400 bg-brand-500/25' : 'border border-white/20 bg-white/5 hover:bg-white/10'}`}
                onClick={() => setFormData({ ...formData, role: 'extension_officer' })}
              >
                <ClipboardCheck className="w-[28px] h-[28px] text-white mx-auto" />
                <div className="text-sm font-semibold text-white mt-2">Extension Officer</div>
                <div className="text-xs text-white/60">DA agricultural technician</div>
              </div>
            </div>
          </div>

          {/* SECTION 3 - Location */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/75 mb-1.5">Municipality</label>
              <div className="relative">
                <MapPin className="w-[16px] h-[16px] text-white/45 absolute left-4 top-1/2 -translate-y-1/2" />
                <select
                  required
                  value={formData.municipality}
                  onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none appearance-none transition-all"
                >
                  <option value="" disabled className="text-gray-800">Select your municipality</option>
                  {MUNICIPALITIES.map(m => (
                    <option key={m} value={m} className="text-gray-800">{m}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-1.5">Barangay</label>
              <div className="relative">
                <MapPin className="w-[16px] h-[16px] text-white/45 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.barangay}
                  onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your barangay"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full mt-7 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white py-3.5 rounded-xl text-base font-semibold shadow-green transition-all flex justify-center items-center"
          >
            {registerMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-brand-300 font-medium underline hover:text-brand-200 cursor-pointer transition-colors">
              Log in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
