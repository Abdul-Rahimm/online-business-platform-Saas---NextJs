import Layout from "@/components/Layout";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  // console.log("user image : ", session?.user?.image);

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2 className="">
          Hello, <b>{session?.user?.name}</b>
        </h2>

        <div className="flex gap-1 bg-gray-300 text-black rounded-lg overflow-hidden">
          <img
            src={session?.user?.image}
            alt="User Image"
            className="w-6 h-6 "
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>

      <button
        className="absolute bottom-10 left-30 bg-blue-700 text-white p-2 px-4 rounded-lg"
        onClick={signOut}
      >
        Logout
      </button>
    </Layout>
  );
}
