import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { CircleFadingPlus } from "lucide-react";
import Navigation from "./admin-navigation";
import OpenInvite from "./open-invite";
import DashboardDateFilter from "./dashboard-date-filter";

async function Header() {
  return (
    <div className="w-[90%] mx-auto p-5">
      <div className="flex gap-5 items-start lg:items-center justify-between">
        <div className="flex flex-wrap gap-5 flex-grow items-center justify-between">
          <div className="flex flex-wrap items-center gap-16">
            <Link className="flex items-center gap-5" href={"/"}>
              <Image alt="logo" src="/logo.png" height={40} width={40} />
              <h1 className="font-bold">
                Gallilou{" "}
                <span className="text-brand font-normal">Immobilier</span>
              </h1>
            </Link>
            <div className="hidden md:!block">
              <Navigation />
            </div>
          </div>
          <DashboardDateFilter />
        </div>
        <div className="flex items-center gap-5 ">
          <div className="hidden md:!flex mt-1.5">
            <UserButton afterSignOutUrl="/" />
          </div>
          <OpenInvite />
        </div>
      </div>
    </div>
  );
}

export default Header;
