"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, MessageSquare, CheckCircle2, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";

const serviceTypes = [
  "MOT Testing",
  "Full Service",
  "Interim Service",
  "Oil Change",
  "Brake Repair",
  "Diagnostics",
  "Repairs",
  "General Repair",
  "Other",
];

// Separate component so useSearchParams works inside Suspense
function AppointmentForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    vehicleInfo: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  // Pre-select service from URL param on mount
  useEffect(() => {
    if (preselectedService) {
      // Match against known service types (case-insensitive, partial match)
      const matched = serviceTypes.find(
        (s) => s.toLowerCase() === preselectedService.toLowerCase()
      ) || preselectedService;
      setFormData((prev) => ({ ...prev, serviceType: matched }));
    }
  }, [preselectedService]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "appointment" }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          serviceType: "",
          vehicleInfo: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-10">
      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-1">
        Appointment Booking Form
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Fill in the details below and we&apos;ll confirm your booking by phone or email.
      </p>

      {/* Pre-selected service banner */}
      {preselectedService && (
        <div className="mb-6 flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-5 h-5 text-primary-700 flex-shrink-0" />
          <p className="text-primary-800 text-sm font-medium">
            Service pre-selected: <strong>{formData.serviceType || preselectedService}</strong>
          </p>
        </div>
      )}

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-base font-heading font-semibold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
          <User className="w-4 h-4 text-primary-700" />
          Your Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-1.5">
              Full Name <span className="text-accent-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-1.5">
              Email Address <span className="text-accent-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold text-sm mb-1.5">
              Phone Number <span className="text-accent-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all"
              placeholder="07123 456789"
            />
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="mb-8">
        <h3 className="text-base font-heading font-semibold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
          <Wrench className="w-4 h-4 text-primary-700" />
          Service Details
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-1.5">
              Service Type <span className="text-accent-500">*</span>
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all text-gray-700"
            >
              <option value="">Select a service...</option>
              {serviceTypes.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-1.5">
              Vehicle Information <span className="text-accent-500">*</span>
            </label>
            <input
              type="text"
              name="vehicleInfo"
              value={formData.vehicleInfo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all"
              placeholder="e.g., Ford Focus 2018, AB12 CDE"
            />
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="mb-8">
        <h3 className="text-base font-heading font-semibold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
          <Calendar className="w-4 h-4 text-primary-700" />
          Preferred Date &amp; Time
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-1.5">
              Preferred Date <span className="text-accent-500">*</span>
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-1.5">
              Preferred Time <span className="text-accent-500">*</span>
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all text-gray-700"
            >
              <option value="">Select a time...</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">01:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mb-8">
        <label className="block text-gray-700 font-semibold text-sm mb-1.5 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary-700" />
          Additional Information <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all resize-none"
          placeholder="Describe any issues or special requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-base"
      >
        <Calendar className="w-5 h-5" />
        {isSubmitting ? "Submitting..." : "Book Appointment"}
      </button>

      {submitStatus === "success" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
          <strong>Booking received!</strong> We&apos;ll contact you shortly to confirm your appointment.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          <strong>Something went wrong.</strong> Please call us on{" "}
          <a href="tel:+442085539112" className="underline font-semibold">020 8553 9112</a>.
        </div>
      )}
    </form>
  );
}

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
