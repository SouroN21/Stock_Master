import React from 'react';
import logo from '../assets/stockMaster.png';
import { FaHouse, FaCartShopping } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoStorefront } from "react-icons/io5";

const Sidebar = () => {
    return (
        <aside className="flex flex-col w-64 h-screen font-sans bg-white shadow-lg text-cyan-600 ">
            {/* Logo Section */}
            <a href='/'>
            <div className="flex items-center shadow-inner p- bg-whiterounded-e-lg">
                <img src={logo} alt="Stock Master Logo" className='w-20' />
                <h1 className="ml-2 text-2xl font-bold text-cyan-600">Stock  Master</h1>
            </div> 
            </a>
            {/* Navigation Menu */}
           
            <nav className="flex-grow p-4 bg-white shadow-inner rounded-e-lg ">
                <ul>
                    <li className='mt-10'>
                        <a href="/dashboard" className="flex items-center p-2 text-xl transition duration-200 rounded-md hover:bg-cyan-50">
                            <FaHouse className='ml-9'/>
                            <span className="ml-4 ">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/inventory" className="flex items-center p-2 text-xl transition duration-200 rounded-md hover:bg-cyan-50">
                            <MdOutlineInventory2 className='ml-9'/>
                            <span className="ml-4">Inventory</span>
                        </a>
                    </li>
                    <li>
                        <a href="/stores" className="flex items-center p-2 text-xl transition duration-200 rounded-md hover:bg-cyan-50">
                            <IoStorefront className='ml-9'/>
                            <span className="ml-4">Stores</span>
                        </a>
                    </li>
                    <li>
                        <a href="/orders" className="flex items-center p-2 text-xl transition duration-200 rounded-md hover:bg-cyan-50">
                            <FaCartShopping className='ml-9'/>
                            <span className="ml-4">Orders</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="flex items-center justify-center p-2 text-xl font-bold transition duration-200 rounded cursor-pointer text-cyan-500 hover:bg-cyan-50" onClick={() => alert('Logging out...')}>
                <CiLogout className="mr-2" />
                <span>Log Out</span>
            </div>
        </aside>
    );
};

export default Sidebar;