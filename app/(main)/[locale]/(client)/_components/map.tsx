import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

function Map() {
  const t = useTranslations("contact");

  return (
    <div
      id="contact"
      className="w-[90%] mx-auto flex flex-col md:flex-row items-start gap-5 mt-36">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.2152116706616!2d3.1843482752990435!3d36.71739227236393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e51460f208447%3A0x721e027c34b6a0cf!2sROCDZ%20(%20Republic%20Of%20Computer%20Dz%20)!5e0!3m2!1sen!2sdz!4v1719079684958!5m2!1sen!2sdz"
        className="w-full h-[635px]"
        style={{
          border: "0px",
        }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div className="text-white space-y-4 w-full max-w-[550.51px] rounded-[17.04px] bg-lightBrand p-4 flex flex-col items-start justify-center">
        <h1 className="font-semibold">{t("title")}</h1>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="rounded-full flex items-center justify-center h-8 w-8 bg-[#FFFFFF30]">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-sm">(+213) 770 71 11 63</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="rounded-full flex items-center justify-center h-8 w-8 bg-[#FFFFFF30]">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-sm">(+213) 553 88 71 99</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="rounded-full flex items-center justify-center h-8 w-8 bg-[#FFFFFF30]">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-sm">(+213) 553 88 71 99</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="rounded-full flex items-center justify-center h-8 w-8 bg-[#FFFFFF30]">
              <Image
                alt="logo"
                src={"/white-insta.svg"}
                height={15}
                width={15}
              />
            </div>
            <h1 className="font-bold text-sm">Gallilou_immobilier</h1>
          </div>
        </div>
        <div className="space-y-3 w-full">
          <h1 className="text-white font-semibold">{t("formtitle")}</h1>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Map;
