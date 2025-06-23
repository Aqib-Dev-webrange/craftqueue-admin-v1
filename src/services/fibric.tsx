import { supabase } from '@/lib/supabase';

export interface FabricOption {
  id: number;
  fabric_type: string;
  option_name: string;
  image_url: string;
  markup_percentage: string;
  isactive: boolean;
  created_at: string;
}

export interface FabricFormData {
  fabric_type: string;
  option_name: string;
  image_url: string;
  markup_percentage: number;
  isactive: boolean;
}

// Fetch all fabric options
export const getFabricOptions = async (): Promise<FabricOption[]> => {
  try {
    const { data: fabric_options, error } = await supabase
      .from('fabric_options')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching fabric options:', error);
      return [];
    }
    
    return fabric_options || [];
  } catch (error) {
    console.error('Failed to fetch fabric options:', error);
    return [];
  }
};

// Add new fabric option
export const addFabricOption = async (fabricData: FabricFormData): Promise<FabricOption | null> => {
  try {
    const { data, error } = await supabase
      .from('fabric_options')
      .insert([fabricData])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding fabric option:', error);
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('Failed to add fabric option:', error);
    throw error;
  }
};

// Update fabric option
export const updateFabricOption = async (id: number, updates: Partial<FabricFormData>): Promise<FabricOption | null> => {
  try {
    const { data, error } = await supabase
      .from('fabric_options')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating fabric option:', error);
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('Failed to update fabric option:', error);
    throw error;
  }
};

// Delete fabric option (soft delete by setting isactive to false)
export const deleteFabricOption = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('fabric_options')
      .update({ isactive: false })
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting fabric option:', error);
      throw new Error(error.message);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to delete fabric option:', error);
    throw error;
  }
};


// Add this function to your existing fabricService.ts

export const getFabricOptionById = async (id: number): Promise<FabricOption | null> => {
  try {
    const { data, error } = await supabase
      .from('fabric_options')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching fabric option:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch fabric option:', error);
    return null;
  }
};