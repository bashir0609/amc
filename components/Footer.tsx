import Link from "next/link";
import { MapPin, Phone, Clock, Facebook, Calendar, ArrowRight, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/shop", label: "Shop" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const paymentMethods = ["Visa", "Mastercard", "Cash", "Bank Transfer"];

  return (
    <footer className="bg-primary-950 text-blue-200">

      {/* CTA Banner — modern gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-accent-600/80" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, rgba(227,30,36,0.6) 0%, transparent 60%)`,
          }}
        />
        <div className="relative container-custom px-4 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/80 font-medium mb-3">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              Takes less than 2 minutes
            </div>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              Ready to book your MOT?
            </h3>
            <p className="text-blue-200">Online booking — quick, easy, no phone call needed.</p>
          </div>
          <Link
            href="/mot-booking"
            className="inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-accent-500/30 hover:shadow-accent-500/50 text-base flex-shrink-0 transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <Calendar className="w-5 h-5" />
            Book MOT Online
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10 overflow-hidden">
                <img src="/logo.png" alt="AMC Logo" className="w-10 h-10 object-contain" />
              </div>
              <div className="font-heading font-bold text-lg text-white">
                Auto MOT Centre
              </div>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-5">
              Family-owned independent garage providing quality MOT testing,
              servicing, and repairs since 1990.
            </p>
            <a
              href="https://www.facebook.com/automotcentre"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 rounded-full px-4 py-2 text-blue-300 hover:text-white transition-all"
            >
              <Facebook className="w-4 h-4" />
              Like us on Facebook
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-blue-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-blue-300">
                <div className="w-7 h-7 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-400" />
                </div>
                <span>4 Rectory Rd, London, E12 6JA</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-accent-400" />
                </div>
                <a href="tel:+442085539112" className="text-blue-300 hover:text-white transition-colors">
                  +44 020 8553 9112
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-accent-400" />
                </div>
                <a href="tel:+447949102483" className="text-blue-300 hover:text-white transition-colors">
                  +44 07949 102483
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-accent-400" />
                </div>
                <a href="mailto:info@automotcentre.com" className="text-blue-300 hover:text-white transition-colors">
                  info@automotcentre.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Opening Hours
            </h4>
            <div className="bg-white/5 rounded-2xl p-4 space-y-2.5">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-blue-300">Mon – Sat</span>
                <span className="text-white font-semibold">9:00 – 18:00</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-blue-300">Sunday</span>
                <span className="text-white font-semibold">10:00 – 16:00</span>
              </div>
              <div className="pt-2.5 mt-1 border-t border-white/10 flex items-center gap-2 text-xs text-blue-400">
                <Clock className="w-3 h-3" />
                <span>Lunch: 12:15 – 12:40</span>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-blue-400 mb-2.5">We Accept</p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((m, i) => (
                  <span key={i} className="px-3 py-1 bg-white/8 border border-white/12 rounded-full text-xs text-blue-200">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5">
        <div className="container-custom px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-400">
          <p>AMC © {currentYear} — All Rights Reserved</p>
          <a
            href="https://www.islahwebservice.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Made with ❤️ by Islah Web Service
          </a>
        </div>
      </div>
    </footer>
  );
}
