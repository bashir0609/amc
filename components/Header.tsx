"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar, Mail, Clock, Search } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/check-mot-status", label: "Free MOT Check" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#0d1b2a] text-gray-300 text-xs py-2 px-4">
        <div className="container-custom flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <a href="tel:+442085539112" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3" />
              <span>0208 553 9112</span>
            </a>
            <a href="mailto:info@automotcentre.com" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@automotcentre.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock className="w-3 h-3" />
            <span>Mon–Sat: 9:00 AM – 6:00 PM &nbsp;|&nbsp; Lunch: 12:15 – 12:40</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-primary-700/95 backdrop-blur-md shadow-xl shadow-primary-900/20"
            : "bg-primary-700"
        }`}
      >
        <div className="container-custom px-4">
          <div className="flex items-center justify-between h-[70px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-60 h-16 flex items-center justify-start transition-all duration-300 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="AMC Logo" className="w-full h-full object-contain drop-shadow-md" />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-white bg-white/20 shadow-inner"
                      : "text-blue-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Book MOT CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/mot-booking"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                Book MOT Online
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-primary-800/95 backdrop-blur-md border-t border-white/10 px-4 pb-5 pt-3">
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "text-white bg-white/15"
                      : "text-blue-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/mot-booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book an Online MOT
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
