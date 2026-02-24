import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProtectedEmail from "@/components/ProtectedEmail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Auto MOT Centre",
  description: "Read the Privacy Policy of Auto MOT Centre to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
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
          title="Privacy Policy"
          subtitle="Your privacy is critically important to us. Learn how we handle your data with care."
        />

        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-sm text-gray-400 mb-8">Last Updated: {currentDate}</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to Auto MOT Centre Ltd (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. The Data We Collect About You</h2>
              <p>
                Personal data, or personal information, means any information about an individual from which that person can be identified.
                We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Identity Data:</strong> includes first name, last name, and title.</li>
                <li><strong>Contact Data:</strong> includes email address, telephone numbers, and billing/delivery addresses.</li>
                <li><strong>Vehicle Data:</strong> includes your vehicle registration mark (VRM), make, model, and servicing history.</li>
                <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Personal Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., booking an MOT or repair).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
              <p>
                We use the data collected via our website forms (Contact Us, Booking) strictly for the purpose of communicating with you regarding your enquiry or managing your vehicle appointment.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Retention</h2>
              <p>
                We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. By law, we have to keep basic information about our customers (including Contact, Identity, and Transaction Data) for six years for tax purposes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
              </ul>
              <p>
                If you wish to exercise any of the rights set out above, please contact us at <ProtectedEmail className="text-primary-600 hover:underline" />.
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
