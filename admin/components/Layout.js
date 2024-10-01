import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

  if (!session) {
    return (
      <div className="bg-customGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            className="bg-white p-2 px-4 rounded-md"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-customGray min-h-screen">
      {/* showNav button */}
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>

      {/* actual nav and page */}
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4 ">{children}</div>
      </div>
    </div>
  );
}
