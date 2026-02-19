"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Phone, ShoppingCart, X, Check, ChevronDown, Minus, Plus, Tag, Truck, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

// ─── Tyre Data ─────────────────────────────────────────────────────────────────
const TYRES = [
  // Budget
  { id:  1, brand: "Landsail",  model: "LS588",     width: 195, profile: 65, rim: 15, load: "91V", season: "Summer",    category: "Budget",    price: 49.99,  rating: 4.1, reviews: 38,  badge: null },
  { id:  2, brand: "Westlake",  model: "SA37",       width: 205, profile: 55, rim: 16, load: "91W", season: "Summer",    category: "Budget",    price: 54.99,  rating: 4.0, reviews: 22,  badge: null },
  { id:  3, brand: "Landsail",  model: "LS588 SUV",  width: 225, profile: 45, rim: 17, load: "94W", season: "Summer",    category: "Budget",    price: 62.99,  rating: 4.0, reviews: 17,  badge: null },
  { id:  4, brand: "Nexen",     model: "N Blue HD",  width: 185, profile: 65, rim: 15, load: "88H", season: "Summer",    category: "Budget",    price: 58.99,  rating: 4.2, reviews: 61,  badge: "Popular" },
  { id:  5, brand: "Nexen",     model: "Winguard",   width: 195, profile: 65, rim: 15, load: "91H", season: "Winter",    category: "Budget",    price: 64.99,  rating: 4.1, reviews: 29,  badge: null },
  // Mid-range
  { id:  6, brand: "Falken",    model: "Ziex ZE914", width: 205, profile: 55, rim: 16, load: "91W", season: "Summer",    category: "Mid-Range", price: 72.99,  rating: 4.4, reviews: 84,  badge: "Popular" },
  { id:  7, brand: "Falken",    model: "Eurowinter", width: 195, profile: 65, rim: 15, load: "91H", season: "Winter",    category: "Mid-Range", price: 78.99,  rating: 4.3, reviews: 47,  badge: null },
  { id:  8, brand: "Falken",    model: "FK520",      width: 225, profile: 45, rim: 17, load: "94W", season: "Summer",    category: "Mid-Range", price: 84.99,  rating: 4.5, reviews: 52,  badge: "Top Rated" },
  { id:  9, brand: "Kumho",     model: "Ecsta HS52", width: 215, profile: 60, rim: 16, load: "95V", season: "Summer",    category: "Mid-Range", price: 69.99,  rating: 4.3, reviews: 73,  badge: null },
  { id: 10, brand: "Kumho",     model: "WinterCraft",width: 205, profile: 65, rim: 15, load: "94T", season: "Winter",    category: "Mid-Range", price: 76.99,  rating: 4.4, reviews: 35,  badge: null },
  { id: 11, brand: "Kumho",     model: "Ecsta PA51", width: 225, profile: 50, rim: 17, load: "98V", season: "Summer",    category: "Mid-Range", price: 88.99,  rating: 4.4, reviews: 41,  badge: null },
  { id: 12, brand: "Hankook",   model: "Kinergy Eco",width: 195, profile: 55, rim: 15, load: "85H", season: "Summer",    category: "Mid-Range", price: 74.99,  rating: 4.5, reviews: 112, badge: "Best Seller" },
  // Premium
  { id: 13, brand: "Michelin",  model: "Primacy 4",  width: 195, profile: 65, rim: 15, load: "91H", season: "Summer",    category: "Premium",   price: 109.99, rating: 4.9, reviews: 203, badge: "Best Seller" },
  { id: 14, brand: "Michelin",  model: "Pilot Sport 4", width: 225, profile: 45, rim: 17, load: "94Y", season: "Summer", category: "Premium",   price: 149.99, rating: 4.9, reviews: 174, badge: "Top Rated" },
  { id: 15, brand: "Michelin",  model: "Alpin 6",    width: 205, profile: 55, rim: 16, load: "91H", season: "Winter",    category: "Premium",   price: 124.99, rating: 4.8, reviews: 89,  badge: null },
  { id: 16, brand: "Continental", model: "PremiumContact 6", width: 205, profile: 55, rim: 16, load: "94V", season: "Summer", category: "Premium", price: 119.99, rating: 4.8, reviews: 156, badge: "Popular" },
  { id: 17, brand: "Continental", model: "AllSeasonContact", width: 195, profile: 65, rim: 15, load: "91H", season: "All-Season", category: "Premium", price: 114.99, rating: 4.7, reviews: 98,  badge: null },
  { id: 18, brand: "Bridgestone", model: "Turanza T005", width: 215, profile: 60, rim: 16, load: "95V", season: "Summer", category: "Premium",  price: 112.99, rating: 4.8, reviews: 143, badge: null },
];

