import { supabase } from '@/lib/supabase'

export interface PillowOrder {
  id: number
  order_number: string
  user_name: string
  user_email: string
  order_type: string
  is_priority: boolean
  created_at: string
  price: {
    total: number
    base_price: number
    rush_fee: number
    fabric_markup: number
    features_total: number
    priority_charges: number
  }
  fabric_type: {
    fabric_type: string
    option_name: string
    markup_percentage: number
    image_url: string
  }
  upholstery_feature: {
    feature_name: string
    description: string
    additional_cost: number
  }
  order_status: Array<{
    status: string
    date: string
    location: string
    description?: string
    is_active: boolean
  }>
  address: {
    address: string
    addresstype: string
    latlng: string
  }
  furniture_size: {
    width: number
    height: number
    length: number
    size_name?: string
  }
}

export const fetchPillowOrders = async (): Promise<PillowOrder[]> => {
  try {
    const { data, error } = await supabase.rpc('get_pillow_orders')
    
    if (error) {
      console.error('Error fetching pillow orders:', error)
      throw new Error(error.message)
    }
    
    return data || []
  } catch (error) {
    console.error('Failed to fetch pillow orders:', error)
    throw error
  }
}