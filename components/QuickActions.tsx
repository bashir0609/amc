import Link from "next/link";
import { Calendar, Camera, MapPin, ArrowRight } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      icon: Calendar,
      eyebrow: "Online Booking",
      title: "Appointment Booking",
      description: "Schedule your MOT or service in minutes. Choose a date and time that suits you.",
      link: "/make-an-appointment",
      linkText: "Make an appointment",
      gradient: "from-accent-600 to-red-500",
      glowColor: "rgba(227,30,36,0.4)",
      badge: "Most Popular",
    },
    {
      icon: Camera,
      eyebrow: "Free Estimate",
      title: "Get a Free Repair Quote",
      description: "Send us a photo of the problem and we'll give you an honest, no-obligation estimate.",
      link: "/contact-us",
      linkText: "Send a photo",
      gradient: "from-primary-800 to-primary-600",
      glowColor: "rgba(21,101,192,0.4)",
      badge: null,
    },
    {
      icon: MapPin,
      eyebrow: "Find Us",
      title: "4 Rectory Rd, London, E12 6JA",
      description: "Drop in or give us a call — we're open Mon–Sat 9–6 and Sunday 10–4.",
      link: "tel:+442085539112",
      linkText: "Call Now",
      gradient: "from-primary-900 to-primary-700",
      glowColor: "rgba(13,71,161,0.4)",
      badge: null,
    },
  ];

  return (
    <section className="relative -mt-1 z-10">
      {/* Rounded top edge */}
      <div className="bg-white h-8 rounded-t-[2.5rem] -mb-1 hidden md:block" />

      <div className="bg-white pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 container-custom px-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.link}
                className={`group relative overflow-hidden bg-gradient-to-br ${action.gradient} p-9 flex flex-col items-center text-center gap-5 rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl`}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${action.glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Subtle grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-2xl"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Decorative orbs */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-700" />

                {/* Badge */}
                {action.badge && (
                  <div className="relative z-10 -mb-2">
                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {action.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="relative z-10 w-20 h-20 bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                  <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                </div>

                {/* Eyebrow */}
                <p className="relative z-10 text-white/60 text-xs font-semibold uppercase tracking-widest -mb-3">
                  {action.eyebrow}
                </p>

                {/* Title */}
                <h3 className="relative z-10 text-white font-bold text-xl font-heading leading-snug">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-white/75 text-sm leading-relaxed max-w-xs">
                  {action.description}
                </p>

                {/* CTA button */}
                <div className="relative z-10 mt-1 inline-flex items-center gap-2 bg-white/15 hover:bg-white/30 border border-white/30 hover:border-white/60 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 backdrop-blur-sm">
                  {action.linkText}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
