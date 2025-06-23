import FabricPage from "./components/FabricsTable";


export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <FabricPage show={true} />
    </div>
  );
}