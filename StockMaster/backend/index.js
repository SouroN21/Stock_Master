const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// User routes
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");

dotenv.config();

const app = express();
const PORT = 8080; // Set your desired port

app.use(cors());
app.use(express.json()); 

// User routes
app.use('/api/user', userRoutes);
// Product routes
app.use('/api/product', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello');
});

// Hardcoded MongoDB Connection URL
const url = 'mongodb+srv://Naveen:Naveen%40123@cluster0.laqmq.mongodb.net/stockmaster?retryWrites=true&w=majority';

// MongoDB Connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB Connection Success!");
        mongoose.connection.once("open", () => {
            console.log("MongoDB is ready!");
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); 
    });

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
