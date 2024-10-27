const Product = require("../models/product");
const { uploadImageToCloudinary } = require('../Configer/cloudinaryConfig');

exports.addProduct = async (req, res) => {
    const { storeId, title, description, category, sku, price, stock, date } = req.body;
    const file = req.file;

    try {
        if (!file) {
            return res.status(400).json({ message: "Image is required." });
        }

        const uploadResult = await uploadImageToCloudinary(file);
        const imageUrl = uploadResult.secure_url;

        const newProduct = new Product({
            storeId,
            title,
            imageUrl,
            description,
            category,
            sku,
            price,
            stock,
            date,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error in addProduct controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error in getProducts controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Error in getProductByID controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Update successful", product: updatedProduct });
    } catch (error) {
        console.error("Error in updateProduct controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProduct controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
