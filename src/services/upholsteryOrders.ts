import { createClient } from '@supabase/supabase-js';

// Make sure you have your Supabase client properly configured
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface UpdateOrderData {
  is_priority?: boolean;
  order_status?: Array<{
    date: string;
    status: string;
    location: string;
    is_active: boolean;
    description: string | null;
  }>;
  furniture_images?: string[];
}

export async function updateUpholsteryOrder(orderId: string, updateData: UpdateOrderData) {
  try {
    console.log('Updating order:', orderId, updateData);
    
    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to update order: ${error.message}`);
    }

    console.log('Update successful:', data);
    return data?.[0] || null;
  } catch (error) {
    console.error('Error in updateUpholsteryOrder:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, newStatus: string, location?: string, description?: string) {
  try {
    console.log('Updating order status:', { orderId, newStatus, location, description });
    
    // First get the current order to access existing order_status
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('order_status')
      .eq('id', orderId)
      .single();

    if (fetchError) {
      console.error('Error fetching current order:', fetchError);
      throw fetchError;
    }

    console.log('Current order:', currentOrder);

    // Create new status entry
    const newStatusEntry = {
      date: new Date().toISOString(),
      status: newStatus.toLowerCase(),
      location: location || "Admin Update",
      is_active: true,
      description: description || `Status updated to ${newStatus}`
    };

    // Add to existing status array
    const updatedOrderStatus = [...(currentOrder.order_status || []), newStatusEntry];

    console.log('New status array:', updatedOrderStatus);

    const { data, error } = await supabase
      .from('orders')
      .update({ order_status: updatedOrderStatus })
      .eq('id', orderId)
      .select();

    if (error) {
      console.error('Error updating status:', error);
      throw error;
    }

    console.log('Status update successful:', data);
    return data?.[0];
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    throw error;
  }
}