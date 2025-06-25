import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { RawUpholsteryOrder } from "@/types/upholstery";

export function useUpholsteryOrderDetail(orderId: string) {
  const [order, setOrder] = useState<RawUpholsteryOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetail = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: upholstery_orders, error: fetchError } = await supabase.rpc(
        "get_upholstery_orders"
      );

      if (fetchError) {
        console.error("Error fetching upholstery order:", fetchError);
        setError(fetchError.message);
        return;
      }

      const foundOrder = upholstery_orders?.find(
        (orderData: RawUpholsteryOrder) =>
          orderData.id?.toString() === orderId ||
          orderData.order_number === orderId
      );

      if (!foundOrder) {
        setError("Order not found");
        return;
      }

      setOrder(foundOrder);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load order details";
      console.error("Failed to load order details:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) fetchOrderDetail();
  }, [fetchOrderDetail, orderId]);

  const updateStatus = async (newStatus: string) => {
  try {
    if (!order?.id) throw new Error("Invalid order ID");

    const { error } = await supabase
      .from("orders") // or "upholstery_orders" if that's your actual table name
      .update({
        // Assuming order_status is a simple column (string)
        order_status: newStatus
      })
      .eq("id", order.id)
      .select();

    if (error) throw error;

    // Refetch the updated order to keep local state in sync
    await fetchOrderDetail();
  } catch (error) {
    console.error("Failed to update status:", error);
    throw error;
  }
};

  return {
    order,
    loading,
    error,
    updateStatus,
    refetch: fetchOrderDetail, // export refetch too if needed in modals
  };
}
