"use client";

const brands = [
  { name: "Rolls-Royce",    src: "/brands/rolls-royce.svg" },
  { name: "Jaguar",         src: "/brands/jaguar.svg" },
  { name: "Porsche",        src: "/brands/porsche.svg" },
  { name: "Mercedes-Benz",  src: "/brands/mercedes.svg" },
  { name: "BMW",            src: "/brands/bmw.svg" },
  { name: "Audi",           src: "/brands/audi.svg" },
  { name: "Ford",           src: "/brands/ford.svg" },
  { name: "Volkswagen",     src: "/brands/volkswagen.svg" },
  { name: "Toyota",         src: "/brands/toyota.svg" },
  { name: "Honda",          src: "/brands/honda.svg" },
  { name: "Nissan",         src: "/brands/nissan.svg" },
  { name: "Vauxhall",       src: "/brands/vauxhall.svg" },
];

// Duplicate for seamless infinite loop
const allBrands = [...brands, ...brands];

export default function BrandsSlider() {
  return (
    <section className="bg-white py-10 border-y border-gray-100 overflow-hidden">
      <div className="container-custom mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Brands We Service
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }}
        />

        <div className="flex brands-marquee gap-14 items-center px-8">
          {allBrands.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center h-14 w-28 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-400"
              title={brand.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.src}
                alt={brand.name}
                className="max-h-12 max-w-[110px] w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