// ─── Unique filter options ──────────────────────────────────────────────────────
const WIDTHS      = [...new Set(TYRES.map((t) => t.width))].sort((a, b) => a - b);
const PROFILES    = [...new Set(TYRES.map((t) => t.profile))].sort((a, b) => a - b);
const RIMS        = [...new Set(TYRES.map((t) => t.rim))].sort((a, b) => a - b);
const SEASONS     = ["All", "Summer", "Winter", "All-Season"];
const CATEGORIES  = ["All", "Budget", "Mid-Range", "Premium"];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

type Tyre = typeof TYRES[0];

interface CartItem { tyre: Tyre; qty: number }

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TyreShop() {
  // Filters
  const [search, setSearch]         = useState("");
  const [selWidth, setSelWidth]     = useState<number | null>(null);
  const [selProfile, setSelProfile] = useState<number | null>(null);
  const [selRim, setSelRim]         = useState<number | null>(null);
  const [selSeason, setSelSeason]   = useState("All");
  const [selCat, setSelCat]         = useState("All");
  const [sortBy, setSortBy]         = useState<"price-asc" | "price-desc" | "rating" | "popular">("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Cart & enquiry
  const [cart, setCart]             = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen]     = useState(false);
  const [enquiryTyre, setEnquiryTyre] = useState<Tyre | null>(null);
  const [addedId, setAddedId]       = useState<number | null>(null);
  const [loaded, setLoaded]         = useState(false);

  // Load cart
  useEffect(() => {
    const saved = localStorage.getItem("amc_tyre_cart");
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    setLoaded(true);
  }, []);

  // Save cart
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("amc_tyre_cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = cart.reduce((acc, i) => acc + i.tyre.price * i.qty, 0);

  function addToCart(tyre: Tyre) {
    setCart((prev) => {
      const ex = prev.find((i) => i.tyre.id === tyre.id);
      if (ex) return prev.map((i) => i.tyre.id === tyre.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { tyre, qty: 1 }];
    });
    setAddedId(tyre.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) =>
      prev.map((i) => i.tyre.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.tyre.id !== id));
  }

  // Filtered + sorted tyres
  const filtered = useMemo(() => {
    let result = TYRES.filter((t) => {
      if (search && ![t.brand, t.model, String(t.width), String(t.rim)].join(" ").toLowerCase().includes(search.toLowerCase())) return false;
      if (selWidth && t.width !== selWidth) return false;
      if (selProfile && t.profile !== selProfile) return false;
      if (selRim && t.rim !== selRim) return false;
      if (selSeason !== "All" && t.season !== selSeason) return false;
      if (selCat !== "All" && t.category !== selCat) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":  result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "rating":     result = [...result].sort((a, b) => b.rating - a.rating); break;
      case "popular":    result = [...result].sort((a, b) => b.reviews - a.reviews); break;
    }
    return result;
  }, [search, selWidth, selProfile, selRim, selSeason, selCat, sortBy]);

  const badgeColor: Record<string, string> = {
    "Best Seller": "bg-accent-500 text-white",
    "Top Rated":   "bg-emerald-500 text-white",
    "Popular":     "bg-amber-500 text-white",
  };

  const catColor: Record<string, string> = {
    "Budget":     "text-emerald-600 bg-emerald-50",
    "Mid-Range":  "text-primary-700 bg-primary-50",
    "Premium":    "text-amber-700 bg-amber-50",
  };

  function FilterSelect({
    label, value, options, onChange, prefix = ""
  }: {
    label: string; value: number | null; options: number[];
    onChange: (v: number | null) => void; prefix?: string;
  }) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</label>
        <select
          className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer appearance-none"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Any</option>
          {options.map((o) => (
            <option key={o} value={o}>{prefix}{o}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <>
      {/* ─── Hero Banner ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(227,30,36,0.6) 100%)" }} />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent-600/10 rounded-full blur-[100px]" />

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Tag className="w-4 h-4 text-accent-400" />
            <span className="text-white/90 text-sm font-medium">Competitive prices · Fitted at our garage</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-5 leading-tight">
            Quality Tyres, <span className="text-gradient">Great Prices</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-8">
            Browse our full range of budget, mid-range, and premium tyres. Filter by size, season, and brand — then enquire or call us to book fitting.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            {[
              { icon: Truck, text: "Fitted at our garage" },
              { icon: ShieldCheck, text: "Quality guaranteed" },
              { icon: Tag, text: "Best price promise" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-accent-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sticky toolbar ──────────────────────────────────────────────────── */}
      <div className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-custom px-4 py-3 flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search brand or size…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              showFilters ? "bg-primary-700 border-primary-700 text-white" : "bg-gray-50 border-gray-200 text-gray-600 hover:border-primary-300"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {[selWidth, selProfile, selRim].filter(Boolean).length + (selSeason !== "All" ? 1 : 0) + (selCat !== "All" ? 1 : 0) > 0 && (
              <span className="bg-accent-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {[selWidth, selProfile, selRim].filter(Boolean).length + (selSeason !== "All" ? 1 : 0) + (selCat !== "All" ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative hidden sm:block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Results count */}
          <span className="hidden md:block text-sm text-gray-400 ml-auto">{filtered.length} tyres</span>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Enquiry List</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="container-custom px-4 pb-4">
            <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <FilterSelect label="Width (mm)" value={selWidth} options={WIDTHS} onChange={setSelWidth} />
              <FilterSelect label="Profile (%)" value={selProfile} options={PROFILES} onChange={setSelProfile} />
              <FilterSelect label='Rim (")' value={selRim} options={RIMS} onChange={setSelRim} prefix={""} />

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Season</label>
                <select
                  value={selSeason}
                  onChange={(e) => setSelSeason(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none"
                >
                  {SEASONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category</label>
                <select
                  value={selCat}
                  onChange={(e) => setSelCat(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Reset */}
              <div className="col-span-full flex justify-end">
                <button
                  onClick={() => { setSelWidth(null); setSelProfile(null); setSelRim(null); setSelSeason("All"); setSelCat("All"); setSearch(""); }}
                  className="text-xs text-accent-600 hover:text-accent-700 font-semibold underline underline-offset-2"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Tyre Grid ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-10 min-h-[60vh]">
        <div className="container-custom px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-7xl mb-4">🔍</div>
              <h3 className="text-2xl font-heading font-bold text-gray-800 mb-2">No tyres found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((tyre) => (
                <div key={tyre.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
                  {/* Tyre visual */}
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 h-40 flex items-center justify-center overflow-hidden">
                    {/* Tyre ring graphic */}
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 rounded-full border-[10px] border-gray-500 shadow-2xl" />
                      <div className="absolute inset-[22%] rounded-full bg-gray-800 border-2 border-gray-600" />
                      <div className="absolute inset-[35%] rounded-full bg-gray-700" />
                      {/* Tread lines */}
                      {[0, 45, 90, 135].map((deg) => (
                        <div key={deg} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${deg}deg)` }}>
                          <div className="w-full h-[2px] bg-gray-400/30" />
                        </div>
                      ))}
                    </div>

                    {/* Size label */}
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                        {tyre.width}/{tyre.profile} R{tyre.rim}
                      </span>
                    </div>

                    {/* Badge */}
                    {tyre.badge && (
                      <div className={`absolute top-2 right-2 text-xs font-bold px-2.5 py-1 rounded-full ${badgeColor[tyre.badge] ?? "bg-gray-200"}`}>
                        {tyre.badge}
                      </div>
                    )}

                    {/* Season icon */}
                    <div className="absolute top-2 left-2 text-lg">
                      {tyre.season === "Summer" ? "☀️" : tyre.season === "Winter" ? "❄️" : "🌤️"}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tyre.brand}</p>
                          <h3 className="font-heading font-bold text-gray-900 text-[15px] leading-tight">{tyre.model}</h3>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${catColor[tyre.category]}`}>
                          {tyre.category}
                        </span>
                      </div>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {[`${tyre.width}/${tyre.profile}R${tyre.rim}`, tyre.load, tyre.season].map((spec) => (
                          <span key={spec} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{spec}</span>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <Stars rating={tyre.rating} />
                      <span className="text-xs text-gray-500">{tyre.rating} ({tyre.reviews})</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <p className="text-xs text-gray-400">Each tyre from</p>
                          <p className="text-2xl font-heading font-bold text-gray-900">£{tyre.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => addToCart(tyre)}
                          className={`flex-1 flex items-center justify-center gap-2 font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 ${
                            addedId === tyre.id
                              ? "bg-emerald-500 text-white"
                              : "bg-primary-700 hover:bg-primary-800 text-white shadow-md hover:shadow-primary-700/30"
                          }`}
                        >
                          {addedId === tyre.id ? (
                            <><Check className="w-4 h-4" /> Added!</>
                          ) : (
                            <><ShoppingCart className="w-4 h-4" /> Add to List</>
                          )}
                        </button>
                        <button
                          onClick={() => setEnquiryTyre(tyre)}
                          className="px-3 py-2.5 rounded-xl border-2 border-gray-200 hover:border-accent-500 hover:text-accent-600 text-gray-400 text-sm font-semibold transition-all"
                          title="Quick enquiry"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Info strip ──────────────────────────────────────────────────────── */}
      <section className="bg-primary-950 py-10">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📞", title: "Can't find your size?", text: "Call us on 020 8553 9112 and we'll source it for you.", action: { href: "tel:+442085539112", label: "Call Now" } },
              { icon: "🔧", title: "Fitting included", text: "All tyres fitted at our Manor Park garage — balancing and disposal included.", action: null },
              { icon: "💳", title: "Pay on the day", text: "We accept Visa, Mastercard, cash and bank transfer.", action: null },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/8 rounded-2xl p-6 flex gap-4">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-heading font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-blue-300 text-sm leading-relaxed">{item.text}</p>
                  {item.action && (
                    <a href={item.action.href} className="inline-block mt-2 text-accent-400 hover:text-accent-300 font-semibold text-sm">
                      {item.action.label} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cart / Enquiry Sidebar ───────────────────────────────────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-primary-900 px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-white text-xl">Enquiry List</h2>
                <p className="text-blue-300 text-sm">{totalItems} tyre(s) selected</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Your enquiry list is empty</p>
                  <p className="text-sm mt-1">Add tyres to get a quote</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.tyre.id} className="bg-gray-50 rounded-2xl p-4 flex gap-3">
                    <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="w-9 h-9 rounded-full border-[5px] border-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">{item.tyre.brand} {item.tyre.model}</div>
                      <div className="text-xs text-gray-500 font-mono">{item.tyre.width}/{item.tyre.profile}R{item.tyre.rim}</div>
                      <div className="font-bold text-primary-700 mt-0.5">£{item.tyre.price.toFixed(2)} ea</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeFromCart(item.tyre.id)} className="text-gray-300 hover:text-accent-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => changeQty(item.tyre.id, -1)} className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                        <button onClick={() => changeQty(item.tyre.id, +1)} className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-5 space-y-3">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Estimated total ({totalItems} tyre{totalItems > 1 ? "s" : ""})</span>
                  <span className="font-bold text-gray-900 text-lg">£{totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400">Price excludes fitting. Call us to confirm availability and book.</p>
                <a
                  href={`tel:+442085539112`}
                  className="flex items-center justify-center gap-2 w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call to Book Fitting
                </a>
                <Link
                  href="/shop/enquiry"
                  onClick={() => setCartOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  Send Enquiry Online
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Quick Enquiry Modal ──────────────────────────────────────────────── */}
      {enquiryTyre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEnquiryTyre(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-gradient-to-br from-primary-900 to-primary-700 px-6 py-6">
              <button onClick={() => setEnquiryTyre(null)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white">
                <X className="w-4 h-4" />
              </button>
              <p className="text-blue-300 text-xs uppercase tracking-widest mb-1 font-semibold">Enquire about</p>
              <h3 className="text-white font-heading font-bold text-xl">{enquiryTyre.brand} {enquiryTyre.model}</h3>
              <p className="text-blue-200 text-sm font-mono mt-1">{enquiryTyre.width}/{enquiryTyre.profile}R{enquiryTyre.rim} · {enquiryTyre.load}</p>
              <p className="text-2xl font-bold text-white mt-3">£{enquiryTyre.price.toFixed(2)} <span className="text-base font-normal text-blue-300">per tyre</span></p>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-gray-600 text-sm">To confirm availability and book fitting, contact us directly:</p>
              <a href="tel:+442085539112" className="flex items-center justify-center gap-2 w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all">
                <Phone className="w-5 h-5" />
                020 8553 9112
              </a>
              <a href="tel:+447949102483" className="flex items-center justify-center gap-2 w-full bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3 rounded-xl transition-all text-sm">
                <Phone className="w-4 h-4" />
                07949 102483
              </a>
              <Link
                href="/shop/enquiry"
                onClick={() => {
                  setCart((prev) => {
                    const exists = prev.find((item) => item.tyre.id === enquiryTyre.id);
                    if (exists) return prev; // Already in cart
                    return [...prev, { tyre: enquiryTyre, qty: 1 }];
                  });
                  setEnquiryTyre(null);
                }}
                className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 hover:border-primary-300 text-gray-600 hover:text-primary-700 font-semibold py-3 rounded-xl transition-all text-sm"
              >
                Send online message
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
