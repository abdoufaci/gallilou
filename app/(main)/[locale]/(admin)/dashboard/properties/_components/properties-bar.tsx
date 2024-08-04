import AddProperty from "./add-property";
import DateFilter from "./date-filter";
import SearchFilter from "./search-filter";
import StatusFilter from "./status-filter";

function PropertiesBar() {
  return (
    <div className="w-full p-5 rounded-b-none rounded-xl bg-white flex flex-wrap gap-5 items-center justify-between">
      <div className="flex items-center gap-7 flex-grow">
        <h1 className="font-semibold text-lg">Properties</h1>
        <SearchFilter />
      </div>
      <div className="flex flex-wrap items-center gap-5 w-full md:w-fit ">
        <AddProperty />
        <StatusFilter />
        <DateFilter />
      </div>
    </div>
  );
}

export default PropertiesBar;
