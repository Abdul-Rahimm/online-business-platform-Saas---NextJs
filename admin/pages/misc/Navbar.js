import React, { useState } from "react";

const Navbar = () => {
  const items = ["Home", "About", "Services", "Contact"];
  const subItems = [
    "Artificial Intelliegence",
    "solutions and services",
    "hasan zahid",
    "abdul rahim",
  ];
  const [isClick, setIsClick] = useState(false);

  function mapItems() {
    return items.map((item, index) => (
      <a
        href="/"
        className="text-white block p-2 hover:bg-white hover:text-black rounded-lg"
      >
        {item}
      </a>
    ));
  }

  return (
    <>
      <nav className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex items-center ">
              {/* logo div */}
              <div className="flex-shrink-0 ">
                <a href="/" className="text-white">
                  Logo
                </a>
              </div>
            </div>

            {/* array items being mapped */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                {mapItems()}
              </div>
            </div>
            <div className="md:hidden flex items-center ">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-black
                                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white    "
                onClick={() => setIsClick(!isClick)}
              >
                {!isClick ? (
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
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                ) : (
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isClick && (
          <div className="md:hidden bg-red-300">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{mapItems()}</div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
