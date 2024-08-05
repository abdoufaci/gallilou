"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Property } from "@prisma/client";
import { MapPin, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface PropertyActionProps {
  property?: Property | null;
}

function PropertyAction({ property }: PropertyActionProps) {
  const { onOpen } = useModal();
  const t = useTranslations("property");

  return (
    <div className="w-full flex flex-wrap items-center gap-5">
      <Button
        onClick={() => onOpen("call")}
        variant={"brand"}
        className="h-11 w-36 text-lg font-normal rounded-full flex items-center gap-4 text-white">
        <PhoneCall className="h-5 w-5" />
        <h1>{t("call")}</h1>
      </Button>
      <Link target="_blank" href={property?.mapLink || ""}>
        <Button
          className="h-11 w-36 text-lg font-normal bg-transparent hover:bg-lightBrand hover:text-white transition-all 
          duration-200 ease-out border border-lightBrand rounded-full flex items-center gap-4 text-lightBrand">
          <MapPin className="h-5 w-5" />
          <h1>{t("location")}</h1>
        </Button>
      </Link>
    </div>
  );
}

export default PropertyAction;
