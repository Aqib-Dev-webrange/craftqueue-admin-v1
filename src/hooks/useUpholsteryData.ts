import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { transformUpholsteryData } from "@/utils/dataTransforms";
import type { TransformedUpholsteryOrder, RawUpholsteryOrder } from "@/types/upholstery";

export function useUpholsteryData() {
  const [upholsteryQuotes, setUpholsteryQuotes] = useState<TransformedUpholsteryOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUpholsteryOrders() {
      try {
        setLoading(true);
        setError(null);

        const { data: upholstery_orders, error: fetchError } = await supabase.rpc(
          "get_upholstery_orders"
        );

        if (fetchError) {
          console.error("Error fetching upholstery orders:", fetchError);
          setError(fetchError.message);
          return;
        }

        console.log("Raw upholstery data:", upholstery_orders);

        const transformedData = transformUpholsteryData(upholstery_orders as RawUpholsteryOrder[]);
        
        console.log("Transformed upholstery data:", transformedData);
        setUpholsteryQuotes(transformedData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load upholstery orders";
        console.error("Failed to load upholstery orders:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchUpholsteryOrders();
  }, []);

  return { upholsteryQuotes, loading, error };
}