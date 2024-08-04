"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useTranslations } from "next-intl";

function FilterButton() {
  const { onOpen } = useModal();
  const t = useTranslations("filter");

  return (
    <Button
      onClick={() => onOpen("clientFilter")}
      className="bg-brand/90 hover:bg-brand text-white rounded-sm w-36 text-lg h-11 lg:hidden"
      type="button">
      {t("title")}
    </Button>
  );
}

export default FilterButton;
