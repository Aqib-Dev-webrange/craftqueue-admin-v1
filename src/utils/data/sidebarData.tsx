import {
  LayoutDashboard,
  CalendarCheck2,
  Boxes,
  Truck
} from "lucide-react";
import { GiPillow } from "react-icons/gi";
import { BoxFast, Calendar, Dashboard, Pillow, Sofa, TruckLocation } from "../../../public/icons/icons";

export type SidebarDataItem = {
  type: "item";
  label: string;
  icon: React.ReactElement;
  link: string;
};

export const sidebarData: SidebarDataItem[] = [
  {
    type: "item",
    label: "Dashboard",
    icon: <Dashboard className="w-5 h-5" />,
    link: "/admin",
  },
  {
    type: "item",
    label: "Upholstery Quotes",
    icon: <Sofa className="w-5 h-5" />,
    link: "/admin/upholstery",
  },
  {
    type: "item",
    label: "Pillow Orders",
    icon: <Pillow className="w-5 h-5" />,
    link: "/admin/orders",
  },
  {
    type: "item",
    label: "Bookings",
    icon: <Calendar className="w-5 h-5" />,
    link: "/admin/bookings",
  },
  {
    type: "item",
    label: "Fabric Management",
    icon: <BoxFast className="w-5 h-5" />,
    link: "/admin/fabrics",
  },
  {
    type: "item",
    label: "Order Tracker",
    icon: <TruckLocation className="w-5 h-5" />,
    link: "/admin/orders/tracker",
  },
];
