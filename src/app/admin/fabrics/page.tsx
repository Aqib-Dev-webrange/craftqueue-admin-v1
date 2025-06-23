"use client";
import { useState, useEffect } from "react";
import { TableView, Column } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import AddFabricModal from "./components/addFabrics";
import ActionDropdown from "../components/actionDropdown";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { addFabricOption, deleteFabricOption, FabricFormData, FabricOption, getFabricOptions } from "@/services/fibric";


export default function FabricPage({ show = true }: { show?: boolean }) {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fabrics, setFabrics] = useState<FabricOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch fabrics on component mount
  useEffect(() => {
    fetchFabrics();
  }, []);

  const fetchFabrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFabricOptions();
      setFabrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch fabrics");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFabric = async (fabricData: FabricFormData) => {
    try {
      setSubmitLoading(true);
      const newFabric = await addFabricOption(fabricData);
      if (newFabric) {
        setFabrics(prev => [newFabric, ...prev]);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error adding fabric:", err);
      alert(err instanceof Error ? err.message : "Failed to add fabric");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = async (fabric: FabricOption) => {
    // Implement edit functionality
    console.log("Edit fabric:", fabric);
  };

  const handleDelete = async (fabric: FabricOption) => {
    if (window.confirm(`Are you sure you want to delete "${fabric.option_name}"?`)) {
      try {
        await deleteFabricOption(fabric.id);
        setFabrics(prev => prev.filter(f => f.id !== fabric.id));
      } catch (err) {
        console.error("Error deleting fabric:", err);
        alert(err instanceof Error ? err.message : "Failed to delete fabric");
      }
    }
  };

  // Filter fabrics based on search
  const filteredFabrics = fabrics.filter(fabric =>
    fabric.option_name.toLowerCase().includes(search.toLowerCase()) ||
    fabric.fabric_type.toLowerCase().includes(search.toLowerCase()) ||
    fabric.markup_percentage.toString().includes(search.toLowerCase())
  );

  // Generate search suggestions from actual data
  const searchSuggestions = [
    ...new Set([
      ...fabrics.map(f => f.option_name),
      ...fabrics.map(f => f.fabric_type),
      "Classic Fabrics",
      "Premium Fabrics", 
      "Luxury Fabrics",
      "Cotton Blend",
      "Linen",
      "Velvet",
      "Leather",
      "Silk"
    ])
  ];

  // Define table columns
  const fabricColumns: Column<FabricOption>[] = [
    {
      header: "Fabric Name",
      accessor: "option_name",
    },
    {
      header: "Fabric Type",
      accessor: "fabric_type",
    },
    {
      header: "Markup %",
      accessor: (row) => `${row.markup_percentage}%`,
    },
    {
      header: "Status",
      accessor: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          row.isactive 
            ? 'bg-green-100 text-green-600' 
            : 'bg-red-100 text-red-600'
        }`}>
          {row.isactive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <ActionDropdown
          onEdit={() => handleEdit(row)}
          onClear={() => handleDelete(row)}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-2">
        <LoadingSpinner message="Loading fabric options..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-2">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={fetchFabrics}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-[24px] font-dmSans font-semibold">
          Fabric Management ({fabrics.length})
        </h1>

        {show && (
          <div className="flex w-1/3 items-center gap-2">
          {/* Add Fabric Button */}
          <button
            className="bg-primary text-white py-2 w-1/3 px-3 text-sm font-poppins rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => setIsModalOpen(true)}
            disabled={submitLoading}
          >
            Add Fabrics
          </button>
          
          {/* Search Input */}
          <SearchInput
            placeholder="Search fabrics..."
            value={search}
            onChange={setSearch}
            onSearch={() => {}}
            onClear={() => setSearch("")}
            suggestions={searchSuggestions}
            onSuggestionClick={setSearch}
            size="sm"
            debounceMs={300}
            className="w-80"
          />
        </div>
          )}
        
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl">
        <TableView
          listTitle={`Browse All Fabrics (${filteredFabrics.length})`}
          columns={fabricColumns}
          data={filteredFabrics}
          rowLink={(row) => `/admin/fabrics/${row.id}`}
        />
      </div>

      {/* Add Fabric Modal */}
      <AddFabricModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFabric}
        loading={submitLoading}
      />

      {/* Search Results Info */}
      {search && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filteredFabrics.length} fabric{filteredFabrics.length !== 1 ? 's' : ''} for &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}