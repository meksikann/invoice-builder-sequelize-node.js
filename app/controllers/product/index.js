let _ = require("lodash");
let getAllProducts = require('./get-all-products');
let createProduct = require('./create-product');
let getProduct = require('./get-product');
let updateProduct = require('./update-product');
let deleteProduct = require('./delete-product');

module.exports = _.merge({},getAllProducts, createProduct, getProduct, updateProduct, deleteProduct);