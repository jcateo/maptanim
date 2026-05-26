import React from "react";
import { Link } from "wouter";
import { Sprout, MapPin, FlaskConical, CalendarDays, BarChart3, ClipboardCheck, ArrowRight, ChevronDown } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter overflow-x-hidden">
      {/* HEADER - Glassmorphism */}
      <header className="fixed top-0 inset-x-0 z-50 h-20 bg-white/70 backdrop-blur-xl border-b border-white/20 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-brand-500 p-2 rounded-xl shadow-md shadow-brand-500/20">
              <Sprout className="w-[24px] h-[24px] text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">MapTanim</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-semibold text-sm px-2 transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/register" className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-gray-900/20 transition-all hover:-translate-y-0.5">
              Start Planning
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Background Gradients & Blurs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-200/50 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/40 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />
        
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{ 
            backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px' 
          }} 
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-xs font-bold text-brand-700 uppercase tracking-widest">DA-PRDP Standardized</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
                Smart mapping for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">modern farmers.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform your farm with precision mapping, agroecological intercropping analysis, and extension officer verification—all from your browser.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/register" className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-brand-600/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                  Draw Your Farm
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/login" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-4 rounded-full text-base font-bold shadow-sm transition-all flex items-center justify-center">
                  View Demo
                </Link>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="flex-1 w-full max-w-2xl lg:max-w-none relative perspective-1000">
              <div className="relative rounded-2xl overflow-hidden border border-white/40 shadow-2xl shadow-gray-900/10 transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 bg-white p-2">
                <img 
                  src="/hero_mockup.png" 
                  alt="MapTanim Dashboard" 
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-inner"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -left-8 top-12 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 animate-float-slow hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <FlaskConical className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Soil Condition</p>
                    <p className="text-sm font-bold text-gray-900">Optimal (pH 6.5)</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 bottom-20 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 animate-float-delayed hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Simulated LER</p>
                    <p className="text-sm font-bold text-gray-900">+1.34 Efficiency</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Everything a Farmer Needs</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Integrated tools that turn your field knowledge into a verified scientific farming plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative flex flex-col">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-50 rounded-full transition-transform duration-500 group-hover:scale-150" />
              <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mb-6 relative z-10 shadow-sm border border-brand-200/50 group-hover:-translate-y-1 transition-transform">
                <MapPin className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">Farm Polygon Mapping</h3>
              <p className="text-gray-500 leading-relaxed relative z-10 max-w-md">Draw your exact farm boundary on a satellite map. Hectarage is calculated automatically using geodesic math.</p>
            </div>

            {/* Feature 2 - Small */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center mb-6 shadow-sm border border-sky-200/50 group-hover:-translate-y-1 transition-transform">
                <FlaskConical className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zone Profiling</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Automatic classification of biophysical profiles using real soil and weather APIs.</p>
            </div>

            {/* Feature 3 - Small */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 shadow-sm border border-amber-200/50 group-hover:-translate-y-1 transition-transform">
                <CalendarDays className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Planting Calendar</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Auto-generated sow, transplant, and harvest schedules based on published crop data.</p>
            </div>

            {/* Feature 4 - Large */}
            <div className="md:col-span-2 bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative flex flex-col">
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
              <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mb-6 relative z-10 shadow-inner border border-gray-700 group-hover:-translate-y-1 transition-transform">
                <Sprout className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Agroecological Rule Engine</h3>
              <p className="text-gray-400 leading-relaxed relative z-10 max-w-lg">Our core engine scores 60+ scientifically validated crop pairs from 0 to 100 based on your zone's exact pH, temperature, water, and sunlight conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (Modern Timeline) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">How MapTanim Works</h2>
            <p className="text-lg text-gray-500">Four steps from an empty field to a verified scientific plan.</p>
          </div>

          <div className="space-y-12 relative">
            {/* Connecting line */}
            <div className="absolute left-[28px] top-4 bottom-4 w-0.5 bg-gray-100 hidden sm:block" />

            {[
              { num: '1', title: 'Set Up Your Location', desc: 'Use GPS to detect your location automatically, search by municipality, or load an existing layout.' },
              { num: '2', title: 'Draw Your Boundary', desc: 'Tap points on the satellite map to draw your polygon. The hectarage calculates instantly.' },
              { num: '3', title: 'Profile Your Zone', desc: 'Label zones as Monocrop, Intercrop, or Rotation. We retrieve soil & weather data automatically.' },
              { num: '4', title: 'Get Verified', desc: 'The rule engine ranks compatible crop pairs. Submit for Extension Officer review to get an official advisory.' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-8 items-start relative group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center text-xl font-extrabold text-gray-400 relative z-10 group-hover:border-brand-500 group-hover:text-brand-600 transition-colors">
                  {step.num}
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex-1 shadow-sm group-hover:shadow-md transition-shadow group-hover:bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6">Ready to digitize your farm?</h2>
          <p className="text-brand-200 text-lg mb-10 max-w-xl mx-auto">Join farmers across Negros Occidental using MapTanim to maximize their land equivalent ratio.</p>
          <Link href="/register" className="inline-block bg-white text-brand-900 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 p-2 rounded-lg">
              <Sprout className="w-5 h-5 text-brand-400" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">MapTanim</span>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            &copy; 2026 Nexoria. Designed for Negros Occidental.
          </p>
        </div>
      </footer>
    </div>
  );
}
