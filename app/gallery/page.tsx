import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Images } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function GalleryPage() {
  // Placeholder gallery items - replace with actual images
  const galleryItems = [
    { id: 1, title: "Workshop Facility", category: "Facility" },
    { id: 2, title: "MOT Testing Bay", category: "Facility" },
    { id: 3, title: "Service Area", category: "Facility" },
    { id: 4, title: "Brake Repair", category: "Services" },
    { id: 5, title: "Engine Diagnostics", category: "Services" },
    { id: 6, title: "Oil Change Service", category: "Services" },
    { id: 7, title: "Customer Vehicle 1", category: "Customers" },
    { id: 8, title: "Customer Vehicle 2", category: "Customers" },
    { id: 9, title: "Customer Vehicle 3", category: "Customers" },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <PageHero
          title="Gallery"
          subtitle="Take a look at our workshop, our team in action, and some of the vehicles we've had the pleasure of working on."
          badge={
            <>
              <Images className="w-4 h-4 text-accent-400" />
              <span className="text-white/90 text-sm font-medium">Our Workshop & Projects</span>
            </>
          }
        />

        {/* Gallery Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="card group cursor-pointer hover:-translate-y-2"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-6xl">🚗</div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Note for adding real images */}
            <div className="mt-12 p-6 bg-primary-50 rounded-xl border-l-4 border-primary-600">
              <p className="text-gray-700">
                <strong>Note:</strong> This gallery uses placeholder content.
                Replace with actual photos of your workshop, services, and
                customer vehicles by adding images to the{" "}
                <code className="bg-white px-2 py-1 rounded">/public/images/gallery/</code>{" "}
                directory.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
