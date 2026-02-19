"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from "lucide-react";

const avatarGradients = [
  "from-primary-600 to-primary-800",
  "from-accent-500 to-red-600",
  "from-emerald-500 to-emerald-700",
];

const testimonials = [
  {
    name: "S J",
    rating: 5,
    text: "I have been going to Auto Mot Centre for roughly 7yrs now, they have worked on 4 different cars I have owned. Went in this time for a routine MOT and as always the service and speed was exceptional. They are honest, reliable and trustworthy. Thank you to Rafiqul and the guys always.",
    link: "https://maps.app.goo.gl/PZGMHtuaZzDnxm1U9",
  },
  {
    name: "Jonny Cawston",
    rating: 5,
    text: "Great service drove in 10:30am today asking about MOT — Raf was very helpful and friendly, did MOT straight away no waiting around for ages like I have done at other MOT places. Car back 45 mins later and a pass — so happy days! Thank you Raf.",
    link: "https://maps.app.goo.gl/n8o3rWqkjd5fNdZXA",
  },
  {
    name: "M K R",
    rating: 5,
    text: "Booked online yesterday and MOT done today. On arrival was warmly and promptly greeted by Javed, which makes a change compared to other MOT stations in the area. Recommended for a seamless, and hassle free service. Will use again, thank you!",
    link: "https://maps.app.goo.gl/VABgagRudVajGLgX6",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Subtle background orb */}
      <div className="absolute top-0 right-0 w-[40%] h-[80%] bg-primary-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="inline-flex items-center gap-2 text-accent-500 font-semibold text-sm uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-accent-500 inline-block" />
              Customer Reviews
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">
              What Our Customers Say
            </h2>
          </div>

          {/* Google badge */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm self-start md:self-auto">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-gray-800">4.9</span>
            <span className="text-gray-400 text-sm">on Google</span>
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`group bg-white border rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${
                index === 1 ? "border-accent-200 shadow-md ring-1 ring-accent-100" : "border-gray-100 shadow-sm"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-50 rounded-xl flex items-center justify-center mb-5">
                <Quote className="w-5 h-5 text-accent-400" />
              </div>
              <blockquote className="text-gray-600 leading-relaxed text-sm flex-1 mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[index]} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="flex">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <a href={t.link} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-accent-50 flex items-center justify-center text-gray-400 hover:text-accent-500 transition-all">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-7">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-50 rounded-xl flex items-center justify-center mb-5">
              <Quote className="w-5 h-5 text-accent-400" />
            </div>
            <blockquote className="text-gray-600 leading-relaxed mb-6 italic">
              &ldquo;{testimonials[current].text}&rdquo;
            </blockquote>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[current]} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {testimonials[current].name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonials[current].name}</div>
                  <div className="flex">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <a href={testimonials[current].link} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-accent-50 flex items-center justify-center text-gray-400 hover:text-accent-500 transition-all">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setCurrent((p) => (p === 0 ? testimonials.length - 1 : p - 1))} className="p-2.5 rounded-full bg-gray-100 hover:bg-primary-700 hover:text-white text-gray-600 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-accent-500" : "w-2 bg-gray-200"}`} />
                ))}
              </div>
              <button onClick={() => setCurrent((p) => (p + 1) % testimonials.length)} className="p-2.5 rounded-full bg-gray-100 hover:bg-primary-700 hover:text-white text-gray-600 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
