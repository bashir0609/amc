import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Wrench, Gauge, Battery, CheckCircle2, Car, Droplet } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function ServicesPage() {
  const services = [
    {
      icon: Gauge,
      title: "MOT Testing",
      description: "Comprehensive MOT testing for vehicles up to class 4",
      features: [
        "Quick turnaround (typically 45 minutes)",
        "Competitive pricing",
        "Free retest within 10 working days",
        "Detailed report provided",
      ],
      price: "From £35",
    },
    {
      icon: Wrench,
      title: "Full Service",
      description: "Complete vehicle servicing based on manufacturer specifications",
      features: [
        "Oil and filter change",
        "Brake inspection and adjustment",
        "Fluid level checks and top-ups",
        "Multi-point safety inspection",
      ],
      price: "From £120",
    },
    {
      icon: Car,
      title: "Interim Service",
      description: "Essential maintenance to keep your vehicle running smoothly",
      features: [
        "Oil and filter change",
        "Visual brake check",
        "Tire pressure check",
        "Lights and signals check",
      ],
      price: "From £80",
    },
    {
      icon: Droplet,
      title: "Oil Change",
      description: "Quality oil change using AUTODATA specifications",
      features: [
        "Premium quality oil",
        "New oil filter",
        "Manufacturer specification compliance",
        "Quick service",
      ],
      price: "From £45",
    },
    {
      icon: Battery,
      title: "Diagnostics",
      description: "Advanced vehicle diagnostics and fault finding",
      features: [
        "Electronic fault code reading",
        "System diagnostics",
        "Problem identification",
        "Repair recommendations",
      ],
      price: "From £30",
    },
    {
      icon: Wrench,
      title: "Repairs",
      description: "General vehicle repairs and maintenance",
      features: [
        "Brake repairs and replacement",
        "Suspension work",
        "Exhaust repairs",
        "General mechanical repairs",
      ],
      price: "Quote on request",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <PageHero
          title="Our Services"
          subtitle="Comprehensive automotive care for all makes and models. From routine maintenance to complex repairs, our expert team has you covered."
        />

        {/* Services Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="card group hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-2xl font-bold text-primary-700 mb-4">
                        {service.price}
                      </div>
                      <Link
                        href={`/make-an-appointment?service=${encodeURIComponent(service.title)}`}
                        className="btn-primary w-full text-center block"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us for Services */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">
                Why Choose Our Services?
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  All our services are carried out using{" "}
                  <strong>AUTODATA specifications</strong>, ensuring your vehicle
                  is maintained according to manufacturer standards.
                </p>
                <p>
                  We use <strong>quality parts and premium oils</strong> to
                  guarantee the best performance and longevity for your vehicle.
                </p>
                <p>
                  Our experienced mechanics provide{" "}
                  <strong>honest, transparent service</strong> at competitive
                  prices without compromising on quality.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
