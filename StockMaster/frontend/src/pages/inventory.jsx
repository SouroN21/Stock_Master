import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import ItemsCard from '../components/items-card';
import ProductUpdateModal from "../components/ProductUpdateModal";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

const Inventory = () => {
    const { userProfile } = useContext(UserContext);
    const [storeId, setStoreId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (userProfile) setStoreId(userProfile._id);
    }, [userProfile]);

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

    const totalItems = products.reduce((acc, product) => acc + (product.stock || 0), 0);
    const totalValue = products.reduce((acc, product) => acc + ((product.price || 0) * (product.stock || 0)), 0);
    const order = 0;
    const outOfStockItems = products.filter(product => product.stock === 0).length;

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleUpdate = async () => {
        const response = await axios.get(`http://localhost:5001/api/product/store/${storeId}`);
        setProducts(response.data); 
        
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5001/api/product/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
            alert("Product Deleted Sucsessfully");
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="w-full p-4 rounded-lg min-h-fit bg-gradient-to-r from-cyan-50 to-cyan-300"
        >
            {loading && <p>Loading products...</p>}
            {error && <p>Error fetching products: {error.message}</p>}
            
            <ItemsCard
                totalItems={totalItems}
                totalValue={totalValue}
                order={order}
                outOfStockItems={outOfStockItems}
            />

            <motion.div 
                className="overflow-auto bg-white rounded-lg shadow-md" 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <table className="w-full text-left table-auto">
                    <thead className="text-white bg-gradient-to-r from-teal-500 to-cyan-500">
                        <tr>
                            <th className="px-4 py-3 text-sm font-semibold tracking-wide text-center uppercase bg-gray-800 border-b border-gray-200">Title</th>
                            <th className="px-4 py-3 text-sm font-semibold tracking-wide text-center uppercase bg-gray-800 border-b border-gray-200">Category</th>
                            <th className="px-4 py-3 text-sm font-semibold tracking-wide text-center uppercase bg-gray-800 border-b border-gray-200">SKU</th>
                            <th className="px-4 py-3 text-sm font-semibold tracking-wide text-center uppercase bg-gray-800 border-b border-gray-200">Price</th>
                            <th className="px-4 py-3 text-sm font-semibold tracking-wide text-center uppercase bg-gray-800 border-b border-gray-200">Stock</th>
                            <th className="px-4 py-3 text-sm font-semibold tracking-wide text-center uppercase bg-gray-800 border-b border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <motion.tr 
                                key={product._id} 
                                className="transition duration-300 bg-white border-b hover:bg-gray-100 last:border-0"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <td className="px-4 py-3 font-medium text-gray-900">{product.title}</td>
                                <td className="px-4 py-3 text-gray-700">{product.category}</td>
                                <td className="px-4 py-3 text-gray-700">{product.sku}</td>
                                <td className="px-4 py-3 font-semibold text-center text-green-600">${product.price}</td>
                                <td className={`px-4 py-3 text-center ${product.stock === 0 ? 'text-red-500 font-bold' : 'text-gray-700'}`}>
                                    {product.stock === 0 ? 'Out of Stock' : product.stock}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <motion.button
                                        onClick={() => handleOpenModal(product)}
                                        className="px-3 py-1 mr-2 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        Update
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleDelete(product._id)}
                                        className="px-3 py-1 text-sm font-semibold text-white transition-colors bg-red-500 rounded-full hover:bg-red-600"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        Delete
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {selectedProduct && (
                <ProductUpdateModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                />
            )}
        </motion.div>
    );
};

export default Inventory;
