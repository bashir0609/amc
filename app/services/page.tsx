import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Car Services & Repairs | Auto MOT Centre | Manor Park",
  description: "Comprehensive car servicing, MOT testing, diagnostics, and repairs in Manor Park, London. Quality service using AUTODATA specifications at competitive prices.",
};

export default function ServicesPage() {

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does an MOT cost at Auto MOT Centre?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our MOT testing starts from £40 for vehicles up to class 4. We also offer a free retest within 10 working days if your vehicle fails."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in a Full Service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Full Service starts from £120 and includes an oil and filter change, brake inspection and adjustment, fluid level checks and top-ups, and a multi-point safety inspection."
        }
      },
      {
        "@type": "Question",
        "name": "Do you use manufacturer-approved parts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our services are carried out using AUTODATA specifications. We use quality parts and premium oils to ensure your vehicle is maintained according to manufacturer standards."
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={faqSchema} />
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
                    className="card group hover:-translate-y-2 flex flex-col"
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {service.features.slice(0, 4).map((feature, i) => (
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
                      <div className="flex gap-2">
                        <Link
                          href={`/make-an-appointment?service=${encodeURIComponent(service.title)}`}
                          className="btn-primary flex-1 text-center block"
                        >
                          Book Now
                        </Link>
                        <Link
                          href={`/services/${service.slug}`}
                          className="flex items-center gap-1 px-4 py-2 rounded-xl border-2 border-primary-200 text-primary-700 hover:bg-primary-50 font-semibold transition-all text-sm whitespace-nowrap"
                        >
                          Learn More <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
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
