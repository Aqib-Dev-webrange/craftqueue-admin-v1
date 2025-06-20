import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { RawUpholsteryOrder } from "@/types/upholstery";

export function useUpholsteryOrderDetail(orderId: string) {
  const [order, setOrder] = useState<RawUpholsteryOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrderDetail() {
      try {
        setLoading(true);
        setError(null);

        // Get all upholstery orders and find the specific one
        const { data: upholstery_orders, error: fetchError } = await supabase.rpc(
          "get_upholstery_orders"
        );

        if (fetchError) {
          console.error("Error fetching upholstery order:", fetchError);
          setError(fetchError.message);
          return;
        }

        // Find the specific order by ID or order number
        const foundOrder = upholstery_orders?.find(
          (orderData: any) => 
            orderData.id?.toString() === orderId || 
            orderData.order_number === orderId
        );

        if (!foundOrder) {
          setError("Order not found");
          return;
        }

        console.log("Found order:", foundOrder);
        setOrder(foundOrder);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load order details";
        console.error("Failed to load order details:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);

  const updateStatus = async (newStatus: string) => {
    try {
      // Here you would implement the status update logic
      // For now, just update local state
      if (order) {
        const updatedOrder = {
          ...order,
          order_status: order.order_status?.map((status, index) => ({
            ...status,
            is_active: index === 0 ? true : false, // Make first status active for demo
            status: index === 0 ? newStatus : status.status,
          })) || [],
        };
        setOrder(updatedOrder);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      throw error;
    }
  };

  return { order, loading, error, updateStatus };
}