let _ = require("lodash");
let model =  require('../../models');
let Product = model.product;

module.exports.createProduct = async function (req, res) {
    let product = Product.build(_.pick(req.body, ['name', 'price']));
    let newProduct  = await product.save();

    res.json(newProduct);
};
