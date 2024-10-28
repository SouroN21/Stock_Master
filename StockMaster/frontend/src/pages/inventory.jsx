import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import ItemsCard from '../components/items-card';
import axios from "axios";

const Inventory = () => {
    const { userProfile } = useContext(UserContext);
    const [storeId, setStoreId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    // Set the storeId based on the user profile
    useEffect(() => {
        if (userProfile) {
            setStoreId(userProfile._id);
            console.log("User ID:", userProfile._id);
        }
    }, [userProfile]);

    // Fetch products once storeId is available
    useEffect(() => {
        if (storeId) {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/api/product/store/${storeId}`);
                    setProducts(response.data);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }
    }, [storeId]);

   // Calculate values based on products
   const totalItems = products.reduce((acc, product) => acc + (product.stock || 0), 0);
   const totalValue = products.reduce((acc, product) => acc + ((product.price || 0) * (product.stock || 0)), 0);
   const cartItems = 50; // Placeholder value for cart items
   const outOfStockItems = products.filter(product => product.stock === 0).length;

    const handleUpdate = (productId) => {
        console.log(`Update product with ID: ${productId}`);
        // Implement update functionality here
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5001/api/product/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    return (
        <div className="w-full p-4 min-h-fit bg-slate-600">
            {loading && <p>Loading products...</p>}
            {error && <p>Error fetching products: {error.message}</p>}
            
            <ItemsCard
                totalItems={totalItems}
                totalValue={totalValue}
                cartItems={cartItems}
                outOfStockItems={outOfStockItems}
            />

            {/* Display total items and total value */}
            <div className="p-4 mb-4 text-white bg-gray-800 rounded-md shadow-md">
                <p className="text-lg font-semibold">Total Items: {totalItems}</p>
                <p className="text-lg font-semibold">Total Inventory Value: ${totalValue.toFixed(2)}</p>
            </div>

            <div className="overflow-auto bg-white rounded-lg shadow-md">
                <table className="w-full text-left table-auto">
                    <thead className="text-white bg-cyan-500">
                        <tr>
                            <th className="px-4 py-2 bg-slate-700">Title</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">SKU</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Stock</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="border-b last:border-0">
                                <td className="px-4 py-2">{product.title}</td>
                                <td className="px-4 py-2">{product.category}</td>
                                <td className="px-4 py-2">{product.sku}</td>
                                <td className="px-4 py-2">${product.price}</td>
                                <td className="px-4 py-2">{product.stock}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleUpdate(product._id)}
                                        className="px-2 py-1 mr-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
