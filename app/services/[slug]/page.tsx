import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { CheckCircle2, Clock, ArrowLeft, CalendarCheck } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/services-data";

// Tell Next.js which slugs to pre-render at build time
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// Generate unique metadata per service
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} in Manor Park, London | Auto MOT Centre`,
    description: `${service.tagline}. ${service.description}. Book online or call 020 8553 9112.`,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  // Build FAQ JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription,
    provider: {
      "@type": "AutoRepair",
      name: "Auto MOT Centre Ltd",
      telephone: "+4402085539112",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4 Rectory Rd",
        addressLocality: "London",
        postalCode: "E12 6JA",
        addressCountry: "UK",
      },
    },
    areaServed: "Manor Park, London",
    offers: {
      "@type": "Offer",
      price: service.price.replace(/[^0-9.]/g, "") || "0",
      priceCurrency: "GBP",
      description: service.price,
    },
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-20">
        <PageHero
          title={service.title}
          subtitle={service.tagline}
          badge={
            <span className="text-white/80 text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" /> {service.duration}
            </span>
          }
        />

        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100 py-3">
          <div className="container-custom flex items-center gap-2 text-sm text-gray-500">
            <Link href="/services" className="hover:text-primary-600 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> All Services
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{service.title}</span>
          </div>
        </div>

        {/* Main Content */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

              {/* Left — Long Description & Features */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                    What&apos;s Included
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {service.longDescription}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                        <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ Section */}
                {service.faqs.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-5">
                      {service.faqs.map((faq, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-6 bg-gray-50">
                          <h3 className="font-bold text-gray-900 mb-2 text-lg">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right — Pricing & Booking Card */}
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl border-2 border-primary-100 shadow-xl p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>

                  <div className="text-4xl font-bold text-primary-600 my-4">
                    {service.price}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>

                  <Link
                    href={`/make-an-appointment?service=${encodeURIComponent(service.title)}`}
                    className="btn-primary w-full text-center flex items-center justify-center gap-2 text-lg py-4 mb-3"
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Book This Service
                  </Link>
                  <Link
                    href="/contact-us"
                    className="block w-full text-center py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 transition-all font-semibold"
                  >
                    Ask a Question
                  </Link>

                  <p className="text-xs text-gray-400 mt-4">
                    No hidden fees. Transparent pricing always.
                  </p>
                </div>

                {/* Trust Signals */}
                <div className="mt-6 bg-gray-50 rounded-xl p-5 space-y-3">
                  {[
                    "AUTODATA compliant servicing",
                    "Quality OEM-grade parts",
                    "12-month / 12,000-mile labour warranty",
                    "Family-owned since 1990",
                  ].map((trust, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {trust}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Other Services CTA */}
        <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-gray-900" />
          <div className="relative container-custom text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Explore All Our Services
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              We offer a full range of automotive care — from routine servicing to complex repairs.
            </p>
            <Link href="/services" className="btn-primary text-lg px-10 py-4 inline-block">
              View All Services
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
