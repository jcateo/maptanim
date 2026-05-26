import React from "react";
import { Link } from "wouter";
import { Sprout, MapPin, FlaskConical, CalendarDays, BarChart3, ClipboardCheck, ChevronDown } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      {/* HEADER */}
      <header className="sticky top-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="w-[26px] h-[26px] text-brand-500" />
            <span className="text-lg font-bold text-gray-800">MapTanim</span>
          </div>
          <Link href="/login">
            <a className="border border-brand-500 text-brand-700 hover:bg-brand-50 px-5 py-2 rounded-lg text-sm font-medium transition-colors">
              Log In
            </a>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen" style={{ background: 'linear-gradient(160deg, #14532d 0%, #166534 55%, #15803d 100%)' }}>
        {/* Dot grid overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{ 
            backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px'
          }}
        />

        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400 opacity-[0.07] blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-earth-500 opacity-[0.05] blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center pt-36 pb-24 relative z-10">
          <div className="bg-white/10 border border-white/20 text-xs text-brand-200 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Aligned with DA-PRDP Commodity Mapping Standard
          </div>
          
          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-white leading-tight">
            Smart Farm Mapping<br/>
            for Negros Occidental Farmers
          </h1>
          
          <p className="mt-5 max-w-2xl text-lg text-brand-200 leading-relaxed">
            Draw your farm boundaries, classify your crops using PRDP standards, and get verified by DA Extension Officers — all in your browser, no GIS training required.
          </p>
          
          <div className="mt-9 flex gap-4 flex-wrap justify-center">
            <Link href="/register">
              <a className="bg-brand-500 hover:bg-brand-400 text-white px-9 py-4 rounded-xl text-base font-semibold shadow-green hover:shadow-xl transition-all">
                Get Started
              </a>
            </Link>
            <Link href="/login">
              <a className="bg-white/10 hover:bg-white/15 text-white border border-white/25 px-9 py-4 rounded-xl text-base font-medium transition-all">
                Log In
              </a>
            </Link>
          </div>

          <div className="mt-20 flex justify-center">
            <ChevronDown className="w-[28px] h-[28px] text-white/35 bounce-down" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Everything a Farmer Needs</h2>
          <p className="text-base text-gray-500 text-center mt-3 max-w-xl mx-auto">
            Integrated tools that turn your field knowledge into a verified scientific farming plan
          </p>
          
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <div className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-6 cursor-default transition-all duration-200 hover:shadow-card-md group">
              <div className="w-[48px] h-[48px] rounded-xl bg-brand-50 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-100">
                <MapPin className="w-[24px] h-[24px] text-brand-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Farm Polygon Mapping</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Draw your exact farm boundary on a real satellite map. Hectarage is calculated automatically from your polygon using geodesic math.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-6 cursor-default transition-all duration-200 hover:shadow-card-md group">
              <div className="w-[48px] h-[48px] rounded-xl bg-brand-50 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-100">
                <FlaskConical className="w-[24px] h-[24px] text-brand-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Zone Condition Profiling</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Each zone you draw is automatically classified into one of nine biophysical profiles using real data from SoilGrids, OpenWeatherMap, and NASA POWER.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-6 cursor-default transition-all duration-200 hover:shadow-card-md group">
              <div className="w-[48px] h-[48px] rounded-xl bg-brand-50 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-100">
                <Sprout className="w-[24px] h-[24px] text-brand-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Agroecological Rule Engine</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                The rule engine scores 60+ scientifically validated crop pairs from 0 to 100 based on your zone's actual soil pH, temperature, water, and sunlight conditions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-6 cursor-default transition-all duration-200 hover:shadow-card-md group">
              <div className="w-[48px] h-[48px] rounded-xl bg-brand-50 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-100">
                <CalendarDays className="w-[24px] h-[24px] text-brand-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Auto-Generated Planting Calendar</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Get a sow, transplant, fertilize, and harvest schedule automatically generated from your selected crop pairs and published growth data.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-6 cursor-default transition-all duration-200 hover:shadow-card-md group">
              <div className="w-[48px] h-[48px] rounded-xl bg-brand-50 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-100">
                <BarChart3 className="w-[24px] h-[24px] text-brand-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-800">LER Simulation</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                View your simulated Land Equivalent Ratio to understand how much more efficient your intercropping plan is compared to monoculture.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-6 cursor-default transition-all duration-200 hover:shadow-card-md group">
              <div className="w-[48px] h-[48px] rounded-xl bg-brand-50 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-100">
                <ClipboardCheck className="w-[24px] h-[24px] text-brand-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Officer Verification</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Submit your farm zones for review by a DA Extension Officer who monitors your intercropping plan and can add advisory notes directly in the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-brand-50">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">How MapTanim Works</h2>
          <p className="text-base text-gray-500 text-center mt-3">
            Four steps from an empty field to a verified scientific intercropping plan
          </p>

          <div className="mt-14 relative">
            {/* Vertical Line */}
            <div className="absolute left-[20px] top-5 bottom-5 w-0.5 bg-brand-200 hidden sm:block"></div>

            {/* Step 1 */}
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-10 relative">
              <div className="w-[40px] h-[40px] shrink-0 rounded-full bg-brand-500 text-white font-bold text-base flex items-center justify-center shadow-md relative z-10">
                1
              </div>
              <div className="pt-2 sm:pt-1">
                <h3 className="text-base font-semibold text-gray-800">Set Up Your Location</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Use GPS to detect your exact location automatically, search by municipality name, or load an existing farm layout to edit.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-10 relative">
              <div className="w-[40px] h-[40px] shrink-0 rounded-full bg-brand-500 text-white font-bold text-base flex items-center justify-center shadow-md relative z-10">
                2
              </div>
              <div className="pt-2 sm:pt-1">
                <h3 className="text-base font-semibold text-gray-800">Draw Your Field Boundary</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Tap points on the satellite map to draw your field polygon. The area in hectares calculates automatically as you draw.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-10 relative">
              <div className="w-[40px] h-[40px] shrink-0 rounded-full bg-brand-500 text-white font-bold text-base flex items-center justify-center shadow-md relative z-10">
                3
              </div>
              <div className="pt-2 sm:pt-1">
                <h3 className="text-base font-semibold text-gray-800">Classify and Profile Your Zone</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Label each zone as Monocrop, Intercrop, or Rotation Crop. The system retrieves real soil and weather data and assigns a biophysical condition profile.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col sm:flex-row items-start gap-5 relative">
              <div className="w-[40px] h-[40px] shrink-0 rounded-full bg-brand-500 text-white font-bold text-base flex items-center justify-center shadow-md relative z-10">
                4
              </div>
              <div className="pt-2 sm:pt-1">
                <h3 className="text-base font-semibold text-gray-800">Get Recommendations and Verification</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  The rule engine ranks compatible crop pairs with a 0–100 score. Submit for Extension Officer review to receive an official advisory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-900 py-14">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <Sprout className="w-[22px] h-[22px] text-brand-400" />
              <span className="text-white font-bold text-lg">MapTanim</span>
            </div>
            <p className="text-brand-300 text-sm mt-1">
              Smart farm planning for Filipino farmers
            </p>
          </div>
          <div className="text-brand-400 text-sm">
            &copy; 2026 Nexoria. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
