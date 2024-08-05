import { Button } from "@/components/ui/button";
import { Headset, HousePlus, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SellOffer() {
  const t = useTranslations("selloffer");

  return (
    <div className="w-[80%] mx-auto flex flex-wrap gap-10 items-center justify-between mt-44">
      <div className="space-y-14">
        <div className="relative">
          <Image
            alt="star"
            src={"/do-you-star.svg"}
            height={70}
            width={70}
            className="absolute top-0 -left-4 transform translate-x-[-50%] translate-y-[-50%]"
          />
          <h1 className="text-4xl font-bold">{t("title")}</h1>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-md bg-[#7F369F2B] flex items-center justify-center">
              <HousePlus className="h-4 w-4 text-lightBrand" />
            </div>
            <h1>{t("sub1")} </h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-md bg-[#7F369F2B] flex items-center justify-center">
              <Headset className="h-4 w-4 text-lightBrand" />
            </div>
            <h1>{t("sub2")}</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-md bg-[#7F369F2B] flex items-center justify-center">
              <Zap className="h-4 w-4 text-lightBrand" />
            </div>
            <h1>{t("sub3")} </h1>
          </div>
        </div>
        <Link target="_blank" href={"https://Wa.me/+213770711163"}>
          <Button
            size={"lg"}
            variant={"brand"}
            className="h-11 w-48 rounded-sm  font-normal text-lg">
            {t("button")}
          </Button>
        </Link>
      </div>
      <div className="relative">
        <Image
          alt="star"
          src={"/do-you-star2.svg"}
          height={50}
          width={50}
          className="absolute top-[17%] left-[12%] transform translate-x-[-50%] translate-y-[-50%]"
        />
        <Image
          alt="star"
          src={"/do-you-star3.svg"}
          height={50}
          width={50}
          className="absolute bottom-[10%] right-[27%] transform translate-x-[-50%] translate-y-[-50%]"
        />
        <Image
          alt="offer"
          src={"/property-to-sell.png"}
          height={450}
          width={450}
        />
      </div>
    </div>
  );
}

export default SellOffer;
