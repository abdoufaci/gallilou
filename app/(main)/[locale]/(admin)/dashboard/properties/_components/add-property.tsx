"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

function AddProperty() {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("addProperty")}
      variant={"brand"}
      size={"lg"}
      className="rounded-full h-10">
      Add a property
    </Button>
  );
}

export default AddProperty;
