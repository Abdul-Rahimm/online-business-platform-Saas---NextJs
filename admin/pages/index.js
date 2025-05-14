import HomeHeader from "@/components/HomeHeader";
import HomeStats from "@/components/HomeStats";
import Layout from "@/components/Layout";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  return (
    <Layout>
      <HomeHeader />
      <HomeStats />
    </Layout>
  );
}

{
  /* <button
        className="absolute bottom-10 left-30 bg-blue-700 text-white p-2 px-4 rounded-lg"
        onClick={signOut}
      >
        Logout
      </button> */
}
