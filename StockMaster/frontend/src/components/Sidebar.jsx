import React from 'react';
import logo from '../assets/stockMaster.png';
import { FaHouse, FaCartShopping } from "react-icons/fa6";
import { MdAddToPhotos ,MdInventory2 } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoStorefront } from "react-icons/io5";
import axios from 'axios';

const Sidebar = () => {
    
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/user/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.removeItem('token'); 
            window.location.href = '/login';
        } catch (error) {
            console.error("Logout error:", error);
            alert("Error logging out. Please try again.");
        }
    };
    
    return (
        <div className='w-full '>
        <aside className="flex flex-col w-full h-screen font-sans bg-white shadow-lg text-cyan-600">
            {/* Logo Section */}
            <a href='/'>
            <div className="flex items-center shadow-inner p- bg-whiterounded-e-lg " >
                <img src={logo} alt="Stock Master Logo" className='w-20' />
                <h1 className="ml-2 text-2xl font-bold text-cyan-600">Stock  Master</h1>
            </div> 
            </a>
            {/* Navigation Menu */}
           
            <nav className="flex-grow p-4 shadow-inner bg-gradient-to-r from-cyan-100 to-cyan-50 rounded-e-lg ">
                <ul>
                    <li className='mt-10'>
                        <a href="/" className="flex items-center p-2 text-xl transition duration-200 rounded-md bg-gradient-to-r hover:from-cyan-200 hover:to-cyan-300">
                            <FaHouse className='text-gray-800 ml-9'/>
                            <span className="ml-4 ">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/inventory" className="flex items-center p-2 text-xl transition duration-200 rounded-md bg-gradient-to-r hover:from-cyan-200 hover:to-cyan-300">
                            <MdInventory2 className='text-gray-800 ml-9'/>
                            <span className="ml-4">Inventory</span>
                        </a>
                    </li>
                    <li>
                        <a href="/stores" className="flex items-center p-2 text-xl transition duration-200 rounded-md bg-gradient-to-r hover:from-cyan-200 hover:to-cyan-300">
                            <IoStorefront className='text-gray-800 ml-9'/>
                            <span className="ml-4">Stores</span>
                        </a>
                    </li>
                    <li>
                        <a href="/orders" className="flex items-center p-2 text-xl transition duration-200 rounded-md bg-gradient-to-r hover:from-cyan-200 hover:to-cyan-300">
                            <FaCartShopping className='text-gray-800 ml-9'/>
                            <span className="ml-4">Orders</span>
                        </a>
                    </li>
                    <li>
                        <a href="/addProduct" className="flex items-center p-2 text-xl transition duration-200 rounded-md bg-gradient-to-r hover:from-cyan-200 hover:to-cyan-300">
                            <MdAddToPhotos className='text-gray-800 ml-9'/>
                            <span className="ml-4">Add Product</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="flex items-center justify-center p-2 text-xl font-bold transition duration-200 rounded cursor-pointer text-cyan-600 hover:bg-cyan-50 hover:text-cyan-800" onClick={handleLogout}>
                <CiLogout className="mr-2" />
                <span>Log Out</span>
            </div>
        </aside>
        </div>
    );
};

export default Sidebar;