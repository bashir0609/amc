import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { HelpCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Auto MOT Centre | Manor Park",
  description: "Find answers to our most frequently asked questions regarding MOT tests, vehicle servicing, repairs, and bookings at Auto MOT Centre.",
};

const faqs = [
  {
    question: "What does a Class 4 MOT include?",
    answer: "A Class 4 MOT includes a comprehensive series of safety checks on your vehicle, including lights, steering, suspension, brakes, tires, seatbelts, and emissions. It ensures your car meets the minimum legal safety and environmental standards to be driven on UK roads."
  },
  {
    question: "How long does an MOT test take?",
    answer: "A standard MOT test takes approximately 45 minutes to 1 hour. You are welcome to wait in our reception area or leave the vehicle with us and pick it up later."
  },
  {
    question: "What is the difference between an Interim and Full Service?",
    answer: "An Interim Service is typically recommended every 6 months or 6,000 miles and includes an oil change, filter replacement, and basic safety checks. A Full Service is recommended annually or every 12,000 miles and includes a much more comprehensive check of the vehicle's components, fluid top-ups, and filter replacements."
  },
  {
    question: "Do you use manufacturer-approved parts?",
    answer: "Yes, we use high-quality parts that meet or exceed Original Equipment (OE) standards. We also service vehicles according to strict AUTODATA specifications to ensure your vehicle is maintained optimally."
  },
  {
    question: "What happens if my car fails its MOT?",
    answer: "If your car fails its MOT, we will provide a valid VT30 Refusal Certificate detailing the failure items. We will offer a transparent, no-obligation quote for the required repairs. If you choose to have the repairs performed by us, we offer a free partial retest within 10 working days."
  },
  {
    question: "Do I need to book in advance?",
    answer: "While we do accept walk-ins, we highly recommend booking in advance to guarantee a slot and minimize your waiting time. You can easily book online through our website or call us directly."
  }
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <Header />
      <main className="pt-20">
        <PageHero
          title="Frequently Asked Questions"
          subtitle="We've compiled a list of our most common questions to help give you the information you need, fast."
        />

        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <HelpCircle className="w-8 h-8 text-primary-600" />
                <h2 className="text-3xl font-heading font-bold text-gray-900">
                  General Enquiries
                </h2>
              </div>

              <div className="space-y-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="group">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0 group-hover:text-primary-600 transition-colors" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed pl-7">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-600 mb-4">
                  Still have questions? We&apos;re more than happy to help.
                </p>
                <a href="/contact-us" className="btn-primary inline-flex items-center gap-2">
                  Contact Our Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
