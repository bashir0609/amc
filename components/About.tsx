import Link from "next/link";
import { Clock, CheckCircle, ArrowRight } from "lucide-react";

export default function About() {
  const highlights = [
    "MOT testing for all vehicles up to Class 4",
    "Servicing to AUTODATA manufacturer specifications",
    "Competitive prices without compromising quality",
    "Parts & oil sourced from trusted suppliers",
  ];

  const stats = [
    { value: "30+", label: "Years in Business", gradient: "from-primary-700 to-primary-600", text: "text-white" },
    { value: "5K+", label: "Happy Customers", gradient: "from-accent-500 to-red-400", text: "text-white" },
    { value: "★ 4.9", label: "Google Rating", gradient: "from-amber-500 to-yellow-400", text: "text-white" },
    { value: "45m", label: "Avg MOT Time", gradient: "from-emerald-600 to-emerald-400", text: "text-white" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Stats bento grid + Opening Hours */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-8 flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`text-4xl md:text-5xl font-bold font-heading ${stat.text} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-accent-400" />
                </div>
                <span className="font-semibold text-white">Opening Hours</span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <span className="font-medium text-blue-200">Mon – Sat</span>
                <span className="text-white font-semibold">9:00 AM – 6:00 PM</span>
                <span className="font-medium text-blue-200">Sunday</span>
                <span className="text-white font-semibold">10:00 AM – 4:00 PM</span>
              </div>
              <div className="mt-4 pt-4 border-t border-primary-700 flex items-center gap-2 text-blue-300 text-xs">
                <Clock className="w-3 h-3" />
                <span>Lunch break: 12:15 – 12:40 PM</span>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="order-1 lg:order-2">
            <p className="inline-flex items-center gap-2 text-accent-500 font-semibold text-sm uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-accent-500 inline-block" />
              Committed!
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 leading-tight mb-5">
              Auto MOT Centre
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Auto MOT Centre Ltd is a <strong className="text-gray-900">family owned</strong> well-established
              independent garage in Manor Park, London — growing day by day on the strength of our reputation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-7">
              We handle all types of <strong className="text-gray-900">MOT for vehicles up to Class 4</strong>,
              plus full servicing using <strong className="text-gray-900">AUTODATA specifications</strong> — so
              your vehicle is always maintained to manufacturer standards, at a price that&apos;s fair.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-accent-500" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary-700/25 hover:shadow-primary-700/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
