"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import { InviteForm } from "../forms/Invite-user-form";
import { AddPropertyForm } from "../forms/add-property-form";
import { ScrollArea } from "../ui/scroll-area";
import { PhoneCall } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const CallModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "call";

  const t = useTranslations("call");

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogTitle className="hidden">Call Us</DialogTitle>
        <div className="space-y-5">
          <div className="flex items-center gap-5 border rounded-md sm:!p-5">
            <Link
              href={"tel:+213553887199"}
              className="flex items-center gap-5 sm:!hidden w-full p-5">
              <PhoneCall className="h-7 w-7 text-lightBrand" />
              <div className="space-y-2 ">
                <h1 className="">{t("phone")}</h1>
                <h3 className="text-[#66717E]">+213 553 88 71 99</h3>
              </div>
            </Link>
            <PhoneCall className="h-7 w-7 text-lightBrand max-sm:!hidden" />
            <div className="space-y-2 max-sm:!hidden">
              <h1 className="">{t("phone")}</h1>
              <h3 className="text-[#66717E]">+213 553 88 71 99</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 border rounded-md sm:!p-5">
            <Link
              href={"tel:+213770711163"}
              className="flex items-center gap-5 sm:!hidden w-full p-5">
              <PhoneCall className="h-7 w-7 text-lightBrand" />
              <div className="space-y-2 ">
                <h1 className="">{t("phone")}</h1>
                <h3 className="text-[#66717E]">+213 770 71 11 63</h3>
              </div>
            </Link>
            <PhoneCall className="h-7 w-7 text-lightBrand max-sm:!hidden" />
            <div className="space-y-2 max-sm:!hidden">
              <h1 className="">{t("phone")}</h1>
              <h3 className="text-[#66717E]">+213 770 71 11 63</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 border rounded-md ">
            <Link
              target="_blank"
              href={"https://Wa.me/+213770711163"}
              className="flex items-center p-5 gap-5 w-full">
              <Image
                alt="whatsapp"
                src={"/whatsapp.svg"}
                height={30}
                width={30}
              />
              <div className="space-y-2 ">
                <h1 className="">{t("whatsapp")}</h1>
                <h3 className="text-[#66717E]">+213 770 71 11 63</h3>
              </div>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
