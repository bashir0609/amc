"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, Paperclip, X, ImageIcon } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((f) => f.type.startsWith("image/")).slice(0, 5);
    setPhotos((prev) => [...prev, ...validFiles].slice(0, 5));
    const newPreviews = validFiles.map((f) => URL.createObjectURL(f));
    setPhotoPreviews((prev) => [...prev, ...newPreviews].slice(0, 5));
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use FormData to support file attachments
      const data = new FormData();
      data.append("type", photos.length > 0 ? "repair-quote" : "contact");
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      photos.forEach((file) => data.append("photos", file));

      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setPhotos([]);
        setPhotoPreviews([]);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-1">
                  Send Us a Message
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Got a car problem? Attach a photo and we&apos;ll quote you for free.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                        Name <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all"
                        placeholder="07123 456789"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Email <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Subject <span className="text-accent-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all text-gray-700"
                    >
                      <option value="">Select a subject...</option>
                      <option value="Free Repair Quote">Free Repair Quote</option>
                      <option value="MOT Enquiry">MOT Enquiry</option>
                      <option value="Service Enquiry">Service Enquiry</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Message <span className="text-accent-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm outline-none transition-all resize-none"
                      placeholder="Describe your issue or question..."
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Attach Photos{" "}
                      <span className="text-gray-400 font-normal">(optional — up to 5 images)</span>
                    </label>

                    {/* Drop zone */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-200 hover:border-primary-400 rounded-xl p-5 flex flex-col items-center gap-2 text-gray-400 hover:text-primary-600 transition-all duration-200 bg-white hover:bg-primary-50 cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Paperclip className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">Click to attach photos</span>
                      <span className="text-xs text-gray-400">JPG, PNG, WEBP — max 5 photos</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {/* Photo previews */}
                    {photoPreviews.length > 0 && (
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {photoPreviews.map((src, i) => (
                          <div key={i} className="relative group aspect-square">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Photo ${i + 1}`}
                              className="w-full h-full object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(i)}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                              aria-label="Remove photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        {photoPreviews.length < 5 && (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square border-2 border-dashed border-gray-200 hover:border-primary-400 rounded-lg flex items-center justify-center text-gray-300 hover:text-primary-500 transition-all"
                          >
                            <ImageIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : photos.length > 0 ? "Send Message & Photos" : "Send Message"}
                  </button>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                      <strong>Message sent!</strong> We&apos;ll get back to you as soon as possible.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                      <strong>Something went wrong.</strong> Please call us on{" "}
                      <a href="tel:+442085539112" className="underline font-semibold">020 8553 9112</a>.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
