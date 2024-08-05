import Footer from "@/components/footer";
import HomePropertiesFeed from "./_components/6-properties";
import About from "./_components/about";
import Banner from "./_components/banner";
import { HomeSearch } from "./_components/home-search";
import SellOffer from "./_components/sell-offer";
import Map from "./_components/map";
import { Analytics } from "@vercel/analytics/react";

function ClientPage() {
  return (
    <div>
      <Analytics />
      <Banner />
      <HomeSearch />
      <HomePropertiesFeed />
      <About />
      <SellOffer />
      <Map />
      <Footer />
    </div>
  );
}

export default ClientPage;
