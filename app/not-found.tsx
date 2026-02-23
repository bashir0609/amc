import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, ArrowLeft, Phone, Wrench } from "lucide-react";

export default function NotFound() {
  const quickLinks = [
    { href: "/services", label: "Our Services", icon: Wrench },
    { href: "/mot-booking", label: "Book an MOT", icon: ArrowLeft },
    { href: "/check-mot-status", label: "Check MOT Status", icon: ArrowLeft },
    { href: "/contact-us", label: "Contact Us", icon: Phone },
  ];

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gray-50 flex flex-col">
        <section className="flex-1 flex items-center justify-center section-padding">
          <div className="container-custom max-w-3xl text-center">

            {/* 404 Visual */}
            <div className="relative mb-8 inline-block">
              <div className="text-[9rem] leading-none font-heading font-black text-gray-100 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/30 rotate-6">
                  <Wrench className="w-12 h-12 text-white -rotate-6" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4 mt-4">
              Looks like this page broke down!
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-lg mx-auto">
              Don&apos;t worry — our mechanics can fix cars, but pages are a bit trickier. Let&apos;s get you back on the road.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Link href="/" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
                <Home className="w-5 h-5" /> Back to Homepage
              </Link>
              <Link href="/contact-us" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-primary-400 hover:text-primary-700 font-semibold transition-all">
                <Phone className="w-5 h-5" /> Contact Us
              </Link>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-5">
                Or jump to a popular page
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 hover:-translate-y-1 transition-all text-gray-700 hover:text-primary-700 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
