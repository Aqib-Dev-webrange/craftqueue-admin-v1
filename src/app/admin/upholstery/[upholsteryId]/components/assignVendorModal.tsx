export default function VendorModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl px-8 py-4 min-w-[340px] shadow-lg relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold">Assign Vendor to Order</h1>
          <button
            className="text-2xl text-gray-400 hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <select className="border rounded w-full px-3 py-2 mb-4">
          <option>No Vendor</option>
          <option>Vendor 1</option>
          <option>Vendor 2</option>
        </select>
        <button
          className="bg-[#3a2415] text-white px-5 py-2 rounded-full font-semibold w-full"
          onClick={onClose}
        >
          Assign
        </button>
      </div>
    </div>
  );
}
