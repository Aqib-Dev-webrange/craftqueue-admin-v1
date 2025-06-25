"use client";
import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { RawUpholsteryOrder } from "@/types/upholstery";
import { supabase } from "@/lib/supabase";

interface EditUpholsteryOrderProps {
  isOpen: boolean;
  onClose: () => void;
  order: RawUpholsteryOrder;
  onSave: (updatedOrder: RawUpholsteryOrder) => Promise<void>;
}

export default function EditUpholsteryOrder({
  isOpen,
  onClose,
  order,
  onSave
}: EditUpholsteryOrderProps) {
  // Fetch dropdown options from backend
  interface FurnitureType {
    id: number;
    display_name: string;
    furniture_type?: string;
    // Add more fields as needed, for example:
    // description?: string;
    // isactive?: boolean;
  }
  const [furnitureTypes, setFurnitureTypes] = useState<FurnitureType[]>([]);
  interface FabricOption {
    id: number;
    option_name: string;
    // Add more fields as needed, for example:
    // isactive?: boolean;
  }
  const [fabricOptions, setFabricOptions] = useState<FabricOption[]>([]);
  interface UpholsteryFeature {
    id: number;
    feature_name: string;
    // Add more fields as needed, for example:
    // description?: string;
    // additional_cost?: number;
    // isactive?: boolean;
  }
  const [upholsteryFeatures, setUpholsteryFeatures] = useState<UpholsteryFeature[]>([]);

  const [formData, setFormData] = useState({
    order_number: "",
    is_priority: false,
    furniture_type: "",
    fabric_type: "",
    upholstery_feature: "",
    lead_time_days: 0,
    lead_time_text: "",
    length: 0,
    width: 0,
    height: 0,
    total: 0,
    furniture_images: [] as string[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDropdowns() {
      const { data: furniture_types } = await supabase
        .from('furniture_types')
        .select('*');
      setFurnitureTypes(furniture_types || []);

      const { data: fabric_options } = await supabase
        .from('fabric_options')
        .select('*');
      setFabricOptions(fabric_options || []);

      const { data: upholstery_features } = await supabase
        .from('upholstery_features')
        .select('*');
      setUpholsteryFeatures(upholstery_features || []);
    }
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (order && isOpen) {
      setFormData({
        order_number: order.order_number || "",
        is_priority: order.is_priority || false,
        furniture_type: order.furniture_type?.display_name || "",
        fabric_type: order.fabric_type?.fabric_type || "",
        upholstery_feature: order.upholstery_feature?.feature_name || "",
        lead_time_days: order.lead_time?.lead_time_days || 0,
        lead_time_text: order.lead_time?.lead_time_text || "",
        length: order.furniture_size?.length || 0,
        width: order.furniture_size?.width || 0,
        height: order.furniture_size?.height || 0,
        total: 0,
        furniture_images: order.furniture_images || [],
      });
      setErrors({});
    }
  }, [order, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.furniture_type.trim())
      newErrors.furniture_type = "Furniture type is required";
    if (!formData.fabric_type.trim())
      newErrors.fabric_type = "Fabric type is required";
    if (formData.total < 0)
      newErrors.total = "Total amount cannot be negative";
    if (formData.lead_time_days < 0)
      newErrors.lead_time_days = "Lead time cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSaveClick = async () => {
  if (!validateForm()) return;
  setIsLoading(true);

  try {
    // 1. Update furniture size dimensions
    if (order.furniture_size?.id) {
      const { error: sizeError } = await supabase
        .from("user_furniture_size")
        .update({
          length: formData.length,
          width: formData.width,
          height: formData.height,
        })
        .eq("id", order.furniture_size.id);
      if (sizeError) throw sizeError;
    }

    // 2. Lookup or insert related furniture_type
    let furnitureTypeId = order.furniture_type?.id;
    const { data: furnitureTypeData } = await supabase
      .from("furniture_types")
      .select("id")
      .eq("display_name", formData.furniture_type)
      .limit(1)
      .single();

    if (furnitureTypeData) {
      furnitureTypeId = furnitureTypeData.id;
    } else {
      const { data: newFurnitureType, error: insertFurnitureTypeError } = await supabase
        .from("furniture_types")
        .insert({
          name: formData.furniture_type.toLowerCase(),
          display_name: formData.furniture_type,
          isactive: true,
        })
        .select("id")
        .single();
      if (insertFurnitureTypeError) throw insertFurnitureTypeError;
      furnitureTypeId = newFurnitureType.id;
    }

    // 3. Lookup or insert upholstery_feature
    let upholsteryFeatureId = order.upholstery_feature?.id;
    const { data: featureData } = await supabase
      .from("upholstery_features")
      .select("id")
      .eq("feature_name", formData.upholstery_feature)
      .limit(1)
      .single();

    if (featureData) {
      upholsteryFeatureId = featureData.id;
    } else {
      const { data: newFeature, error: insertFeatureError } = await supabase
        .from("upholstery_features")
        .insert({
          feature_name: formData.upholstery_feature,
          description: "",
          additional_cost: 0,
          isactive: true,
        })
        .select("id")
        .single();
      if (insertFeatureError) throw insertFeatureError;
      upholsteryFeatureId = newFeature.id;
    }

    // 4. Lookup or insert fabric_type (using fabric_options)
    let fabricTypeId = order.fabric_type?.id;
    const { data: fabricData } = await supabase
      .from("fabric_options")
      .select("id")
      .eq("option_name", formData.fabric_type)
      .limit(1)
      .single();

    if (fabricData) {
      fabricTypeId = fabricData.id;
    } else {
      // If not found, insert a new fabric option
      const { data: newFabricOption, error: insertFabricError } = await supabase
        .from("fabric_options")
        .insert({
          fabric_type: "Custom", // or another default/group name
          option_name: formData.fabric_type,
          image_url: "", // or provide a default image
          markup_percentage: 0,
          isactive: true,
          created_at: new Date().toISOString(),
        })
        .select("id")
        .single();
      if (insertFabricError) throw insertFabricError;
      fabricTypeId = newFabricOption.id;
    }


    // 4. Lookup or insert lead_time
    let leadTimeId = order.lead_time?.id;
    const { data: leadData } = await supabase
      .from("lead_times")
      .select("id")
      .eq("lead_time_text", formData.lead_time_text)
      .limit(1)
      .single();

    if (leadData) {
      leadTimeId = leadData.id;
    } else {
      const { data: newLeadTime, error: insertLeadError } = await supabase
        .from("lead_times")
        .insert({
          furniture_type_id: furnitureTypeId,
          lead_time_text: formData.lead_time_text,
          lead_time_days: formData.lead_time_days,
          isactive: true,
        })
        .select("id")
        .single();
      if (insertLeadError) throw insertLeadError;
      leadTimeId = newLeadTime.id;
    }


    // 5. Finally, update the order
    const { error: updateOrderError } = await supabase
      .from("orders")
      .update({
        is_priority: formData.is_priority,
        furniture_images: formData.furniture_images,
        price_id: order.price?.id,
        furniture_size_id: order.furniture_size?.id,
        furniture_type_id: furnitureTypeId,
        fabric_type_id: fabricTypeId,
        upholstery_feature_id: upholsteryFeatureId,
        lead_time_id: leadTimeId,
        updated_at: new Date().toISOString(),
      })
      .eq("order_number", formData.order_number);

    if (updateOrderError) throw updateOrderError;
    await onSave({
      ...order,
      is_priority: formData.is_priority,
      furniture_type: {
        ...order.furniture_type,
        display_name: formData.furniture_type,
      },
      fabric_type: {
        ...order.fabric_type,
        fabric_type: formData.fabric_type,
      },
      upholstery_feature: {
        ...order.upholstery_feature,
        feature_name: formData.upholstery_feature,
      },
      lead_time: {
        ...order.lead_time,
        lead_time_days: formData.lead_time_days,
        lead_time_text: formData.lead_time_text,
      },
      furniture_size: {
        ...order.furniture_size,
        length: formData.length,
        width: formData.width,
        height: formData.height,
      },
      price: {
        ...order.price,
        total: formData.total,
      },
    });
    alert("Order updated successfully!");
    onClose();
  } catch (err) {
    console.error("Save failed:", err);
    alert("Something went wrong while saving.");
  } finally {
    setIsLoading(false);
  }
};


  const handleChange = (
    field: string,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex font-poppins items-center justify-center">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h2 className="text-xl">Edit Upholstery Order</h2>
          <button onClick={onClose} disabled={isLoading}>
            <X />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label>Furniture Type</label>
            <select
              value={formData.furniture_type}
              onChange={(e) =>
                handleChange("furniture_type", e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Select type</option>
              {furnitureTypes.map((f) => (
                <option key={f.id} value={f.display_name}>{f.display_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Fabric Type</label>
            <select
              value={formData.fabric_type}
              onChange={(e) =>
                handleChange("fabric_type", e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Select fabric</option>
              {fabricOptions.map((f) => (
                <option key={f.id} value={f.option_name}>{f.option_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Upholstery Feature</label>
            <select
              value={formData.upholstery_feature}
              onChange={(e) =>
                handleChange("upholstery_feature", e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Select feature</option>
              {upholsteryFeatures.map((f) => (
                <option key={f.id} value={f.feature_name}>{f.feature_name}</option>
              ))}
            </select>
          </div>

          <div className="mt-2">
            <label>
              <input
                type="checkbox"
                checked={formData.is_priority}
                onChange={(e) =>
                  handleChange("is_priority", e.target.checked)
                }
              />{" "}
              Priority Quote
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label>Length</label>
            <input
              type="number"
              value={formData.length}
              onChange={(e) =>
                handleChange("length", Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Width</label>
            <input
              type="number"
              value={formData.width}
              onChange={(e) =>
                handleChange("width", Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Height</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) =>
                handleChange("height", Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label>Lead Time (Days)</label>
            <input
              type="number"
              value={formData.lead_time_days}
              onChange={(e) =>
                handleChange("lead_time_days", Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Lead Time Text</label>
            <input
              type="text"
              value={formData.lead_time_text}
              onChange={(e) =>
                handleChange("lead_time_text", e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Total Price</label>
            <input
              type="number"
              value={formData.total}
              onChange={(e) =>
                handleChange("total", Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
