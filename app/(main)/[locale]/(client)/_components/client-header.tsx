import Image from "next/image";
import Link from "next/link";
import ClientNavigation from "./client-navigation";
import LangNavigation from "@/components/lang-navigation";
import { Burger } from "@/components/burger";

import "../../../../globals.css";

function ClientHeader() {
  return (
    <header className="w-[90%] p-5 ml-[5%] mr-[5%] bg-white rounded-full fixed top-10 headerShadow z-50">
      <nav className="w-[97%] flex items-center justify-between mx-auto">
        <Link className="flex items-center gap-5" href={"/"}>
          <Image alt="logo" src="/logo.png" height={40} width={40} />
          <h1 className="font-bold">
            Gallilou <span className="text-brand font-normal">Immobilier</span>
          </h1>
        </Link>
        <div className="flex items-center gap-10">
          <div className="hidden md:!block">
            <ClientNavigation />
          </div>
          <LangNavigation />
          <div className="md:hidden">
            <Burger />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default ClientHeader;
