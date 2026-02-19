import { Wrench, BadgePoundSterling, Users, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Wrench,
      number: "01",
      title: "Expert Mechanics",
      description:
        "Our certified technicians have decades of combined experience, ensuring your car is always in the best hands.",
      iconGradient: "from-accent-500 to-red-400",
      numberColor: "text-accent-500/15",
      border: "hover:border-accent-500/30",
    },
    {
      icon: BadgePoundSterling,
      number: "02",
      title: "Honest Pricing",
      description:
        "Competitive, transparent pricing — no hidden fees. Manufacturer-spec service without the main dealer price tag.",
      iconGradient: "from-emerald-500 to-emerald-400",
      numberColor: "text-emerald-400/15",
      border: "hover:border-emerald-400/30",
    },
    {
      icon: Users,
      number: "03",
      title: "5,000+ Clients Trust Us",
      description:
        "Thousands of satisfied customers return year after year. Our reputation is built on honesty and reliability.",
      iconGradient: "from-primary-500 to-blue-400",
      numberColor: "text-blue-400/15",
      border: "hover:border-blue-400/30",
    },
    {
      icon: Zap,
      number: "04",
      title: "Fast Turnaround",
      description:
        "We respect your time. Most MOTs are completed in ~45 minutes, and many services are done same-day.",
      iconGradient: "from-amber-500 to-yellow-400",
      numberColor: "text-amber-400/15",
      border: "hover:border-amber-400/30",
    },
  ];

  return (
    <section className="section-padding bg-primary-950 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-accent-600/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-primary-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="inline-flex items-center gap-2 text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-accent-400 inline-block" />
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            The AMC Difference
          </h2>
          <p className="text-blue-300 text-lg leading-relaxed">
            We&apos;re not just another garage. We&apos;re your neighbours — a family
            business that treats every car like our own.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/5 hover:bg-white/8 border border-white/8 ${feature.border} rounded-2xl p-8 flex gap-6 transition-all duration-300 backdrop-blur-sm`}
              >
                {/* Number watermark */}
                <span className={`absolute top-5 right-6 text-[80px] font-bold font-heading ${feature.numberColor} leading-none select-none transition-all duration-300 group-hover:opacity-80`}>
                  {feature.number}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.iconGradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-blue-300 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
