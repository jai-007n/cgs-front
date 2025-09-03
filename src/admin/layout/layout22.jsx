import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100 overflow-hidden m-0 p-0">
      {/* Sidebar */}
      {sidebarOpen ? (
        <aside className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col justify-between">
          {/* Logo */}
          <div className="p-4 flex justify-center">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
              L
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              <li>
                <button
                  onClick={() => toggleDropdown(1)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Menu 1
                </button>
                {openDropdown === 1 && (
                  <ul className="pl-6 py-2 space-y-1">
                    <li>
                      <a
                        href="#"
                        className="block px-2 py-1 text-sm hover:bg-gray-200 rounded"
                      >
                        Subitem 1
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-2 py-1 text-sm hover:bg-gray-200 rounded"
                      >
                        Subitem 2
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button
                  onClick={() => toggleDropdown(2)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Menu 2
                </button>
                {openDropdown === 2 && (
                  <ul className="pl-6 py-2 space-y-1">
                    <li>
                      <a
                        href="#"
                        className="block px-2 py-1 text-sm hover:bg-gray-200 rounded"
                      >
                        Option A
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-2 py-1 text-sm hover:bg-gray-200 rounded"
                      >
                        Option B
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Collapse Button */}
          <div className="p-4 border-t flex justify-end">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-3xl text-gray-600 hover:text-black"
              title="Hide Sidebar"
            >
              &laquo;
            </button>
          </div>
        </aside>
      ) : (
        <aside className="w-20 bg-white shadow-md border-r border-gray-200 flex flex-col items-center justify-between">
          {/* Logo Only */}
          <div className="p-4">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
              L
            </div>
          </div>

          {/* Expand Button */}
          <div className="p-4 mt-auto">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-3xl text-gray-600 hover:text-black"
              title="Show Sidebar"
            >
              &raquo;
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className="fixed top-0 right-0 bg-gray-800 text-white p-4 flex items-center z-50 shadow-md"
          style={{
            left: "16rem", // width of your sidebar
            width: "calc(100% - 16rem)",
          }}
        >
          {/* Left header content */}
          <div className="flex-grow">
            <h1 className="text-lg font-semibold">My Application</h1>
          </div>

          {/* Profile section */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isOpen}
              aria-label="Toggle profile menu"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg overflow-hidden z-50">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Profile Settings
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
