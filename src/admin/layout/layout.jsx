import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
const Layout = () => {
    return (
        <>
            <div className="flex overflow-x-hidden mx-auto">
                <Sidebar />

                <div className="flex flex-col w-full min-h-screen ">
                    <Header />
                    <div className="relative  w-full min-h-screen  m-1 p-1  ">
                        <Outlet />
                    </div>
                </div>

            </div >
            
        
            <div className="p-2 inline-flex justify-center items-center w-full overflow-y-hidden">
                <Footer />
            </div>
        </>
    );
};

export default Layout;








