import React, { useState } from 'react';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(0);
    const [imageFile, setImageFile] = useState(null); 
    const [errorMessage, setErrorMessage] = useState('');

    const storeId = '671a87493a9a47dd1a1a56fc';

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('storeId', storeId); 
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('sku', sku);
        formData.append('price', price);
        formData.append('stock', stock);
        if (imageFile) {
            formData.append('image', imageFile); 
        }

        try {
            const response = await fetch('http://localhost:5001/api/product/add', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setTitle('');
            setDescription('');
            setCategory('');
            setSku('');
            setPrice('');
            setStock(0);
            setImageFile(null);
        } catch (error) {
            console.error('Error adding product:', error);
            setErrorMessage('Failed to add product. Please try again.');
        }
    };

    return (
        <div className="items-center justify-center w-full h-full p-4 bg-slate-500">
            <h2 className="mb-6 text-2xl font-bold text-center">Add New Product</h2>
            {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}
           
            <div className="w-full h-full p-4 bg-white rounded-lg shadow-md max-h-svh">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Product Details Section */}
                        <div className="max-h-full p-4 rounded-md bg-slate-200">
                            <h3 className="mb-4 text-lg font-semibold">Product Details</h3>
                            <div>
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700">Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700">SKU</label>
                                <input
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700">Price</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Math.max(0, e.target.value))}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(Math.max(0, e.target.value))}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="p-4 rounded-md bg-slate-200">
                            <h3 className="mb-4 text-lg font-semibold">Upload Image</h3>
                            
                            <div>
                                <label className="block text-gray-700">Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Image Preview */}
                            {imageFile && (
                                <div className="mt-4">
                                    <img 
                                        src={URL.createObjectURL(imageFile)} 
                                        alt="Selected" 
                                        className="w-40 h-auto rounded-md" 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={handleRemoveImage} 
                                        className="mt-2 text-red-500 underline"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 font-bold text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
