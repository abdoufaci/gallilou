"use client";

import { useModal } from "@/hooks/use-modal-store";
import { CircleFadingPlus } from "lucide-react";

function OpenInvite() {
  const { onOpen } = useModal();

  return (
    <CircleFadingPlus
      color="#4A235B"
      strokeWidth={1.25}
      style={{
        backgroundColor: "#F8F5E7",
      }}
      className="rounded-full cursor-pointer"
      onClick={() => onOpen("inviteUser")}
    />
  );
}

export default OpenInvite;
