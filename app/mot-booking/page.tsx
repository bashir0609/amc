"use client";

import { useState, useEffect, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import { Calendar, Clock, CheckCircle2, User, Car, MessageSquare, Shield, Search } from "lucide-react";
import PageHero from "@/components/PageHero";
import { formatDate } from "@/lib/availability";
import { useSearchParams } from "next/navigation";

function MOTBookingForm() {
  const [step, setStep] = useState<"date" | "time" | "details">("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isFetchingVehicle, setIsFetchingVehicle] = useState(false);
  const [vehicleError, setVehicleError] = useState("");
  const [motExpiry, setMotExpiry] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleReg: "",
    vehicleMake: "",
    vehicleModel: "",
    additionalNotes: "",
  });

  const searchParams = useSearchParams();
  const vrmParam = searchParams.get("vrm");

  useEffect(() => {
    if (vrmParam) {
      // Step to Details to immediately show the form with pre-filled vehicle
      setStep("details");
      setFormData(prev => ({ ...prev, vehicleReg: vrmParam }));
      
      // Auto-trigger fetch if vrm parameter is provided
      const fetchInitialVehicle = async () => {
        setIsFetchingVehicle(true);
        setVehicleError("");
        try {
          const res = await fetch(`/api/mot-history?vrm=${encodeURIComponent(vrmParam)}`);
          if (res.ok) {
            const data = await res.json();
            setFormData(prev => ({
              ...prev,
              vehicleMake: data.make ? data.make.charAt(0) + data.make.slice(1).toLowerCase() : "",
              vehicleModel: data.model ? data.model.charAt(0) + data.model.slice(1).toLowerCase() : "",
            }));
            if (data.motTests && data.motTests.length > 0) {
              setMotExpiry(data.motTests[0].expiryDate);
            }
          }
        } catch {
          // Silent catch for auto-fetch
        } finally {
          setIsFetchingVehicle(false);
        }
      };
      
      fetchInitialVehicle();
    }
  }, [vrmParam]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("details");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFetchVehicle = async () => {
    if (!formData.vehicleReg) return;
    setIsFetchingVehicle(true);
    setVehicleError("");
    setMotExpiry(null);

    try {
      const res = await fetch(`/api/mot-history?vrm=${encodeURIComponent(formData.vehicleReg)}`);
      if (!res.ok) {
        setVehicleError("Vehicle not found. Please check or enter manually.");
        return;
      }
      const data = await res.json();
      setFormData(prev => ({
        ...prev,
        vehicleMake: data.make ? data.make.charAt(0) + data.make.slice(1).toLowerCase() : "",
        vehicleModel: data.model ? data.model.charAt(0) + data.model.slice(1).toLowerCase() : "",
      }));
      if (data.motTests && data.motTests.length > 0) {
        setMotExpiry(data.motTests[0].expiryDate);
      }
    } catch {
      setVehicleError("Error fetching vehicle data.");
    } finally {
      setIsFetchingVehicle(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "mot",
          preferredDate: selectedDate?.toISOString().split("T")[0],
          preferredTime: selectedTime,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          // Reset form
          setStep("date");
          setSelectedDate(null);
          setSelectedTime(null);
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            vehicleReg: "",
            vehicleMake: "",
            vehicleModel: "",
            additionalNotes: "",
          });
          setMotExpiry(null);
          setVehicleError("");
          setSubmitStatus("idle");
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackStep = () => {
    if (step === "time") {
      setStep("date");
      setSelectedTime(null);
    } else if (step === "details") {
      setStep("time");
    }
  };

  const features = [
    {
      icon: Calendar,
      title: "Easy Online Booking",
      description: "Select your preferred date and time",
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Most tests completed in 45 minutes",
    },
    {
      icon: Shield,
      title: "DVSA Approved",
      description: "Fully certified testing station",
    },
    {
      icon: CheckCircle2,
      title: "Instant Confirmation",
      description: "Email confirmation immediately",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <PageHero
          title="Book Your MOT Online"
          subtitle="Fast, fair, and reliable MOT testing. Book your slot online today and ensure your vehicle is roadworthy and legal."
          badge={
            <>
              <Calendar className="w-4 h-4 text-accent-400" />
              <span className="text-white/90 text-sm font-medium">Class 4 & 7 Available</span>
            </>
          }
        />

        {/* Features Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="card text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-700">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-6xl">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-2 ${
                    step === "date" ? "text-primary-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step === "date"
                        ? "bg-primary-600 text-white"
                        : selectedDate
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    1
                  </div>
                  <span className="font-semibold hidden sm:inline">Select Date</span>
                </div>

                <div className="w-16 h-0.5 bg-gray-300" />

                <div
                  className={`flex items-center space-x-2 ${
                    step === "time" ? "text-primary-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step === "time"
                        ? "bg-primary-600 text-white"
                        : selectedTime
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    2
                  </div>
                  <span className="font-semibold hidden sm:inline">Select Time</span>
                </div>

                <div className="w-16 h-0.5 bg-gray-300" />

                <div
                  className={`flex items-center space-x-2 ${
                    step === "details" ? "text-primary-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step === "details" ? "bg-primary-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    3
                  </div>
                  <span className="font-semibold hidden sm:inline">Your Details</span>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="max-w-4xl mx-auto">
              {step === "date" && (
                <div>
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 text-center">
                    Select Your Preferred Date
                  </h2>
                  <BookingCalendar
                    selectedDate={selectedDate}
                    onSelectDate={handleDateSelect}
                  />
                </div>
              )}

              {step === "time" && selectedDate && (
                <div className="card">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                    Select Your Preferred Time
                  </h2>
                  <TimeSlotPicker
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onSelectTime={handleTimeSelect}
                  />
                  <button
                    onClick={handleBackStep}
                    className="mt-6 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    ← Back to Calendar
                  </button>
                </div>
              )}

              {step === "details" && selectedDate && selectedTime && (
                <div className="card">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                    Enter Your Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Booking Summary */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-green-700 mb-2">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold">Your Booking:</span>
                      </div>
                      <p className="text-lg font-heading font-bold text-gray-900">
                        {formatDate(selectedDate)} at {selectedTime}
                      </p>
                    </div>

                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-primary-600" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 font-semibold mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="07123 456789"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4 flex items-center">
                        <Car className="w-5 h-5 mr-2 text-primary-600" />
                        Vehicle Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 font-semibold mb-2">
                            Vehicle Registration *
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              name="vehicleReg"
                              value={formData.vehicleReg}
                              onChange={handleChange}
                              required
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase"
                              placeholder="AB12 CDE"
                            />
                            <button
                              type="button"
                              onClick={handleFetchVehicle}
                              disabled={isFetchingVehicle || !formData.vehicleReg}
                              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center"
                            >
                              {isFetchingVehicle ? "Finding..." : <><Search className="w-5 h-5 mr-2" /> Find</>}
                            </button>
                          </div>
                          {vehicleError && <p className="text-red-500 text-sm mt-2">{vehicleError}</p>}
                          {motExpiry && (
                            <p className="text-green-600 font-medium text-sm mt-2 bg-green-50 p-2 rounded border border-green-200 inline-block">
                              MOT Expires: {motExpiry}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Vehicle Make *
                          </label>
                          <input
                            type="text"
                            name="vehicleMake"
                            value={formData.vehicleMake}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Ford"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Vehicle Model *
                          </label>
                          <input
                            type="text"
                            name="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Focus"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Any additional information..."
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={handleBackStep}
                        className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        ← Back to Time Selection
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Booking..." : "Confirm Booking"}
                      </button>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        <strong>Success!</strong> Your MOT booking has been confirmed. We&apos;ll send you a confirmation email shortly.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <strong>Error!</strong> There was a problem with your booking. Please call us at 020 8553 9112.
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* MOT Information Section */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <div className="card">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                MOT Test Information
              </h2>
              
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                    What is an MOT?
                  </h3>
                  <p>
                    An MOT test is an annual inspection required by law for all vehicles over 3 years old. 
                    It checks that your vehicle meets road safety and environmental standards.
                  </p>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h3 className="text-xl font-heading font-semibold text-primary-900 mb-2">
                    MOT Test Price
                  </h3>
                  <p className="text-2xl font-bold text-primary-700">
                    £40.00
                  </p>
                  <p className="text-sm text-primary-600 mt-1">
                    Maximum fee set by DVSA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function MOTBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div></div>}>
      <MOTBookingForm />
    </Suspense>
  );
}
