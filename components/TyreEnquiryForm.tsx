"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ArrowLeft, Loader2, Calendar, Phone, Mail, User, Car } from "lucide-react";
import Link from "next/link";

interface CartItem {
  tyre: {
    id: number;
    brand: string;
    model: string;
    width: number;
    profile: number;
    rim: number;
    season: string;
    price: number;
  };
  qty: number;
}

export default function TyreEnquiryForm() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reg: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("amc_tyre_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setLoading(false);
  }, []);

  const totalPrice = cart.reduce((acc, item) => acc + item.tyre.price * item.qty, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/shop-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cart,
          total: totalPrice,
        }),
      });

      if (!res.ok) throw new Error("Failed to send enquiry");

      setSuccess(true);
      localStorage.removeItem("amc_tyre_cart"); // Clear cart on success
      window.scrollTo(0, 0);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>;
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-4">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">Enquiry Received!</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Thanks for your tyre enquiry. We&apos;ve sent a confirmation email to <strong>{formData.email}</strong>.
          <br /><br />
          One of our team will call you shortly to confirm stock availability and book your fitting slot.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
          <Link href="/" className="btn-secondary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your List is Empty</h2>
        <p className="text-gray-500 mb-8">It looks like you haven&apos;t added any tyres to your enquiry list yet.</p>
        <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Go to Tyre Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      {/* ─── Form Section ─── */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="mb-8">
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Complete Enquiry</h1>
          <p className="text-gray-500 mt-2">
            Please fill in your details below. No payment is taken online — pay when your tyres are fitted.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="07700 900000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Vehicle Registration</label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono uppercase placeholder:normal-case font-medium"
                  placeholder="AB12 CDE"
                  value={formData.reg}
                  onChange={(e) => setFormData({ ...formData, reg: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Preferred Fitting Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="e.g. Tomorrow afternoon, or Next Tuesday"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <p className="text-xs text-gray-500">We&apos;ll do our best to accommodate your preferred time.</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Additional Notes (Optional)</label>
            <textarea
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-h-[100px]"
              placeholder="Any specific requirements or questions?"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary py-4 text-lg font-bold shadow-lg shadow-primary-700/20 hover:shadow-primary-700/40 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Sending...
              </span>
            ) : (
              "Send Enquiry Request"
            )}
          </button>
          <p className="text-center text-xs text-gray-500">
            By clicking send, you agree to our terms. This is a booking enquiry, not a final order.
          </p>
        </form>
      </div>

      {/* ─── Summary Sidebar ─── */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-4 mb-6">
          {cart.map((item, i) => (
            <div key={i} className="flex gap-3 text-sm pb-4 border-b border-gray-200 last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                {item.qty}x
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">{item.tyre.brand} {item.tyre.model}</div>
                <div className="text-gray-500 text-xs">{item.tyre.width}/{item.tyre.profile}R{item.tyre.rim} {item.tyre.season}</div>
              </div>
              <div className="font-semibold text-gray-900">
                £{(item.qty * item.tyre.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>£{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Fitting & Balancing</span>
            <span className="text-emerald-600 font-medium">Included</span>
          </div>
          <div className="flex justify-between items-end pt-2 text-xl font-bold text-gray-900">
            <span>Est. Total</span>
            <span>£{totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-xs text-right text-gray-400">Including VAT</p>
        </div>
      </div>
    </div>
  );
}
