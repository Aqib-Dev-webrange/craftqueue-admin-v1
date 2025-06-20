import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import { IMAGES } from "@/constants/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#ffffff] h-full min-h-screen flex font-poppins px-6 py-10">
      <div className="lg:fixed h-screen">
        <Sidebar />
      </div>

      <div className="pl-0 md:pl-[336px] w-full h-full">
        <div className="sticky top-0  z-50   bg-white ">
          <Header
            user={{
              name: "Jack Jonson",
              role: "Admin",
              avatarUrl: IMAGES.avatar,
            }}
          />
        </div>
        <div className="w-full h-full mt-10">{children}</div>
      </div>
    </div>
  );
}
