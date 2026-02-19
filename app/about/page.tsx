import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Award, Users, History, ArrowRight, Target } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Quality Service",
      description:
        "We adhere to manufacturer specifications using AUTODATA charts for all servicing and repairs.",
    },
    {
      icon: Users,
      title: "Family Owned",
      description:
        "As a family-run business, we treat every customer like part of our extended family.",
    },
    {
      icon: Target,
      title: "Honest & Transparent",
      description:
        "We provide clear, upfront pricing with no hidden costs. You only pay for what you need.",
    },
  ];

  const achievements = [
    "Over 30 years of experience in the automotive industry",
    "Trusted by 5000+ satisfied customers",
    "Certified MOT testing facility (Class 4)",
    "AUTODATA compliant servicing",
    "Family owned and operated since 1990",
    "Competitive pricing without compromising quality",
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <PageHero
          title="About Us"
          subtitle="Family-owned and operated since 1990. We take pride in delivering honest, reliable, and high-quality automotive services to the Manor Park community."
        />

        {/* Our Story */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  <strong>Auto MOT Centre Ltd</strong> is a family owned well
                  established independent garage growing day by day based on Manor
                  Park, London.
                </p>
                <p>
                  We do all types of <strong>MOT for vehicles up to class 4</strong>
                  , we also do servicing on all types of vehicles with parts & oil
                  based on <strong>AUTODATA chart</strong>, so you can be sure your
                  vehicles are served based on manufacture specification, at a{" "}
                  <strong>very low price</strong> without compromising quality.
                </p>
                <p>
                  Our commitment to excellence and customer satisfaction has made us
                  one of the most trusted garages in the Manor Park area. We pride
                  ourselves on our honest, transparent service and our ability to
                  build lasting relationships with our customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="card text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-12 text-center">
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <p className="text-lg text-gray-700">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
          <div className="container-custom">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-12 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { name: "A. Haque", role: "CEO", emoji: "👨‍💼" },
                { name: "J. Ahmed", role: "Mechanic", emoji: "🔧" },
                { name: "R. Haque", role: "Mechanic", emoji: "⚙️" },
              ].map((member, index) => (
                <div key={index} className="card text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center text-6xl">
                    {member.emoji}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-semibold text-lg">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
