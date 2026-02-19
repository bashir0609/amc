import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TyreEnquiryForm from "@/components/TyreEnquiryForm";

export const metadata = {
  title: "Complete Tyre Enquiry | AMC Auto Motor Centre",
  description: "Finalize your tyre enquiry. Enter your details and we'll confirm stock and fitting availability.",
};

export default function ShopEnquiryPage() {
  return (
    <>
      <Header />
      <main className="pt-[100px] min-h-screen bg-gray-50 pb-20">
        <div className="container-custom px-4">
          <TyreEnquiryForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
