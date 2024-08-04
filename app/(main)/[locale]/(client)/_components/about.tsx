import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

function About() {
  const t = useTranslations("about");

  return (
    <div id="about" className="w-[90%] mx-auto space-y-10 mt-36">
      <div className="flex items-center gap-5">
        <Separator className="bg-[#FFCF15] h-0.5 w-20" />
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <Image
          alt="about"
          src={"/about.png"}
          height={500}
          width={500}
          className="w-full max-w-[787px]"
        />
        <div className="space-y-5 w-fit relative">
          <Image
            alt="star"
            src={"/about-star.svg"}
            height={30}
            width={30}
            className="absolute top-4 left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
          />
          <Image
            alt="star"
            src={"/about-star2.svg"}
            height={30}
            width={30}
            className="absolute top-14 right-[25%] transform translate-x-[-50%] translate-y-[-50%]"
          />
          <Image
            alt="star"
            src={"/about-star3.svg"}
            height={30}
            width={30}
            className="absolute top-[50%] -left-4 transform translate-x-[-50%] translate-y-[-50%]"
          />
          <Image
            alt="star"
            src={"/about-star4.svg"}
            height={40}
            width={40}
            className="absolute -bottom-10 left-[50%] transform translate-x-[-50%] "
          />
          <div className="flex items-center gap-5">
            <Image alt="logo" src="/logo.png" height={70} width={70} />
            <h1 className="font-bold text-3xl">
              Gallilou{" "}
              <span className="text-lightBrand font-normal">Immobilier</span>
            </h1>
          </div>
          <p className="whitespace-break-spaces text-lg max-w-[714px] text-[#15091BDB]">
            {t("desc")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
