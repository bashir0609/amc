import Link from "next/link";
import { Calendar, Phone, ArrowRight, Shield, Clock, Star, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(227,30,36,0.6) 100%)" }} />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent-600/10 rounded-full blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-primary-500/10 rounded-full blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 container-custom py-20 md:py-22">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Open Now · Manor Park, London</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.05] mb-6">
            High quality{" "}
            <span className="relative inline-block">
              <span className="text-gradient">repair</span>
            </span>
            {" "}&amp;{" "}
            maintenance
          </h1>

          <p className="text-lg text-blue-200 mb-10 max-w-xl leading-relaxed">
            Family-owned independent garage in Manor Park, London. Expert MOT
            testing, servicing &amp; repairs at honest prices — since 1990.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/make-an-appointment"
              className="inline-flex items-center justify-center gap-2.5 bg-accent-500 hover:bg-accent-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-accent-500/30 hover:shadow-accent-500/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
            <Link
              href="tel:+442085539112"
              className="inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 hover:border-white/60 text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              020 8553 9112
            </Link>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Shield, value: "5,000+", label: "Happy Customers", iconColor: "text-accent-400", iconBg: "bg-accent-500/15 border-accent-500/25" },
              { icon: Star, value: "★ 4.9", label: "Google Rating", iconColor: "text-yellow-400 fill-yellow-400", iconBg: "bg-yellow-500/15 border-yellow-500/25" },
              { icon: Clock, value: "~45 min", label: "Average MOT Time", iconColor: "text-emerald-400", iconBg: "bg-emerald-500/15 border-emerald-500/25" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center gap-4 bg-white/8 hover:bg-white/12 backdrop-blur-sm border border-white/12 rounded-2xl px-5 py-4 transition-all duration-300">
                  <div className={`w-11 h-11 ${stat.iconBg} border rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold font-heading text-white">{stat.value}</div>
                    <div className="text-blue-200/70 text-xs">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
