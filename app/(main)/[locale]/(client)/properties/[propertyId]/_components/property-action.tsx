"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";

function PropertyAction() {
  const { onOpen } = useModal();
  const t = useTranslations("property");

  return (
    <Button
      onClick={() => onOpen("call")}
      variant={"brand"}
      className="h-11 w-36 text-lg font-normal rounded-full flex items-center gap-4 text-white">
      <PhoneCall className="h-5 w-5" />
      <h1>{t("call")}</h1>
    </Button>
  );
}

export default PropertyAction;
