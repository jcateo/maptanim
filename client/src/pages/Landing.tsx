import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { 
  Sprout, 
  MapPin, 
  FlaskConical, 
  CalendarDays, 
  BarChart3, 
  ClipboardCheck, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter overflow-x-hidden">
      
      {/* ══ HEADER ══ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 h-20 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-sm">
              <img src="/maptanim_logo.svg" alt="MapTanim Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-brand-900' : 'text-white drop-shadow-md'}`}>MapTanim</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className={`hidden sm:block text-sm font-semibold transition-colors px-4 py-2 ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white drop-shadow-sm'}`}>
              Log in
            </Link>
            <Link href="/register" className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-brand-900/20 transition-all hover:-translate-y-0.5 border border-brand-500/50">
              Start Planning
            </Link>
          </div>
        </div>
      </header>

      {/* ══ HERO SECTION ══ */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2070&auto=format&fit=crop" 
            alt="Farmers in a field at sunrise" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-900/80 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Designed for Negros Occidental</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
              Smart mapping for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-emerald-200">modern farmers.</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
              Transform your farm with precision mapping, agroecological intercropping analysis, and extension officer verification—all from your browser.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/register" className="w-full sm:w-auto bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-brand-900/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 border border-brand-400/50">
                Draw Your Farm
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-base font-bold shadow-sm transition-all flex items-center justify-center">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES BENTO GRID ══ */}
      <section className="py-24 bg-gray-50 relative -mt-10 rounded-t-[3rem] z-20 border-t border-gray-200 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Everything a Farmer Needs</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Integrated tools that turn your field knowledge into a verified scientific farming plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            
            {/* Feature 1 - Geomapping (Wide) */}
            <div className="md:col-span-2 rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative flex flex-col justify-end min-h-[300px]">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Tablet map in a field" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Farm Polygon Mapping</h3>
                <p className="text-white/80 font-medium leading-relaxed max-w-md">Draw your exact farm boundary on a satellite map. Hectarage is calculated automatically using geodesic math.</p>
              </div>
            </div>

            {/* Feature 2 - Soil Profiling (Square) */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center mb-6 border border-sky-200">
                <FlaskConical className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zone Profiling</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Automatic classification of biophysical profiles using real soil and weather APIs.</p>
            </div>

            {/* Feature 3 - Calendar (Square) */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 border border-amber-200">
                <CalendarDays className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Planting Calendar</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Auto-generated sow, transplant, and harvest schedules based on published crop data.</p>
            </div>

            {/* Feature 4 - Vegetables / Rule Engine (Wide) */}
            <div className="md:col-span-2 rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=2042&auto=format&fit=crop" alt="Fresh harvest vegetables" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-900/70 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/40 backdrop-blur-md flex items-center justify-center mb-4 border border-brand-400/50">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Agroecological Rule Engine</h3>
                <p className="text-white/80 leading-relaxed max-w-lg">Our core engine scores 60+ scientifically validated crop pairs from 0 to 100 based on your zone's exact pH, temperature, water, and sunlight conditions.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">How MapTanim Works</h2>
            <p className="text-lg text-gray-500">Four steps from an empty field to a verified scientific plan.</p>
          </div>

          <div className="space-y-12 relative">
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

      {/* ══ CTA ══ */}
      <section className="py-24 bg-brand-900 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1595856728345-42217f2a1b15?q=80&w=2070&auto=format&fit=crop" alt="Farm field" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-brand-900/80 mix-blend-multiply" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ShieldCheck className="w-16 h-16 text-brand-300 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">Ready to digitize your farm?</h2>
          <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto">Join farmers across Negros Occidental using MapTanim to maximize their land equivalent ratio with scientifically verified planning.</p>
          <Link href="/register" className="inline-block bg-white text-brand-900 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform border border-white/80">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-gray-950 py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-90">
            <div className="bg-white/10 p-1.5 rounded-lg">
              <img src="/maptanim_logo.svg" alt="MapTanim Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">MapTanim</span>
          </div>
          <div className="text-gray-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} MapTanim. Designed for Negros Occidental.
          </div>
        </div>
      </footer>
    </div>
  );
}
