export interface OrderStatus {
  status: string;
  is_active?: boolean;
  date?: string;
  location?: string;
  description?: string;
}

export interface UserMetaData {
  fullName?: string;
  profileImage?: string;
}

export interface CreatedUser {
  id?: string;
  email?: string;
  phone?: string;
  raw_user_meta_data?: UserMetaData;
}

export interface FurnitureType { id?: number; name?: string; display_name?: string }
export interface FabricType { id?: number; fabric_type?: string, option_name?: string }
export interface UpholsteryFeature { id?: number; feature_name?: string }
export interface LeadTime { id?: number; lead_time_text?: string; lead_time_days?: number }
export interface Address { id?: number; address?: string }
export interface FurnitureSize { id?: number; width?: number; height?: number; length?: number }
export interface Price { id?: number; total?: number }
export interface FurnitureImage {
  id?: number;
  image_url?: string;
  created_at?: string;
}

export interface RawUpholsteryOrder {
  id?: string;
  user_name?: string;
  user_email?: string;
  order_number?: string;
  created_at?: string;
  is_priority?: boolean;
  order_type?: string;
  furniture_type?: FurnitureType;
  fabric_type?: FabricType;
   order_status: {
    status: string;
    date: string;
    location: string;
    is_active: boolean;
    description: string | null;
  }[];
  created_user?: CreatedUser;
  price?: Price;
  address?: Address;
  furniture_size?: FurnitureSize;
  lead_time?: LeadTime;
  upholstery_feature?: UpholsteryFeature;
  furniture_images?: string[];
}

export interface TransformedUpholsteryOrder {
  customer: string;
  furniture: string;
  status: string;
  priority: string;
  date: string;
  id: string;
  order_number: string;
}
