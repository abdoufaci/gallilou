import { getPropertyById } from "@/actions/queries/get-property-by-id";
import Property from "./_components/property";
import Footer from "@/components/footer";
import SuggestedPropertiesFeed from "./_components/suggest";
import { Analytics } from "@vercel/analytics/react";

async function PropertyPage({
  params: { propertyId },
}: {
  params: { propertyId: string };
}) {
  const property = await getPropertyById(propertyId);

  return (
    <div className="pt-44 w-[90%] mx-auto">
      <Analytics />
      <Property property={property} />
      <SuggestedPropertiesFeed />
      <Footer />
    </div>
  );
}

export default PropertyPage;
