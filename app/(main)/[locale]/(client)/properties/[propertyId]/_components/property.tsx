import { Property as PropertyModel } from "@prisma/client";
import ImageCarousel from "./image-carousel";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Bath, BedDouble, Phone, PhoneCall, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyAction from "./property-action";

interface TravelProps {
  property: PropertyModel | null;
}

function Property({ property }: TravelProps) {
  const t = useTranslations("property");

  return (
    <div className="flex flex-col lg:flex-row items-start gap-16 w-full mx-auto">
      <ImageCarousel images={property?.images} />
      <div className="space-y-10 w-full max-w-[679.28px]">
        <div className="space-y-7">
          <div className="space-y-2">
            <h1 className="text-[#66717E] text-sm font-bold">
              {property?.city}, {property?.wilaya}
            </h1>
            <h1 className="text-[#15091B] text-2xl font-bold">
              {property?.location}
            </h1>
            <h3 className="text-[#66717E] whitespace-break-spaces">
              {property?.description}
            </h3>
          </div>
          <div className="w-full grid grid-cols-3 ">
            <div className="space-y-3">
              <h1 className="text-[#66717E] text-xs ">{t("bedroom")}</h1>
              <div className="flex items-center gap-3 text-[#15091B] font-semibold">
                <BedDouble className="h-4 w-4" />
                <h1>{property?.bedroom}</h1>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-[#66717E] text-xs ">{t("bathroom")}</h1>
              <div className="flex items-center gap-3 text-[#15091B] font-semibold">
                <Bath className="h-4 w-4" />
                <h1>{property?.bathroom}</h1>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-[#66717E] text-xs ">{t("area")}</h1>
              <div className="flex items-center gap-3 text-[#15091B] font-semibold">
                <Scan className="h-4 w-4" />
                <h1>{property?.size} m²</h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg text-[#15091B] ">{t("desc")}</h1>
            <p className="text-[#66717E] text-sm whitespace-break-spaces">
              {property?.description}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <div className="rounded-full flex items-center justify-center h-8 w-8 bg-lightBrand/15">
                <Phone className="w-4 h-4 text-brand" />
              </div>
              <h1 className="text-[#484848] font-bold text-sm">
                (+213) 770 71 11 63
              </h1>
            </div>
            <div className="flex items-center gap-5">
              <div className="rounded-full flex items-center justify-center h-8 w-8 bg-lightBrand/15">
                <Phone className="w-4 h-4 text-brand" />
              </div>
              <h1 className="text-[#484848] font-bold text-sm">
                (+213) 553 88 71 99
              </h1>
            </div>
          </div>
          <PropertyAction />
        </div>
      </div>
    </div>
  );
}

export default Property;
