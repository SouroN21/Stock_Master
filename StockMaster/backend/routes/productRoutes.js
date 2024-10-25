const express = require('express');

const {addProduct , getProducts , getProductByID , updateProduct , deleteProduct} = require("../controller/productController");

const route =express.Router();

route.post('/add',addProduct);

route.get('/',getProducts);

route.get('/:id',getProductByID);

route.put('/:id',updateProduct);

route.delete('/:id',deleteProduct);

module.exports = route;