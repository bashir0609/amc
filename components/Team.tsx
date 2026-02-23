export default function Team() {
  const team = [
    {
      name: "A. Haque",
      role: "CEO & Founder",
      initials: "AH",
      experience: "30+ years",
      specialisms: ["Business Operations", "Customer Relations", "Quality Assurance"],
      bio: "Leading Auto MOT Centre since 1990, A. Haque has built a family garage trusted by over 5,000 local customers across Manor Park and East London.",
      gradient: "from-primary-700 to-primary-900",
      ring: "ring-primary-100",
    },
    {
      name: "J. Ahmed",
      role: "Senior MOT Tester & Mechanic",
      initials: "JA",
      experience: "15+ years",
      specialisms: ["DVSA MOT Testing", "Vehicle Diagnostics", "Engine Repairs"],
      bio: "A DVSA-certified MOT tester, J. Ahmed specialises in vehicle diagnostics and ensures every car leaves the workshop safe and roadworthy.",
      gradient: "from-accent-500 to-red-700",
      ring: "ring-accent-100",
    },
    {
      name: "R. Haque",
      role: "Mechanic & Service Technician",
      initials: "RH",
      experience: "10+ years",
      specialisms: ["Vehicle Servicing", "Brake & Suspension", "Exhaust Systems"],
      bio: "Skilled in servicing all makes and models to AUTODATA manufacturer specifications, R. Haque is known for fast, reliable, and friendly service.",
      gradient: "from-emerald-500 to-emerald-700",
      ring: "ring-emerald-100",
    },
  ];

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden" aria-label="Our team of expert mechanics">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="inline-flex items-center justify-center gap-2 text-accent-500 font-semibold text-sm uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-accent-500 inline-block" />
            Our People
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-500 text-lg">
            DVSA-certified mechanics with combined decades of hands-on expertise — treating every car like their own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 shadow-sm"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div className={`w-24 h-24 bg-gradient-to-br ${member.gradient} ring-4 ${member.ring} rounded-2xl flex items-center justify-center text-white text-3xl font-bold font-heading group-hover:scale-105 transition-all duration-300 shadow-lg`}>
                  {member.initials}
                </div>
              </div>

              <h3 className="text-xl font-heading font-bold text-gray-900 mb-1" itemProp="name">
                {member.name}
              </h3>
              <span className="inline-block bg-accent-50 text-accent-600 font-semibold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-1" itemProp="jobTitle">
                {member.role}
              </span>
              <p className="text-xs text-gray-400 mb-4 font-medium">{member.experience} experience</p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                {member.specialisms.map((s, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-gray-500 text-sm leading-relaxed" itemProp="description">{member.bio}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          All our technicians are trained to <strong className="text-gray-600">DVSA standards</strong> and service vehicles using <strong className="text-gray-600">AUTODATA manufacturer specifications</strong>.
        </p>
      </div>
    </section>
  );
}
