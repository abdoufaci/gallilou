import PropertiesBar from "./_components/properties-bar";
import PropertiesFeed from "./_components/properties-feed";

function ProductsPage() {
  return (
    <div className="space-y-5 pb-10">
      <PropertiesBar />
      <PropertiesFeed />
    </div>
  );
}

export default ProductsPage;
