import Hardcoded from "@/components/mobile/hardcoded.js";
import Dynamic from "@/components/mobile/dynamic.js";
import Learning from "@/components/mobile/learning";

export default function Uni() {
  const topics = [
    "Promise async",
    "Await, sync, async, promise(api call)",
    "Fetch response",
    "Filtering ",
    "Map",
    "Sorting  (Integer , String , array of objects)",
    "State variables",
    "Components creation ",
    "Array of objects",
    "Use effect(scope,uses,flow)",
    "Use effect aur var mein farq",
  ];
  const People = [
    {
      name: "rahim",
      age: 12,
    },
    {
      name: "rahim",
      age: 10,
    },
    {
      name: "rahim",
      age: 15,
    },
    {
      name: "zubair",
      age: 0,
    },
    {
      name: "amanda",
      age: 19,
    },
  ];

  return (
    <div className="h-screen flex flex-row bg-gray-500">
      <div className="flex-1 bg-green-400">
        <Hardcoded topics={topics} />
      </div>

      <div className="flex-1 bg-gray-100">
        <Learning People={People} />
      </div>
    </div>
  );
}
