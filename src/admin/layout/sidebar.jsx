import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PoloLogo from '@/assets/polo-logo.jpg'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DynamicIcon from '@/components/DynamicIcon';
import { useAppDispatch } from "../../lib/hooks/hooks";
import { logoutUserAction } from "../../lib/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { LogOut } from "lucide-react";


export default function Sidebar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                // setIsDropdownOpen(false);
            }
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) &&
                !event.target.closest('button')) {
                setIsSidebarOpen(false);
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


    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleLogout = () => {
        dispatch(logoutUserAction({ navigate }))
    }

    const menuItems = [
        { icon: 'FaHome', label: 'Home', redirect: '/dashboard', submenu: false },
        { icon: 'FaUser', label: 'Profile', redirect: '#' },
        { icon: 'FaUser', label: 'Client', redirect: '/client/add' },
        { icon: 'FaChartBar', label: 'Chart', redirect: '#' },
        { icon: 'FaFileAlt', label: 'Documents', redirect: '#' },
        { icon: 'FaCog', label: 'Setting', redirect: '#' },
    ];



    return (
        <div className={`hidden md:block min-h-screen  m-1 p-1
                bg-gradient-to-b from-red-500 from-20% via-green-500 via-40% to-yellow-500 relative
                
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
                                return (<li className="flex p-1 hover:bg-green-100" key={index}>
                                    <Link to={menu.redirect} title={menu.label} className="float-left text-gray-700  rounded-md mt-2 p-2 ">
                                        <span className={`text-2xl block float-left `}>
                                            <DynamicIcon name={menu.icon} library={'fa'}
                                                className={`text-green-900 rounded-full duration-500
                                               ${isSidebarCollapsed && "rotate-[360deg]"}
                                            `} />
                                        </span>
                                        <span className={`ml-3 text-xl text-green-700 origin-left font-medium flex-1 duration-300
                                        ${isSidebarCollapsed && "hidden scale-0"}
                                        `}> {menu.label}</span>
                                    </Link>
                                </li>)
                            })) : ''}
                        <li className="flex flex-col p-2 relative">
                            <button
                                onClick={() => toggleDropdown(2)}
                                className="flex float-left text-gray-700 hover:bg-green-100 rounded-md mt-2 ml-1"
                            >
                                <span className={`text-2xl block float-left `}>
                                    <DynamicIcon name={'FaFileAlt'} library={'fa'}
                                        className={`text-green-900 rounded-full duration-300
                                               ${isSidebarCollapsed && "rotate-[360deg]"}
                                            `} />
                                </span>
                                <span className={`ml-3 text-left text-xl text-green-700 origin-left font-medium flex-1 duration-300
                                        ${isSidebarCollapsed && "hidden scale-0"}
                                        `}> Projects</span>

                                <DynamicIcon name={'FaAngleRight'} library={'fa'}
                                    className={`ml-1 mt-1 text-xl text-green-900 duration-300
                                                 ${openDropdown === 2 && "rotate-[90deg]"}
                                                `}
                                />

                            </button>
                            {openDropdown === 2 && (
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out  mt-2
                                            ${openDropdown === 2 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <ul className={`pl-10 py-2 space-y-2 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-md   `}>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-2 py-1 text-sm hover:bg-gray-200 rounded"
                                            >
                                                <span className={`text-2xl block float-left `}>
                                                    <DynamicIcon name={'FaFileAlt'} library={'fa'}
                                                        className={`text-white rounded-full duration-300
                                                                ${isSidebarCollapsed && "rotate-[360deg]"}`} />
                                                </span>
                                                <span className={`ml-3 text-left text-xl text-white origin-left font-medium flex-1 duration-300
                                                             ${isSidebarCollapsed && "hidden scale-0"}
                                                            `}> Projects</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-2 py-1 text-sm hover:bg-gray-200 rounded"
                                            >
                                                <span className={`text-2xl block float-left `}>
                                                    <DynamicIcon name={'FaFileAlt'} library={'fa'}
                                                        className={`text-white rounded-full duration-300
                                               ${isSidebarCollapsed && "rotate-[360deg]"}
                                            `} />
                                                </span>
                                                <span className={`ml-3 text-left text-xl text-white origin-left font-medium flex-1 duration-300
                                        ${isSidebarCollapsed && "hidden scale-0"}
                                        `}> Projects</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="flex p-1 hover:bg-green-100" >
                            <button onClick={() => handleLogout()} title={'LogOut'} className="float-left text-gray-700  rounded-md mt-2 p-2 ">
                                <span className={`text-2xl block float-left `}>
                                    <FaSignOutAlt className={`text-green-900 rounded-full duration-500
                                               ${isSidebarCollapsed && "rotate-[360deg]"}`} />
                                </span>
                                <span className={`ml-3 text-xl text-green-700 origin-left font-medium flex-1 duration-300
                                        ${isSidebarCollapsed && "hidden scale-0"}
                                        `}> {'Logout'}</span>
                            </button>
                        </li>
                        <li className="p-4 mt-4">
                            <button
                                onClick={toggleSidebarCollapse}
                                className="w-3/4 text-xl  text-green-900 font-medium py-2 px-2 rounded-lg transition-colors duration-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={isSidebarCollapsed ? faArrowRight : faArrowLeft} />
                            </button>
                        </li>

                    </ul>
                </nav>

                {/* Button at the Bottom */}
                {/* <div className="p-1 "> */}
                {/* <button
                        onClick={toggleSidebarCollapse}
                        className="w-3/4 text-xl  text-green-900 font-medium py-2 px-2 rounded-lg transition-colors duration-200 flex items-center justify-center">
                        <FontAwesomeIcon icon={isSidebarCollapsed ? faArrowRight : faArrowLeft} />
                    </button>
                </div> */}
            </div>
        </div>
    )
}