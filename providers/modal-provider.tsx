"use client";

import { AddPropertyModal } from "@/components/modals/add-property-modal";
import { BuyerInfoModal } from "@/components/modals/buyer-info-modal";
import { CallModal } from "@/components/modals/call-modal";
import { ClientFilterModal } from "@/components/modals/client-filter-modal";
import { InviteModal } from "@/components/modals/Invite-user";
import { MakeSoldModal } from "@/components/modals/make-sold-modal";
import { SoldPropertyModal } from "@/components/modals/make-unsold-modal";
import { ProfitModal } from "@/components/modals/profit-modal";
import { PropertyDetailsModal } from "@/components/modals/property-details-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <InviteModal />
      <AddPropertyModal />
      <PropertyDetailsModal />
      <MakeSoldModal />
      <SoldPropertyModal />
      <ClientFilterModal />
      <CallModal />
      <BuyerInfoModal />
      <ProfitModal />
    </div>
  );
};
