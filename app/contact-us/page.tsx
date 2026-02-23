import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Auto MOT Centre | Manor Park",
  description: "Get in touch with Auto MOT Centre in Manor Park. Call us at 020 8553 9112, email, or visit our garage at 4 Rectory Rd for MOTs, servicing, and quotes.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <PageHero
          title="Contact Us"
          subtitle="Get in touch with our friendly team. Whether you need to book a service, ask a question, or get a quote, we're here to help."
          badge={
            <>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">We&apos;re Open Today · 8:30 AM - 6:00 PM</span>
            </>
          }
        />

        {/* Contact Info & Form */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left — Contact Info */}
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Have a question or need to book a service? We&apos;re here to help.
                  You can also <strong className="text-gray-900">attach photos</strong> of your vehicle issue
                  and we&apos;ll give you a free, no-obligation quote.
                </p>

                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                      <a href="tel:+442085539112" className="text-primary-700 hover:text-accent-500 font-semibold transition-colors block">
                        +44 020 8553 9112
                      </a>
                      <a href="tel:+447949102483" className="text-primary-700 hover:text-accent-500 font-semibold transition-colors block">
                        +44 07949 102483
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:info@automotcentre.com" className="text-primary-700 hover:text-accent-500 font-semibold transition-colors">
                        info@automotcentre.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">4 Rectory Rd, London, E12 6JA</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Opening Hours</h3>
                      <div className="text-gray-600 space-y-0.5 text-sm">
                        <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
                        <p>Sunday: 10:00 AM – 4:00 PM</p>
                        <p className="text-gray-400 mt-1">Lunch: 12:15 – 12:40 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2387.498427815047!2d0.055298276320609185!3d51.54642890785191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a64fe2e50fe9%3A0x14671874c9ec4f86!2s4%20Rectory%20Rd%2C%20London%20E12%206JA%2C%20UK!5e1!3m2!1sen!2sus!4v1771662630462!5m2!1sen!2sus"
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Right — Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
