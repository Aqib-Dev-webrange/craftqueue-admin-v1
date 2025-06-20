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

interface RawPillowOrder {
  user_name?: string;
  user_email?: string;
  order_type?: string;
  fabric_type?: FabricType | null;
  order_status?: OrderStatus[] | null;
  created_at: string;
  order_number?: string;
}

interface FormattedPillowOrder {
  customer: string;
  email: string;
  pillowType: string;
  fabric: string;
  status: string;
  date: string;
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

export async function getPillowOrderByNumber(orderNumber: string) {
  const { data, error } = await supabase.rpc("get_pillow_orders");

  if (error) {
    console.error("Supabase RPC error:", error.message);
    return null;
  }

  const match: RawPillowOrder | undefined = (data as RawPillowOrder[]).find((item: RawPillowOrder) => item.order_number === orderNumber);

  if (!match) {
    console.warn("No order found for order number:", orderNumber);
    return null;
  }

  return match;
}
