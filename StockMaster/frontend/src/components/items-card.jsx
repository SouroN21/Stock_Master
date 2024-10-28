import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBox, FaShoppingCart, FaWarehouse } from "react-icons/fa";

const ItemsCard = ({ totalItems, totalValue, cartItems, outOfStockItems }) => {
    return (
        <div className="flex gap-5 p-4 bg">
            {/* Products Card */}
            <div className="flex items-center justify-center p-6 text-white transition duration-200 ease-in-out rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-500">
                <AiOutlineProduct className="mb-2 text-3xl" />
                <p className="text-lg font-semibold">NO Products</p>
                <p className="text-2xl font-bold">{totalItems}</p>
            </div>
            
            {/* Orders Card */}
            <div className="flex items-center justify-center p-6 text-white transition duration-200 ease-in-out rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-500">
                <FaBox className="mb-2 text-3xl" />
                <p className="text-lg font-semibold">Value</p>
                <p className="text-2xl font-bold">${totalValue}</p>
            </div>

            {/* Cart Card */}
            <div className="flex items-center justify-center p-6 text-white transition duration-200 ease-in-out rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-500">
                <FaShoppingCart className="mb-2 text-3xl" />
                <p className="text-lg font-semibold">Cart</p>
                <p className="text-2xl font-bold">{cartItems}</p>
            </div>

            {/* Warehouse Card */}
            <div className="flex items-center justify-center p-6 text-white transition duration-200 ease-in-out rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-500">
                <FaWarehouse className="mb-2 text-3xl" />
                <p className="text-lg font-semibold">Out Of Stock</p>
                <p className="text-2xl font-bold">{outOfStockItems}</p>
            </div>
        </div>
    );
};

export default ItemsCard;
