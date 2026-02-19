export default function Team() {
  const team = [
    {
      name: "A. Haque",
      role: "CEO & Founder",
      initials: "AH",
      bio: "Leading Auto MOT Centre with over 30 years of automotive expertise, ensuring every customer receives honest and reliable service.",
      gradient: "from-primary-700 to-primary-900",
      ring: "ring-primary-100",
    },
    {
      name: "J. Ahmed",
      role: "Senior Mechanic",
      initials: "JA",
      bio: "Specialist in MOT testing and vehicle diagnostics, with extensive experience servicing all makes and models to manufacturer specifications.",
      gradient: "from-accent-500 to-red-700",
      ring: "ring-accent-100",
    },
    {
      name: "R. Haque",
      role: "Mechanic",
      initials: "RH",
      bio: "Expert in vehicle servicing and repairs, known for fast turnaround times and a friendly, approachable manner with every customer.",
      gradient: "from-emerald-500 to-emerald-700",
      ring: "ring-emerald-100",
    },
  ];

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="inline-flex items-center justify-center gap-2 text-accent-500 font-semibold text-sm uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-accent-500 inline-block" />
            Our People
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-500 text-lg">
            Experienced professionals who treat your car like their own.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 shadow-sm"
            >
              {/* Avatar with gradient */}
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${member.gradient} ring-4 ${member.ring} rounded-2xl flex items-center justify-center text-white text-3xl font-bold font-heading group-hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  {member.initials}
                </div>
              </div>

              <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <span className="inline-block bg-accent-50 text-accent-600 font-semibold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                {member.role}
              </span>
              <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
