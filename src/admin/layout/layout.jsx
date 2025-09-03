import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import PoloLogo from '@/assets/polo-logo.jpg'
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import the 'bars' icon
import { FaBars, FaCog, FaUser, FaSignOutAlt, FaTimes, FaFastBackward } from 'react-icons/fa';
import { FaHome, FaChartBar, FaFileAlt, FaQuestionCircle, FaPlus } from 'react-icons/fa';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DynamicIcon from '@/components/DynamicIcon';
const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);
    const profileRef = useRef(null);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);



    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) &&
                !event.target.closest('button')) {
                setIsSidebarOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle dropdown
    const toggleDropdown = (index) => {
        console.log("ia m clicked")
        setOpenDropdown(openDropdown === index ? null : index);
    };

    // Handle menu item clicks
    const handleMenuItemClick = (action) => {
        console.log(`${action} clicked`);
        setIsDropdownOpen(false);
        // Add your navigation logic here
    };


    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const toggleProfileDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };


    const menuItems = [
        { icon: 'FaHome', label: 'Home', redirect: '#' },
        { icon: 'FaUser', label: 'Profile', redirect: '#' },
        { icon: 'FaChartBar', label: 'Chart', redirect: '#' },
        { icon: 'FaFileAlt', label: 'Documents', redirect: '#' },
        { icon: 'FaCog', label: 'Setting', redirect: '#' },
    ];


    return (
        <>
            <div className="flex">
                <div className={`hidden md:block min-h-screen  m-1 p-1
                bg-gradient-to-b from-red-500 to-yellow-500 relative
                
                 ${isSidebarCollapsed ? 'w-16' : 'w-2/12'} duration-300`}
                >
                    {/* Sidebar Content with Flex Container */}
                    <div className="flex flex-col h-full relative">
                        {/* <div
                        id="sidebar"
                        className={`flex flex-col  fixed top-0 left-0 h-full bg-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out sidebar-transition 
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                             ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
                        style={{ width: isSidebarCollapsed ? '4rem' : '16rem' }}
                    > */}


                        {/* Navigation Links */}
                        <div className="flex justify-center items-center  mx-auto  p-4">
                            <img
                                src={PoloLogo}
                                alt="Profile"
                                className={`
                                    ${isSidebarCollapsed ? "w-15 h-10 " : " w-15 h-15 mb-4 "}
                                    
                                    rounded object-top border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200 cursor-pointer`}
                            />
                        </div>
                        <nav className="flex-grow ">
                            <ul className="space-y-2">

                                {menuItems?.length > 0 ? (
                                    menuItems.map((menu, index) => {
                                        return (<li className="flex p-2" key={index}>
                                            <a href="#" title={menu.label} className="float-left text-gray-700 hover:bg-green-100 rounded-md mt-2 p-2 ">
                                                <span className={`text-2xl block float-left `}>
                                                    <DynamicIcon name={menu.icon} library={'fa'}
                                                        className={`text-green-900 rounded-full duration-300
                                               ${isSidebarCollapsed && "rotate-[360deg]"}
                                            `} />
                                                </span>
                                                <span className={`ml-3 text-xl text-green-700 origin-left font-medium flex-1 duration-300
                                        ${isSidebarCollapsed && "hidden scale-0"}
                                        `}> {menu.label}</span>
                                            </a>
                                        </li>)
                                    })) : ''}
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

                                {/* 
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <FaUser className="mr-3 text-gray-500" />
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <FaChartBar className="mr-3 text-gray-500" />
                                        Chart
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <FaFileAlt className="mr-3 text-gray-500" />
                                        Documents
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <FaCog className="mr-3 text-gray-500" />
                                        Setting
                                    </a>
                                </li> */}
                                {/* More navigation items... */}
                            </ul>
                        </nav>

                        {/* Button at the Bottom */}
                        <div className="p-4 ">
                            <button
                                onClick={toggleSidebarCollapse}
                                className="w-3/4 text-xl  text-green-900 font-medium py-2 px-2 rounded-lg transition-colors duration-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={isSidebarCollapsed ? faArrowRight : faArrowLeft} />
                            </button>
                        </div>
                    </div>
                    {/* </div>

                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div> */}
                </div>
                <div className="min-h-screen w-full md:w-5/6  m-1 p-1 ">
                    <header className=" bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
                        {/* Hamburger Menu Button (Left) */}
                        <button
                            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                            onClick={toggleSidebar}
                        >
                            <FaBars className="text-xl" />
                        </button>

                        {/* Logo/Title - Hidden on mobile, visible on medium screens and larger */}
                        <div className="hidden md:block">
                            <h1 className="text-xl font-bold">App Name</h1>
                        </div>


                        {/* Profile Dropdown Container (Right) */}
                        <div className="relative" ref={profileRef}>
                            {/* Circular Profile Image */}
                            <img
                                onClick={toggleProfileDropdown}
                                src={PoloLogo}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200 cursor-pointer"
                            />

                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                    {/* Dropdown Arrow */}
                                    <div className="absolute top-0 right-5 -mt-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>

                                    {/* Menu Items */}
                                    <button
                                        onClick={() => handleMenuItemClick('Settings')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaCog className="mr-3 text-gray-500" />
                                        Settings
                                    </button>
                                    <button
                                        onClick={() => handleMenuItemClick('Profile')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaUser className="mr-3 text-gray-500" />
                                        Profile
                                    </button>
                                    <hr className="my-1" />
                                    <button
                                        onClick={() => handleMenuItemClick('Logout')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaSignOutAlt className="mr-3 text-gray-500" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Sidebar Overlay - Hidden on medium screens and larger */}
                    {isSidebarOpen && (
                        <div
                            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
                            onClick={() => setIsSidebarOpen(false)}
                        ></div>
                    )}

                    <div
                        ref={sidebarRef}
                        className={`md:hidden fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                    >
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Menu</h2>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                        </div>

                        <nav className="p-4">
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <span className="mr-3">🏠</span>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <span className="mr-3">👤</span>
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <span className="mr-3">📊</span>
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <span className="mr-3">📝</span>
                                        Documents
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <span className="mr-3">⚙️</span>
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <span className="mr-3">❓</span>
                                        Help & Support
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>


                    {/* Desktop Navigation - Hidden on mobile, visible on medium screens and larger */}
                    <nav className="hidden md:block bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <span className="font-semibold">App Name</span>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                        <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Home
                                        </a>
                                        <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Dashboard
                                        </a>
                                        <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Documents
                                        </a>
                                        <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Settings
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>


                    {/* Main page content */}

                    <main className="p-4">
                        <h1 className="text-2xl font-bold mb-4">Mobile Header Demo</h1>
                        <p className="text-gray-700">This header features a hamburger menu icon on the left and a circular profile image on the right. It's optimized for mobile devices using Tailwind CSS.</p>

                        <div className="mt-6 bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Features:</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Responsive design for mobile screens</li>
                                <li>Interactive hover effects</li>
                                <li>Focus states for accessibility</li>
                                <li>Sticky positioning</li>
                                <li>Circular profile image with border</li>
                            </ul>
                        </div>
                    </main>

                </div>
            </div >
        </>
    );
};

export default Layout;








