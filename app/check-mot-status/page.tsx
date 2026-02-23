import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotStatusChecker from "@/components/MotStatusChecker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check MOT Status & History | Auto MOT Centre",
  description: "Instantly check your vehicle's MOT status, history, mileage records, and expiry date. 100% Free DVSA integrated check.",
};

export default function CheckMotStatusPage() {

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gray-50">
        
        {/* Dynamic Hero Section */}
        <div className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/50" />
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')" }}
            />
            {/* Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex flex-col items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                DVSA Integrated Check
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Check MOT Status & History
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10">
                Instantly view your vehicle&apos;s complete MOT history, mileage records, and current expiry date. 100% Free.
              </p>

              <MotStatusChecker />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
