import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import QuickActions from "@/components/QuickActions";
import BrandsSlider from "@/components/BrandsSlider";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

export default function Home() {
  return (
    <ScrollRevealProvider>
      <Header />
      <main>
        <Hero />
        <div className="reveal">
          <QuickActions />
        </div>
        <BrandsSlider />
        <div className="reveal reveal-delay-1">
          <About />
        </div>
        <div className="reveal">
          <WhyChooseUs />
        </div>
        <div className="reveal">
          <Testimonials />
        </div>
        <div className="reveal">
          <Team />
        </div>
      </main>
      <Footer />
    </ScrollRevealProvider>
  );
}
