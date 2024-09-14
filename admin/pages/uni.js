import Hardcoded from "@/components/mobile/hardcoded.js";
import Dynamic from "@/components/mobile/dynamic.js";

export default function Uni() {
  return (
    <div className="h-screen flex flex-row bg-gray-500">
      <div className="flex-1 bg-green-400">
        <Hardcoded />
      </div>
      <div className=" flex-1 bg-red-400">
        <Dynamic />
      </div>
    </div>
  );
}
