import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please add it to your .env.local file.');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. Please add it to your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// export async function getPillowOrders() {
//   const { data, error } = await supabase.rpc("get_pillow_orders");
//   if (error) {
//     console.error("Supabase error:", error.message);
//     return [];
//   }
//   return data;
// }

// interface PillowOrder {
//   user_name?: string;
//   user_email?: string;
//   order_type?: string;
//   fabric_type?: {
//     option_name?: string;
//   } | null;
//   order_status?: { status?: string }[] | null;
//   created_at: string;
// }

// export function formatPillowOrders(data: PillowOrder[]) {
//   return data.map((item) => ({
//     customer: item.user_name ?? "N/A",
//     email: item.user_email ?? "N/A",
//     pillowType: item.order_type ?? "pillow",
//     fabric: item.fabric_type?.option_name ?? "N/A",
//     status: item.order_status?.[0]?.status ?? "Unknown",
//     date: new Date(item.created_at).toLocaleDateString(),
//   }));
// }


// export async function getPillowOrderByNumber(orderNumber: string) {
//   const { data, error } = await supabase
//     .rpc("get_pillow_orders") // your RPC returns all orders
//     .then(({ data }) => data?.find(o => o.order_number === orderNumber));

//   if (!data) {
//     console.error("Order not found or error:", error);
//     return null;
//   }

//   return data;
// }
interface FabricType {
  option_name?: string;
}

interface OrderStatus {
  status?: string;
}

type UpholsteryFeature = {
  // Define the properties of UpholsteryFeature here, or use 'any' if unknown
  // For example:
  // feature_name?: string;
  // feature_value?: string;
  [key: string]: unknown;
};

interface RawPillowOrder {
  id: number;
  price: number; // Replace 'number' with a more specific type if needed
  address: string | null; // Assuming address is a string, update if it's an object
  lead_time?: string | null;
  user_name: string;
  created_at: string;
  created_by: string;
  order_type: string;
  updated_at: string;
  updated_by?: string | null;
  user_email: string;
  fabric_type: FabricType;
  is_priority: boolean;
  order_number: string;
  order_status: OrderStatus[];
  furniture_size: string; // Replace 'string' with the correct type if known, or import FurnitureSize if defined elsewhere
  furniture_type?: string | null;
  furniture_images: string[]; // Array of image URLs, update type if needed
  user_profileImage: string;
  upholstery_feature: UpholsteryFeature;
}

export interface FormattedPillowOrder {
  customer: string;
  email: string;
  pillowType: string;
  fabric: string;
  status: string;
  date: string;
  orderNumber: string;
}

// Update function signatures with types
export async function getPillowOrders(): Promise<RawPillowOrder[]> {
  const { data, error } = await supabase.rpc("get_pillow_orders");
  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }
  return data as RawPillowOrder[];
}

export function formatPillowOrders(data: RawPillowOrder[]): FormattedPillowOrder[] {
  return data.map((item) => ({
    customer: item.user_name ?? "N/A",
    email: item.user_email ?? "N/A",
    pillowType: item.order_type ?? "pillow",
    fabric: item.fabric_type?.option_name ?? "N/A",
    status: item.order_status?.[0]?.status ?? "Unknown",
    date: new Date(item.created_at).toLocaleDateString(),
    orderNumber: item.order_number ?? "N/A",
  }));
}

export async function getPillowOrderByNumber(orderNumber: string): Promise<RawPillowOrder | null> {
  const { data, error } = await supabase.rpc("get_pillow_orders");

  if (error) {
    console.error("Supabase RPC error:", error.message);
    return null;
  }

  if (!data || !Array.isArray(data)) {
    console.warn("No data returned from get_pillow_orders");
    return null;
  }

  const match = data.find((item: RawPillowOrder) => item.order_number === orderNumber);

  if (!match) {
    console.warn("No order found for order number:", orderNumber);
    return null;
  }

  return match;
}
