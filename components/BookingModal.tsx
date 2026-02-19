"use client";

import { useState } from "react";
import { X, Calendar, User, Car, Mail, Phone, MessageSquare } from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import TimeSlotPicker from "./TimeSlotPicker";
import { formatDate } from "@/lib/availability";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"date" | "time" | "details">("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleReg: "",
    vehicleMake: "",
    vehicleModel: "",
    additionalNotes: "",
  });

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
          handleClose();
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
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
    setSubmitStatus("idle");
    onClose();
  };

  const handleBackStep = () => {
    if (step === "time") {
      setStep("date");
      setSelectedTime(null);
    } else if (step === "details") {
      setStep("time");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-primary text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-heading font-bold">Book Your MOT</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 ${
                  step === "date" ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
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

              <div className="w-12 h-0.5 bg-gray-300" />

              <div
                className={`flex items-center space-x-2 ${
                  step === "time" ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
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

              <div className="w-12 h-0.5 bg-gray-300" />

              <div
                className={`flex items-center space-x-2 ${
                  step === "details" ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
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
          {step === "date" && (
            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />
          )}

          {step === "time" && selectedDate && (
            <div>
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
                    <input
                      type="text"
                      name="vehicleReg"
                      value={formData.vehicleReg}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase"
                      placeholder="AB12 CDE"
                    />
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
          )}
        </div>
      </div>
    </div>
  );
}
