import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProtectedEmail from "@/components/ProtectedEmail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Auto MOT Centre",
  description: "Read the Terms and Conditions for booking services, repairs, and MOT testing at Auto MOT Centre.",
};

export default function TermsAndConditionsPage() {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <main className="pt-20">
        <PageHero
          title="Terms & Conditions"
          subtitle="The rules and regulations for the use of Auto MOT Centre's Website and Services."
        />

        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-sm text-gray-400 mb-8">Last Updated: {currentDate}</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
              <p>
                These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and Auto MOT Centre Ltd (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of our website as well as any other media form, media channel, or mobile website related, linked, or otherwise connected thereto (collectively, the &quot;Site&quot;) and our garage services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Garage Services & Estimates</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Estimates:</strong> Any estimate given by us for work to be carried out is an approximation only. The final invoice may vary if additional parts or labor are discovered to be necessary during the repair process. We will always attempt to contact you for authorisation before proceeding with significant additional work.</li>
                <li><strong>Completion of Work:</strong> We will endeavor to complete all work within the time frame estimated; however, we cannot be held liable for any delays that are out of our control (e.g., parts delays).</li>
                <li><strong>Parts:</strong> All old parts removed from your vehicle during a repair will be disposed of by us unless you specifically request to retain them prior to the commencement of the work.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Bookings and Cancellations</h2>
              <p>
                When you make a booking online or over the phone, it is considered a firm appointment. If you need to cancel or reschedule, we request at least 24 hours&apos; notice. Failure to attend an MOT test or service appointment without prior notice may result in future bookings requiring a non-refundable deposit.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Payment</h2>
              <p>
                Full payment is due upon completion of the work and before the vehicle is removed from our premises. We accept cash and all major credit/debit cards. We retain the right to hold your vehicle (exercising a mechanic&apos;s lien) until full payment for the services rendered has been cleared.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Warranties and Guarantees</h2>
              <p>
                We guarantee our labor for a period of 12 months or 12,000 miles, whichever occurs first, from the date of the invoice. Parts supplied by us are subject to the manufacturer&apos;s warranty. This guarantee does not cover wear and tear, accidental damage, or issues arising from subsequent improper use or lack of maintenance.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Liability</h2>
              <p>
                While your vehicle is in our care, it will be driven only by our insured staff for testing and diagnostic purposes. We accept liability for any damage caused directly by our negligence. We do not accept liability for loss or damage to personal belongings left inside the vehicle.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Contact Us</h2>
              <p>
                If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
                <br />
                <strong>Auto MOT Centre Ltd</strong><br />
                4 Rectory Rd, London, E12 6JA<br />
                Phone: 020 8553 9112<br />
                Email: <ProtectedEmail className="text-primary-600 hover:underline" />
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
