import { Outfit } from "next/font/google";
import Header from "./_components/header";
import AdminFooter from "@/components/admin-footer";

const outfit = Outfit({ subsets: ["latin"] });

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={outfit.style}
      className="bg-[#F6F6F6] w-full space-y-10 min-h-screen relative">
      <Header />
      <div className="w-[90%] h-full mx-auto">{children}</div>
      <AdminFooter />
    </main>
  );
}

export default DashboardLayout;
