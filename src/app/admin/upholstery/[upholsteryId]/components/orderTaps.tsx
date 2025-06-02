type TabsProps = {
  current: string;
  onChange: (tab: string) => void;
};

export default function Tabs({ current, onChange }: TabsProps) {
  return (
    <div className="flex gap-8 border-b mb-6">
      {["furniture", "orderTrack"].map((tab) => (
        <button
          key={tab}
          className={`pb-2 font-semibold capitalize ${
            current === tab
              ? "border-b-2 border-[#3a2415] text-black"
              : "text-gray-400"
          }`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
