import React, { useState, useEffect, useRef } from "react";
import PoloLogo from '@/assets/polo-logo.jpg'
import { FaBars, FaCog, FaUser, FaSignOutAlt, FaTimes } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import { logoutUserAction } from "../../lib/features/userSlice";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user } = useAppSelector((state) => state.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const profileRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
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

    const handleLogout = () => {
        dispatch(logoutUserAction({ navigate }))
    }
    return (
        <div className=" w-full m-1 p-1 ">
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
                            <div
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >

                                {user?.name}
                            </div>
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
                                onClick={() => handleLogout()}
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
        </div>
    );
}