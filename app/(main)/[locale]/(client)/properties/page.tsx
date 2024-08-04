import Footer from "@/components/footer";
import ClientFilter from "./_components/client-filter";
import ClientPropertiesFeed from "./_components/client-properties-feed";
import FilterButton from "./_components/filter-button";

function PropertiesPage() {
  return (
    <div className="pt-56 w-[90%] mx-auto">
      <div className="flex items-start gap-5">
        <div className="max-lg:hidden inline-block sticky top-36 left-0">
          <ClientFilter />
        </div>
        <div className="space-y-5 w-full">
          <div className="w-full bg-white z-50 p-5 sticky top-32 left-0 flex justify-end lg:hidden">
            <FilterButton />
          </div>
          <ClientPropertiesFeed />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PropertiesPage;
