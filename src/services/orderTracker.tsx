import { supabase } from '@/lib/supabase';

export interface PillowOrderTracker {
  id: number;
  user_name: string | null;
  user_email: string | null;
  order_number: string;
  order_type: string;
  is_priority: boolean;
  created_at: string;
  price: {
    total: number;
    base_price: number;
    fabric_markup: number;
    features_total: number;
  };
  fabric_type: {
    option_name: string;
    fabric_type: string;
    markup_percentage: number;
  };
  upholstery_feature: {
    feature_name: string;
    description: string;
    additional_cost: number;
  };
  order_status: Array<{
    status: string;
    date: string;
    location: string;
    is_active: boolean;
  }>;
  address: {
    address: string;
    addresstype: string;
  };
}

export const getPillowOrdersForTracker = async (): Promise<PillowOrderTracker[]> => {
  try {
    const { data, error } = await supabase.rpc('get_pillow_orders');
    
    if (error) {
      console.error('Error fetching pillow orders:', error);
      return [];
    }
    
    // The response has nested structure, so we need to extract the actual order data
    return (data || []).map((item: { get_pillow_orders?: PillowOrderTracker } | PillowOrderTracker) =>
      (item as { get_pillow_orders?: PillowOrderTracker }).get_pillow_orders || (item as PillowOrderTracker)
    );
  } catch (error) {
    console.error('Failed to fetch pillow orders:', error);
    return [];
  }
};

export const getPillowOrderByNumber = async (orderNumber: string): Promise<PillowOrderTracker | null> => {
  try {
    const { data, error } = await supabase.rpc('get_pillow_orders');
    
    if (error) {
      console.error('Error fetching pillow orders:', error);
      return null;
    }
    
    // Find the specific order by order number
    const orders = (data || []).map(
      (item: { get_pillow_orders?: PillowOrderTracker } | PillowOrderTracker) =>
        (item as { get_pillow_orders?: PillowOrderTracker }).get_pillow_orders || (item as PillowOrderTracker)
    );
    const order = orders.find((order: PillowOrderTracker) => order.order_number === orderNumber);
    
    return order || null;
  } catch (error) {
    console.error('Failed to fetch pillow order:', error);
    return null;
  }
};

export type Step = {
  id: number;
  title: string;
  date?: string;
  is_active?: boolean;
  location?: string;
  description?: string;
};

export const transformOrderToSteps = (order: PillowOrderTracker): Step[] => {
  const baseSteps = [
    { id: 1, title: "Quote Submitted", is_active: true },
    { id: 2, title: "Fabric Confirmed", is_active: false },
    { id: 3, title: "Fabric Received", is_active: false },
    { id: 4, title: "In Production", is_active: false },
    { id: 5, title: "Quality Check", is_active: false },
    { id: 6, title: "Ready for Delivery", is_active: false },
    { id: 7, title: "Delivered", is_active: false },
  ];

  // Get the current status from order
  const currentStatus = order.order_status?.[0]?.status?.toLowerCase() || 'pending';
  const currentDate = order.order_status?.[0]?.date || order.created_at;
  const currentLocation = order.order_status?.[0]?.location || order.address?.address || '';

  // Map status to step progression
  const statusToStepMap: { [key: string]: number } = {
    'pending': 1,
    'confirmed': 2,
    'fabric_received': 3,
    'in_production': 4,
    'processing': 4,
    'quality_check': 5,
    'ready': 6,
    'delivered': 7,
    'completed': 7
  };

  const currentStepIndex = statusToStepMap[currentStatus] || 1;

  return baseSteps.map((step, index) => ({
    ...step,
    status: index < currentStepIndex ? 'completed' as const :
            index === currentStepIndex - 1 ? 'current' as const : 'pending' as const,
    date: index <= currentStepIndex - 1 ? new Date(currentDate).toLocaleDateString() : undefined,
    location: index <= currentStepIndex - 1 ? currentLocation : undefined
  }));
};


