import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import { IMAGES } from "@/constants/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" m-4 ">
      <Sidebar />
      <div className="pl-0 md:pl-[320px] bg-white w-full h-full">
        <Header user={{ name: "Jack Jonson", role: "Admin", avatarUrl: IMAGES.avatar }} />
        {children}
      </div>
    </div>
  );
}