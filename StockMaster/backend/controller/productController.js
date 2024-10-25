const Product = require("../models/product");

// Add new product
exports.addProduct = async (req, res) => {
    const { storeId, title, imageUrl, description, category, sku, price, stock, date } = req.body;

    try {
        const newProduct = new Product({ storeId, title, imageUrl, description, category, sku, price, stock, date });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get single product by ID
exports.getProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Update successful", product: updatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};