import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import AppointmentForm from "@/components/AppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Auto MOT Centre | Manor Park",
  description: "Book your MOT, full service, or car repair online at Auto MOT Centre in Manor Park. Choose a convenient date and time for your vehicle service.",
};
export default function MakeAppointmentPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <PageHero
          title="Make an Appointment"
          subtitle="Book your vehicle in for a service, MOT, or repair. Choose a convenient time and let our expert team take care of the rest."
          badge={
            <>
              <span className="w-6 h-px bg-accent-400 inline-block" />
              Online Booking
              <span className="w-6 h-px bg-accent-400 inline-block" />
            </>
          }
        />

        {/* Form */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-2xl">
            <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading form...</div>}>
              <AppointmentForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
