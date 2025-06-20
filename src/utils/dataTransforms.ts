import type { OrderStatus, RawUpholsteryOrder, TransformedUpholsteryOrder } from "@/types/upholstery";

// Transform order status array to steps format
export function transformOrderStatus(orderStatuses: OrderStatus[]): Step[] {
  const statusMap: { [key: string]: string } = {
    pending: "Order Placed",
    processing: "Processing",
    dispatched: "Dispatched",
    en_route: "En Route",
    delivered: "Delivered",
  };

  return orderStatuses.map((status, index) => {
    let stepStatus: "completed" | "current" | "pending" = "pending";
    
    if (status.is_active) {
      stepStatus = "current";
    } else if (index < orderStatuses.findIndex(s => s.is_active)) {
      stepStatus = "completed";
    }

    return {
      id: index + 1,
      title: statusMap[status.status] || status.status,
      status: stepStatus,
      date: status.date ? formatDate(status.date) : undefined,
      location: status.location || undefined,
    };
  });
}

interface Step {
  id: number;
  title: string;
  status: "completed" | "current" | "pending";
  date?: string;
  location?: string;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}`;
}

export function transformUpholsteryData(
  rawData: RawUpholsteryOrder[]
): TransformedUpholsteryOrder[] {
  return rawData?.map((orderDetails) => {
    // Get current status (find the active status or the latest one)
    const currentStatus =
      orderDetails?.order_status?.find((status) => status.is_active) ||
      orderDetails?.order_status?.[0] ||
      { status: "pending" };

    return {
      customer: orderDetails?.user_name || "Unknown Customer",
      furniture:
        orderDetails?.furniture_type?.display_name ||
        orderDetails?.furniture_type?.name ||
        "N/A",
      status: currentStatus.status || "Pending",
      priority: orderDetails?.is_priority ? "High" : "Normal",
      date: formatDate(orderDetails?.created_at || ""),
      id: orderDetails?.id || "N/A",
      order_number: orderDetails?.order_number || "N/A",
    };
  }) || [];
}
