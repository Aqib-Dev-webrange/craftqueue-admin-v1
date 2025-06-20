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

export interface FurnitureType {
  display_name?: string;
  name?: string;
}

export interface FabricType {
  option_name?: string;
  fabric_type?: string;
}

export interface Price {
  total?: number;
  base_price?: number;
  rush_fee?: number;
  fabric_markup?: number;
  features_total?: number;
}

export interface Address {
  address?: string;
  addresstype?: string;
}

export interface FurnitureSize {
  width?: number;
  height?: number;
  length?: number;
}

export interface LeadTime {
  lead_time_text?: string;
  lead_time_days?: number;
}

export interface UpholsteryFeature {
  feature_name?: string;
  description?: string;
  additional_cost?: number;
}

export interface RawUpholsteryOrder {
  id?: string;
  order_number?: string;
  created_at?: string;
  is_priority?: boolean;
  order_type?: string;
  furniture_type?: FurnitureType;
  fabric_type?: FabricType;
  order_status?: OrderStatus[];
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