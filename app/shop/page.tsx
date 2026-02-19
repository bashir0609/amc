import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TyreShop from "@/components/TyreShop";

export const metadata = {
  title: "Tyre Shop | AMC Auto Motor Centre",
  description: "Browse our full range of budget, mid-range, and premium tyres in all sizes. Fitted at our Manor Park, London garage.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="pt-[70px] min-h-screen">
        <TyreShop />
      </main>
      <Footer />
    </>
  );
}
