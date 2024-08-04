import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Banner() {
  const t = useTranslations("banner");

  return (
    <div
      style={{
        backgroundImage: "url(/banner.png)",
        backgroundSize: "cover",
      }}
      className="h-screen w-full flex flex-col justify-center items-center">
      <div className="text-white text-center flex flex-col items-center justify-center space-y-4">
        <h1 className="text-6xl font-semibold">{t("Title")}</h1>
        <h3 className="text-[#EFEFEF] text-lg font-medium">
          {t("subTitle1")} <br /> {t("subTitle2")}
        </h3>
        <Link href={"/properties"}>
          <Button
            variant={"brand"}
            className="h-11 px-10 rounded-full text-white text-lg font-light">
            {t("button")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
